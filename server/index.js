const WebSocket = require('ws');
const request = require('request');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const DB = low(adapter);

const JOIN_ROOM = "JOIN_ROOM";
const SET_ROOM_CONFIG = "SET_ROOM_CONFIG";
const PORT = 10050;
const DEFAULT_TARGET = {
  "link": "",
  "who": {
    "name": "SYSTEM",
    "picture": "http://coolkev.com/images/Logo.png"
  }
};

const ROOM_DEFAULT_CONFIG = {
  "tl": DEFAULT_TARGET,
  "bl": DEFAULT_TARGET,
  "tr": DEFAULT_TARGET,
  "br": DEFAULT_TARGET
};

const idGenerator = (function () {
  let nextId = 1;
  return function () {
    return nextId++;
  }
})();

function doAcceptAuthHuh(connection) {
  // This is the place in the code where you can require login from a particular google apps domains
  return connection.authDomain === "hubspot.com";
}

function authenticate(connection, token) {
  const options = {
    url: 'https://www.googleapis.com/plus/v1/people/me',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  request(options, function (error, response, body) {
    const result = JSON.parse(body);
    connection.displayName = result.displayName;
    connection.profilePicture = result.image.url;
    connection.authDomain = result.domain;
    connection.authStatus = doAcceptAuthHuh(connection);
    log(connection, `Auth completed (accepted: ${connection.authStatus})`);
    connection.send(JSON.stringify({
      "type": "AUTH_CHANGE",
      authStatus: connection.authStatus,
      displayName: connection.displayName,
    }))
  });
}

function log(connection, message) {
  const username = connection.displayName ? " - " + connection.displayName : "";
  console.log(`[${connection.id}${username}] ${message}`);
}

const wss = new WebSocket.Server({port: PORT});

const rooms = {};

function ensureRoom(connection, room) {
  if (rooms[room] === undefined) {
    const dbRoom = DB.get(room).value();
    if (dbRoom) {
      log(connection, "Restoring room from database");
      rooms[room] = {
        config: dbRoom,
        members: [],
      };
    } else {
      log(connection, "Creating a fresh room");
      rooms[room] = {
        config: ROOM_DEFAULT_CONFIG,
        members: [],
      };
    }
  }
}

function sendToConnection(connection, message) {
  connection.send(JSON.stringify(message));
  log(connection, `Sent message to directly`);
}

function broadcastToAllInRoom(room, sourceConnection, message) {
  const members = rooms[room].members;
  for (let i = 0; i < members.length; i++) {
    message.ownFeedback = members[i] === sourceConnection;
    members[i].send(JSON.stringify(message));
    log(members[i], `Sent message to because of room broadcast`);
  }
}

function leaveCurrentRoom(connection) {
  if (!connection.room) {
    return;
  }
  ensureRoom(connection, connection.room);
  log(connection, `Left room ${connection.room}`);
  rooms[connection.room].members.splice(rooms[connection.room].members.indexOf(connection), 1);
  connection.room = null;
}

function joinRoom(connection, room) {
  ensureRoom(connection, room);
  rooms[room].members.push(connection);
  connection.room = room;
  sendToConnection(connection, {
    "type": "CONFIG_CHANGE",
    "config": rooms[room].config,
    "who": "ROOM_JOIN",
    "ownFeedback": true,
  });
  log(connection, `Joined room ${room}`);
}

function updateWhosInConfig(newConfig, oldConfig, who) {
  const PARTS = ["tl", "tr", "bl", "br"];
  const out = {};
  for (let i = 0; i < PARTS.length; i++) {
    if (newConfig[PARTS[i]].link === oldConfig[PARTS[i]].link) {
      out[PARTS[i]] = oldConfig[PARTS[i]];
    } else {
      out[PARTS[i]] = {
        "link": newConfig[PARTS[i]].link,
        "who": {
          "name": who.displayName,
          "picture": who.profilePicture,
        }
      }
    }
    out[PARTS[i]].isFeatured = newConfig[PARTS[i]].isFeatured;
  }
  return out;
}

function setRoomConfig(room, config, connection) {
  ensureRoom(connection, room);
  rooms[room].config = updateWhosInConfig(config, rooms[room].config, connection);
  DB.set(room, rooms[room].config).write();
  broadcastToAllInRoom(room, connection, {
    "type": "CONFIG_CHANGE",
    "config": rooms[room].config,
    "who": connection.displayName,
  });
  log(connection, `Set the room config for room ${room} to ${JSON.stringify(rooms[room].config)}`);
}

function forceRefreshRoom(room, connection) {
  ensureRoom(connection, room);
  broadcastToAllInRoom(room, connection, {
    "type": "FORCE_REFRESH",
    "who": connection.displayName,
  });
  log(connection, `Caused a force refresh for room ${room}`);
}

function handleMessage(message, connection) {
  if (message.type === "JOIN_ROOM") {
    log(connection, "Received JOIN_ROOM message");
    leaveCurrentRoom(connection);
    joinRoom(connection, message.room);
  } else if (message.type === "AUTH") {
    log(connection, "Received AUTH message");
    authenticate(connection, message.token);
  } else if (message.type === "SET_ROOM_CONFIG") {
    log(connection, "Received SET_ROOM_CONFIG message");
    if (!connection.authStatus) {
      log(connection, "Attempted to SET_ROOM_CONFIG without a valid auth");
      return;
    }
    setRoomConfig(connection.room, message.config, connection);
  } else if (message.type === "FORCE_REFRESH") {
    log(connection, "Received FORCE_REFRESH message");
    if (!connection.authStatus) {
      log(connection, "Attempted to FORCE_REFRESH a room without a valid auth");
      return;
    }
    forceRefreshRoom(connection.room, connection);
  } else {
    log(connection, "Received unknown message");
  }
}

wss.on('connection', function connection(ws) {
  ws.id = idGenerator();
  ws.authStatus = false;
  log(ws, "Connected");
  ws.on('message', function incoming(rawMessage) {
    const message = JSON.parse(rawMessage);
    handleMessage(message, ws);
  });
  ws.on('close', function () {
    leaveCurrentRoom(ws);
    log(ws, "Disconnected");
  });
  ws.on("error", function (err) {
    console.warn("Caught connection error but ignoring...", err);
  });
});
