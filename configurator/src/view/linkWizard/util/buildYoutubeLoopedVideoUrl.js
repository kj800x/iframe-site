export default function buildYoutubeLoopedVideoUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?version=3&loop=1&autoplay=1&mute=1&playlist=${videoId}`;
}