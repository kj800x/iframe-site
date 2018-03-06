export default function buildYoutubeLoopedVideoUrl(videoId, time) {
  const timeString = parseInt(time, 10) ? `&start=${parseInt(time, 10)}` : "";
  return `https://www.youtube.com/embed/${videoId}?version=3${timeString}&loop=1&autoplay=1&mute=1&playlist=${videoId}`;
}