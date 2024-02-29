/*This event listener waits for the DOM(Document Object Model) to be fully loaded before executing the code inside
It ensures that the javaScript code doesn't run until the HTML is ready*/
document.addEventListener("DOMContentLoaded", function () {
    /*This event listener is attached to the scrollToTopIcon using the id #scroll-icon.
    When the icon is clicked, it triggers a smooth scroll behaviour to move the user to the top of the introductory
    section of the page*/
    const scrollToTopIcon = document.getElementById("scroll-icon");
    const introSection = document.querySelector(".home-introduction");
    const header = document.querySelector("header");
    const body = document.body;
  
    let scrollOffset = -10; // Default scroll offset value
    let headerBlackActive = false;
  
    var maxWidthForScrollAdjustment = 1000; // Max width for scroll adjustment
  
    /*This function adjusts the scrollOffset variable based on the screen width.
    if the screen width is less than or equal to the maxWidthForScrollAdjustment (600pixels)
    it sets scrollOffset to a larger negative value (-40) which affects scrolling behaviour for
    smaller screens.
    for larger screens, it uses the default scrollOffset value (-10).*/
    function adjustScrollOffset() {
      // Check the screen width
      if (window.innerWidth <= maxWidthForScrollAdjustment) {
        // Adjust scroll offset for screens with a max width of maxWidthForScrollAdjustment
        scrollOffset = -40; // Adjust this value as needed
      } else {
        scrollOffset = -10; // Use the default scroll offset for larger screens
      }
    }
  /*This function is responsible for handling the scrolling behaviour and adjusting the header's
  appearance as the user scrolls.
  It checks the position of the introductory section and header to determine when to change the
  header's background color and show/hide the footer*/
    function handleScroll() {
      const introSectionRect = introSection.getBoundingClientRect();
      const footer = document.querySelector(".footer");
  
      if (introSectionRect.top <= header.offsetHeight - scrollOffset) {
        header.classList.add("header-black");
        headerBlackActive = true; // Header-black is active
        body.classList.remove("disable-scroll"); // Enable scrolling
  
        // Show the footer
        footer.classList.remove("footer-hidden");
      } else {
        header.classList.remove("header-black");
        headerBlackActive = false; // Header-black is not active
        body.classList.add("disable-scroll"); // Disable scrolling
  
        // Hide the footer
        footer.classList.add("footer-hidden");
      }
    }
  
    scrollToTopIcon.addEventListener("click", function () {
      // Calculate the scroll position to leave space for the header
      let scrollPosition = 0;
  
      // Check the screen width
      if (window.innerWidth <= maxWidthForScrollAdjustment) {
        // Adjust scroll position for screens with a max width of maxWidthForScrollAdjustment
        scrollPosition = introSection.offsetTop - header.offsetHeight + 20; // Adjust this value as needed
      } else {
        scrollPosition = introSection.offsetTop - header.offsetHeight;
      }
  
      // Scroll to the desired position with smooth scrolling behavior
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    });
  
    /*This code block adds a scroll event listener to the window object.
    whent he user scrolls the page, this listener triggers the functions
    adjustScrollOffset() and handleScroll(). It is responsible for adjusting
    the scrolling behaviour and updating the header's style as the user
    scrolls up and down the page*/
    window.addEventListener("scroll", function () {
      adjustScrollOffset(); // Adjust scroll offset based on screen width
  
      if (headerBlackActive) {
        // If header-black is active, prevent scrolling up beyond a certain point
        if (window.scrollY < introSection.offsetTop - header.offsetHeight - 10) {
          window.scrollTo({
            top: introSection.offsetTop - header.offsetHeight - 10,
            behavior: "auto",
          });
        }
      }
  
      // Update the header style as the user scrolls
      handleScroll();
    });
  
    // Initial check to see if scrolling should be allowed
    adjustScrollOffset(); // Adjust scroll offset based on initial screen width
    handleScroll();
  });
  
  window.onresize = screen;
  window.onload = screen;
  
  function screen () {
    myWidth =  window.innerWidth;
    myHeight = window.innerHeight;
  
    document.getElementById("size").innerHTML = "Width : " + myWidth + "px";
    document.getElementById("height").innerHTML = "height : " + myHeight + "px";
  }


  


/*Make the videos play on the home page*/ 
function togglePlayPause(videoId, playButtonContainer) {
  var video = document.getElementById(videoId);
  var playButton = playButtonContainer.querySelector('.play-button-home');

  if (video.paused || video.ended) {
    video.play();
    playButton.style.display = 'none'; // Hide the play button when video is playing
    playButtonContainer.style.display = 'none'; // Hide the play button container when video is playing
  } else {
    video.pause();
    playButton.style.display = 'block'; // Show the play button when video is paused
    playButtonContainer.style.display = 'block'; // Show the play button container when video is paused
  }

  // Pause the video, show the play button, and show the play button container
  // when clicking anywhere on the video
  video.onclick = function () {
    video.pause();
    playButton.style.display = 'block';
    playButtonContainer.style.display = 'block';
  };
}
