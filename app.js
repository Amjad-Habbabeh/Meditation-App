const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  // time display
  const timeSelect = document.querySelectorAll('.time-select button');
  const timeDisplay = document.querySelector('.time-display');
  // get the length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);
  // duration
  let fackDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // change the song
  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });
  // play sounds
  play.addEventListener('click', () => {
    checkPlaying(song);
  });
  // select sounds
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fackDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fackDuration / 60)}:${Math.floor(
        fackDuration % 60
      )}`;
    });
  });
  // creat function to play and stop the sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };
  // we can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fackDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    // Animate the circle
    let progress = outlineLength - (currentTime / fackDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= fackDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.src = './svg/play.svg';
    }
  };
};
app();
