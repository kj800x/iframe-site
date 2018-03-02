export default function buildYoutubeLoopedVideoUrl(videoId, time) {
  const timeString = parseInt(time) ? `&start=${parseInt(time)}` : "";
  return `https://www.youtube.com/embed/${videoId}?version=3${timeString}&loop=1&autoplay=1&mute=1&playlist=${videoId}`;
}