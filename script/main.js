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
const speedOptions = document.querySelectorAll("#video-hud__speed>option");

const watchNowBtn = document.querySelectorAll(".card__side-button");
const fullScreenBtn = document.querySelector(".video-hud__fullscreen");
const customControls = document.querySelector("div.video-hud");
const container = document.querySelector(".video-container");
let progressVar = 100;

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
    customControls.style.opacity = "0";
    videoPlayer.play();
    actionButtonIcon.classList.remove("icon-music-play-button");
    actionButtonIcon.classList.add("icon-music-pause-button");
    actionButton.setAttribute(
      "class",
      "video-hud__element video-hud__action video-hud__action_play"
    );
  } else {
    videoPlayer.pause();

    customControls.style.opacity = "1";
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
  progressVar = document.fullscreenElement !== null ? 0 : 100;
  let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
  let progress = mouseX / (progressBar.offsetWidth / 100) - progressVar;

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
function openFullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    /* Safari */
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) {
    /* IE11 */
    container.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
// console.log(document.fullscreenElement);
let fullscreenEnabled = false;
function toggleScreen() {
  if (document.fullscreenElement === null) {
    openFullscreen();
  } else if (document.fullscreenElement !== null) {
    closeFullscreen();
  }
}
fullScreenBtn.addEventListener("click", function () {
  toggleScreen();
});

[actionButton, videoPlayer].forEach((e) =>
  e.addEventListener("click", videoAct)
);

let curSpeed = 3;
function speedUp() {
  speedSelect.value = speedOptions[curSpeed].value;
  videoPlayer.playbackRate = speedSelect.value / 100;
}
muteButton.addEventListener("click", videoMute);
document.addEventListener("keydown", function (e) {
  // e.preventDefault();

  if (playerBox.style.opacity === "1") {
    e.code === "Space" ? e.preventDefault() : false;
    e.code === "Space" ? videoAct() : e.code === "KeyM" ? videoMute() : false;
    e.code === "KeyF" ? toggleScreen() : false;
    if (e.code === "Period") {
      curSpeed++;
      curSpeed < speedOptions.length
        ? speedUp()
        : (curSpeed = speedOptions.length);
    } else if (e.code === "Comma") {
      curSpeed--;
      curSpeed >= 0 ? speedUp() : (curSpeed = 0);
    }
  }
});

volumeScale.addEventListener("change", videoChangeVolume);

speedSelect.addEventListener("change", videoChangeSpeed);
videoPlayer.addEventListener("timeupdate", videoProgress);

progressBar.addEventListener("click", videoChangeTime);
function closePlayer() {
  playerBox.style.visibility = "hidden";
  playerBox.style.opacity = 0;
  videoPlayer.pause();
}
playerBox.addEventListener("click", function (e) {
  if (e.target === playerBox) {
    closePlayer();
  }
});

watchNowBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    playerBox.style.visibility = "visible";
    playerBox.style.opacity = 1;
    videoPlayer.src = e.target.dataset.src;

    videoAct();

    customControls.addEventListener("mouseenter", function (e) {
      customControls.style.opacity = "1";
    });
    customControls.addEventListener("mouseleave", function (e) {
      if (!videoPlayer.paused) {
        customControls.style.opacity = "0";
      }
    });
  });
});
