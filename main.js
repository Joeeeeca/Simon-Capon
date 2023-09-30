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

  var maxWidthForScrollAdjustment = 600; // Max width for scroll adjustment

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
      scrollPosition = introSection.offsetTop - header.offsetHeight - 40; // Adjust this value as needed
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
      if (window.scrollY < introSection.offsetTop - header.offsetHeight - 40) {
        window.scrollTo({
          top: introSection.offsetTop - header.offsetHeight - 40,
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

  document.getElementById("size").innerHTML = "Width : " + myWidth + "px";
}




/*Testimonial JavaScript*/


          // Get all play buttons, pause buttons, and video elements
          const playButtons = document.querySelectorAll('.play-button');
          const pauseButtons = document.querySelectorAll('.pause-button');
          const videos = document.querySelectorAll('.testimonial-videos video');
          const videoContainers = document.querySelectorAll('.testimonial-videos');
        
          // Function to handle the play/pause and button visibility
          function handlePlayPause(index) {
            if (videos[index].paused) {
              // If the video is paused, play it
              videos[index].play();
              // Hide the pause button on small screens (max-width: 600px)
              if (window.innerWidth <= 600) {
                playButtons[index].style.opacity = 0;
                pauseButtons[index].style.opacity = 0; // Hide pause button on small screens
              } else {
                playButtons[index].style.opacity = 0; // Hide play button on larger screens
              }
            } else {
              // If the video is playing, pause it
              videos[index].pause();
              // Show the play button on small screens (max-width: 600px)
              if (window.innerWidth <= 600) {
                playButtons[index].style.opacity = 1;
                pauseButtons[index].style.opacity = 0; // Hide pause button on small screens
              } else {
                playButtons[index].style.opacity = 1; // Show play button on larger screens
              }
            }
          }
        
          // Add event listeners to update button visibility when the video state changes
          videos.forEach((video, index) => {
            video.addEventListener('play', () => {
              updateButtonVisibility(index);
            });
        
            video.addEventListener('pause', () => {
              updateButtonVisibility(index);
            });
        
            // Add click event listener to the video element itself
            video.addEventListener('click', () => {
              handlePlayPause(index);
            });
          });
        
          // Add click event listeners to each play button
          playButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              handlePlayPause(index);
            });
          });
        
          // Add click event listeners to each pause button
          pauseButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              handlePlayPause(index);
            });
          });
        
          // Add mouseenter and mouseleave event listeners to each video container
          videoContainers.forEach((container, index) => {
            container.addEventListener('mouseenter', () => {
              if (videos[index].paused) {
                showPlayButton(index);
              } else {
                updateButtonVisibility(index);
              }
            });
        
            container.addEventListener('mouseleave', () => {
              if (videos[index].paused) {
                playButtons[index].style.opacity = 1;
              } else {
                pauseButtons[index].style.opacity = 0;
              }
            });
          });
        
          // Ensure play buttons are initially displayed
          playButtons.forEach((button, index) => {
            updateButtonVisibility(index);
          });
        
          // Handle window resize to hide pause buttons on small screens
          window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
              pauseButtons.forEach((button, index) => {
                button.style.opacity = 0;
              });
            }
          });