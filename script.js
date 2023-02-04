// AungMyanmar's Music Porject;

const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const audioTag = document.querySelector(".audioTag");
const songName = document.querySelector(".songname");
const nextBtn = document.querySelector(".nextBtn");
const preBtn = document.querySelector(".preBtn");
const currentTime = document.querySelector(".currentTime");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");

const songLinks = [
  {
    songId: "../../music project/Our_Beloved_Summer__OST_Part.1(480p).mp3",
    imgsrc: "our beloved summer.png",
    songName: "Our Beloved Summer",
  },
  {
    songId: "../../music project/song.mp3",
    imgsrc: "let me know img.jpg",
    songName: "Let Me Know",
  },
  {
    songId: "../../music project/song1.mp3",
    imgsrc: "christmas tree.jpeg",
    songName: "Christmas Tree",
  },
  {
    songId: "../../music project/song2.mp3",
    imgsrc: "enchanted img.jpg",
    songName: "Enchanted By Taylor Swift",
  },
  {
    songId: "../../music project/song3.mp3",
    imgsrc: "give me your forever.jpeg",
    songName: "Give Me Your Forever",
  },
  {
    songId: "../../music project/song4.mp3",
    imgsrc: "take me to your heart.jpg",
    songName: "Take Me To Your Heart",
  },
];

let currentBtn = true;
let currentSongId = 0;
let isFirstTime = true;

for (let i = 0; i < songLinks.length; i++) {
  songName.innerText = songLinks[currentSongId].songName;
  songName.addEventListener("click", () => {
    if (isFirstTime) {
      audioTag.src = songLinks[currentSongId].songId;
      audioTag.play();
      currentBtn = true;
      updateBtn();
      isFirstTime = false;
    }
  });
}

// ---------------- Btn events start
playBtn.addEventListener("click", () => {
  if (isFirstTime) {
    audioTag.src = songLinks[currentSongId].songId;
    audioTag.play();
    currentBtn = true;
    updateBtn();
    isFirstTime = false;
  } else {
    audioTag.play();
    currentBtn = true;
    updateBtn();
  }
});

pauseBtn.addEventListener("click", () => {
  if (isFirstTime) {
    audioTag.src = songLinks[currentSongId].songId;
    audioTag.play();
    currentBtn = true;
    updateBtn();
    isFirstTime = false;
  } else {
    audioTag.pause();
    currentBtn = false;
    updateBtn();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentSongId === songLinks.length - 1) {
    currentSongId = 0;
  } else {
    currentSongId += 1;
  }
  audioTag.src = songLinks[currentSongId].songId;
  songName.innerText = songLinks[currentSongId].songName;
  audioTag.play();
  currentBtn = true;
  updateBtn();
});

preBtn.addEventListener("click", () => {
  if ((audioTag.src = "0")) {
    currentSongId = songLinks.length - 1;
  } else {
    currentSongId -= 1;
  }
  audioTag.src = songLinks[currentSongId].songId;
  songName.innerText = songLinks[currentSongId].songName;
  audioTag.play();
  currentBtn = true;
  updateBtn();
});

const updateBtn = () => {
  if (currentBtn) {
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  } else {
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
  }
};

audioTag.addEventListener("ended", () => {
  currentBtn = false;
  updateBtn();
  progressBar.style.width = "0px";
  currentTime.innerHTML = "00:00" + " / " + "00:00";
});
// ---------------------- Btn events end

// Current And Total Time Update Section start

let totalTime = "00:00";

audioTag.addEventListener("loadeddata", () => {
  const durationTag = Math.floor(audioTag.duration);
  totalTime = changeTime(durationTag);
});

audioTag.addEventListener("timeupdate", () => {
  const currentTimeTag = Math.floor(audioTag.currentTime);
  const currentPlayingTime = changeTime(currentTimeTag);
  currentTime.innerHTML = currentPlayingTime + " / " + totalTime;
  progressChange(currentTimeTag);
});

const changeTime = (time) => {
  const minuteTag = Math.floor(time / 60);
  const secondTag = time % 60;
  const minute = minuteTag < 10 ? "0" + minuteTag : minuteTag;
  const second = secondTag < 10 ? "0" + secondTag : secondTag;
  return minute + ":" + second;
};

// Current And Total Time Update Section end

// Progress Bar Section Start
const progressChange = (param) => {
  const durationTag = audioTag.duration;
  const progressWidth = (progress.offsetWidth / durationTag) * param;
  const progressBarWidth = progressWidth.toString() + "px";
  progressBar.style.width = progressBarWidth;
};
// Progress Bar Section end;
