var testimonialVideo1 = document.getElementById('testimonialVideo1');
var testimonialVideo2 = document.getElementById('testimonialVideo2');
var testimonialVideo3 = document.getElementById('testimonialVideo3');

var playButtonContainer1 = document.querySelector('.testimonials-video-wrapper:nth-child(1) .play-button-container');
var playButtonContainer2 = document.querySelector('.testimonials-video-wrapper:nth-child(2) .play-button-container');
var playButtonContainer3 = document.querySelector('.testimonials-video-wrapper:nth-child(3) .play-button-container');

// Add click event listeners to the play button containers
playButtonContainer1.addEventListener('click', function() {
  togglePlayPause(testimonialVideo1, playButtonContainer1);
});

playButtonContainer2.addEventListener('click', function() {
  togglePlayPause(testimonialVideo2, playButtonContainer2);
});

playButtonContainer3.addEventListener('click', function() {
  togglePlayPause(testimonialVideo3, playButtonContainer3);
});

function togglePlayPause(video, playButtonContainer) {
  if (video.paused || video.ended) {
    video.play();
    playButtonContainer.style.display = 'none'; // Hide the play button container when video is playing
  } else {
    video.pause();
    playButtonContainer.style.display = 'block'; // Show the play button container when video is paused
  }

  // Pause the video and show the play button container when clicking anywhere on the video
  video.onclick = function() {
    video.pause();
    playButtonContainer.style.display = 'block';
  };
}