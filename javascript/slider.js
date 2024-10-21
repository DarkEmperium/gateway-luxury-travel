var swiper = new Swiper(".home-slider", {  
  speed: 1500,  
  spaceBetween: 0,  
  centeredSlides: true,  
  autoplay: { 
      delay: 7000, 
      disableOnInteraction: false, 
      stopOnLast: true 
  },  
  loop: true,
});

const playButtons = document.querySelectorAll('.play-video');
const stopButtons = document.querySelectorAll('.close-video');
const mouseButton = document.querySelector('.mouse-button');

for (let i = 0; i < 2; i++) {
  let duplicate = document.querySelector(".logos-container").cloneNode(true);
  document.querySelector(".logos-slide").appendChild(duplicate);
}

for (let playButton of playButtons) {
  playButton.addEventListener('click', () => {
      const sliderId = playButton.getAttribute('data-slider');
      const slide = document.querySelector(`.swiper-slide[data-slider="${sliderId}"]`);
      const videoContainer = slide.querySelector('.video-container');
      const contentHeader = slide.querySelector('.content-header');
      
      videoContainer.querySelector('video').style.animation = "fadeIn 0.5s forwards";
      
      setTimeout(() => {
          videoContainer.classList.add("show-video");
          videoContainer.querySelector('video').play();
          contentHeader.style.opacity = 0;
          contentHeader.style.transition = 'opacity 0.5s';
          mouseButton.style.opacity = 0;
          mouseButton.style.transition = 'opacity 0.5s';
      }, 500);

      swiper.autoplay.stop();
  });
}

for (let stopButton of stopButtons) {
  stopButton.addEventListener('click', () => {
      const sliderId = stopButton.getAttribute('data-slider');
      const slide = document.querySelector(`.swiper-slide[data-slider="${sliderId}"]`);
      const videoContainer = slide.querySelector('.video-container');
      const contentHeader = slide.querySelector('.content-header');
      
      videoContainer.querySelector('video').style.animation = "fadeOut 0.5s forwards";
      
      setTimeout(() => {
          videoContainer.classList.remove("show-video");
          videoContainer.querySelector('video').pause();
          contentHeader.style.opacity = 1;
          contentHeader.style.transition = 'opacity 0.5s';
          mouseButton.style.opacity = 1;
          mouseButton.style.transition = 'opacity 0.5s';
      }, 500);

      swiper.autoplay.start();
  });
}