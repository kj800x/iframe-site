const AlertStore = (function () {
  const listeners = [];

  let alerts = [];

  function autoDismissAlertGenerator(id) {
    return () => {
      alerts = alerts.filter(alert => alert.id !== id);
      triggerListeners();
    }
  }

  function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  function triggerListeners() {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](alerts);
    }
  }

  function addAlert(message, type) {
    type = type ? type : "default";
    const id = getCurrentTimestamp();
    alerts = alerts.concat([{
      message,
      type,
      id
    }]);
    triggerListeners();
    setTimeout(autoDismissAlertGenerator(id), 7500)
  }

  return {
    createAlert: addAlert,
    onAlertChange: function(handler) {
      listeners.push(handler);
    }
  }

})();

export default AlertStore;