const playerBox = document.querySelector(".video");

const videoPlayer = document.getElementById("video-player");

const progressBar = document.getElementById("video-hud__progress-bar");

let currTime = document.getElementById("video-hud__curr-time");

let durationTime = document.getElementById("video-hud__duration");

const actionButton = document.getElementById("video-hud__action");
const actionButtonIcon = document.querySelector(".video-hud__action > i");

const muteButton = document.getElementById("video-hud__mute");

let volumeScale = document.getElementById("video-hud__volume");

const speedSelect = document.getElementById("video-hud__speed");

const watchNowBtn = document.querySelectorAll(".card__side-button");

function videoTime(time) {
  time = Math.floor(time);

  let minutes = Math.floor(time / 60);

  let seconds = Math.floor(time - minutes * 60);

  let minutesVal = minutes;

  let secondsVal = seconds;

  if (minutes < 10) {
    minutesVal = "0" + minutes;
  }

  if (seconds < 10) {
    secondsVal = "0" + seconds;
  }

  return minutesVal + ":" + secondsVal;
}
function videoAct() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    actionButtonIcon.classList.remove("icon-music-play-button");
    actionButtonIcon.classList.add("icon-music-pause-button");
    actionButton.setAttribute(
      "class",
      "video-hud__element video-hud__action video-hud__action_play"
    );
  } else {
    videoPlayer.pause();
    actionButtonIcon.classList.add("icon-music-play-button");
    actionButtonIcon.classList.remove("icon-music-pause-button");

    actionButton.setAttribute(
      "class",
      "video-hud__element video-hud__action video-hud__action_pause"
    );
  }
}

function videoProgress() {
  progress =
    Math.floor(videoPlayer.currentTime) /
    (Math.floor(videoPlayer.duration) / 100);
  progressBar.value = isNaN(progress) ? 0 : progress;

  currTime.innerHTML = videoTime(videoPlayer.currentTime);

  durationTime.innerHTML = videoTime(videoPlayer.duration);
}

function videoChangeTime(e) {
  let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
  let progress = mouseX / (progressBar.offsetWidth / 100) - 100;
  console.log(progress);

  videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
}

function videoChangeVolume() {
  let volume = volumeScale.value / 100;

  videoPlayer.volume = volume;

  if (videoPlayer.volume == 0) {
    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_true"
    );
  } else {
    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
  }
}

function videoMute() {
  if (videoPlayer.volume == 0) {
    videoPlayer.volume = volumeScale.value / 100;

    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_false"
    );
  } else {
    videoPlayer.volume = 0;

    muteButton.setAttribute(
      "class",
      "video-hud__element video-hud__mute video-hud__mute_true"
    );
  }
}

function videoChangeSpeed() {
  let speed = speedSelect.value / 100;

  videoPlayer.playbackRate = speed;
}
actionButton.addEventListener("click", videoAct);

videoPlayer.addEventListener("click", videoAct);
muteButton.addEventListener("click", videoMute);

volumeScale.addEventListener("change", videoChangeVolume);

speedSelect.addEventListener("change", videoChangeSpeed);
videoPlayer.addEventListener("timeupdate", videoProgress);

progressBar.addEventListener("click", videoChangeTime);

playerBox.addEventListener("click", function (e) {
  if (e.target === playerBox) {
    playerBox.style.visibility = "hidden";
    playerBox.style.opacity = 0;
    videoPlayer.pause();
  }
});
watchNowBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    playerBox.style.visibility = "visible";
    playerBox.style.opacity = 1;
    videoPlayer.src = e.target.dataset.src;
    videoAct();
  });
});
