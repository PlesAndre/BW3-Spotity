// dichiaro le costanti che mi servono
const footerInfo = document.getElementById("footerInfo");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progress-bar");
const micBtn = document.getElementById("micBtn");
const muteBtn = document.getElementById("muteBtn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const repeatBtn = document.querySelector(".repeat-btn");

// popola il div footerInfo con i dati dell'album di copertina
function getFooterInfo(img, title, artist) {
  footerInfo.classList.add("d-flex", "align-items-center");
  footerInfo.innerHTML = `
      <img
        src="${img}"
        alt="${title}"
        class="rounded me-2"
        style="width: 50px; height: 50px"
      />
      <div>
        <p class="mx-2 mb-0">${title}</p>
        <p class="mx-2 mb-0 text-secondary" style="font-size: smaller">${artist}</p>
      </div>`;
}
// Script per il player del footer

let interval;
let isPlaying = false;
let progress = 0;

//shuffle btn
shuffleBtn.addEventListener("click", function () {
  this.classList.toggle("text-white");
  this.classList.toggle("text-success");
});

//repeat btn
repeatBtn.addEventListener("click", function () {
  this.classList.toggle("text-white");
  this.classList.toggle("text-success");
});

// play btn
playBtn.addEventListener("click", function () {
  togglePlay();
});

// play/pausa
function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.innerHTML = isPlaying
    ? '<span class="fas fa-pause-circle"></span>'
    : '<span class="fas fa-play-circle"></span>';

  if (isPlaying) {
    interval = setInterval(function () {
      if (progress >= 100) {
        clearInterval(interval);
        progress = 0;
        progressBar.value = progress;
        isPlaying = false;

        // check se premuto il tasto repeat
        if (repeatBtn.classList.contains("text-success")) {
          togglePlay();
        } else {
          playBtn.innerHTML = '<span class="fas fa-play-circle"></span>';
        }
      } else {
        progress += 1;
        progressBar.value = progress;
      }
    }, 100);
  } else {
    clearInterval(interval);
  }
}

//script microfono e volume
const micOn = '<ion-icon name="mic-outline"></ion-icon>';
const micOff = '<ion-icon name="mic-off"></ion-icon>';
const volumeOn = '<ion-icon name="volume-low-outline"></ion-icon>';
const mute = '<ion-icon name="volume-mute"></ion-icon>';

let isMicOn = true;
let isVolumeOn = true;

// micBtn
micBtn.addEventListener("click", function () {
  isMicOn = !isMicOn;
  this.innerHTML = isMicOn ? micOn : micOff;
});

// muteBtn
muteBtn.addEventListener("click", function () {
  isVolumeOn = !isVolumeOn;
  this.innerHTML = isVolumeOn ? volumeOn : mute;
});
