const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

const songs = [
  {
    path: "assets/magic hour.mp3",
    displayName: "Magic Hour",
    cover: "assets/toy.jpg",
    artist: "JKT48",
  },
  {
    path: "assets/Fortune Cookie.mp3",
    displayName: "Fortune Cookie",
    cover: "assets/toya.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/rapsedih.mp3",
    displayName: "Rapsedih",
    cover: "assets/toyaa.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/pesawat kertas.mp3",
    displayName: "Pesawat Kertas",
    cover: "assets/toyaimut.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/seventeen.mp3",
    displayName: "Seventeen",
    cover: "assets/zoytoy.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Sayonara Crawl.mp3",
    displayName: "Sayonara Criwl",
    cover: "assets/toyaSC.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Flying High.mp3",
    displayName: "Crying High",
    cover: "assets/toyaflyinghigh.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Birth.mp3",
    displayName: "Birth",
    cover: "assets/toy.jpg",
    artist: "JKT48",
  },
  {
    path: "assets/Aitakatta.mp3",
    displayName: "Aitakatta",
    cover: "assets/zoytoy.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Langit Biru Cinta Searah.mp3",
    displayName: "Langit Biru Cinta Searah",
    cover: "assets/zoytoy.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Heavy Rotation.mp3",
    displayName: "Heavy Rotation",
    cover: "assets/zoytoy.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/Jurus Rahasia Teleport.mp3",
    displayName: "Hissatsu Teleport",
    cover: "assets/zoytoy.jpeg",
    artist: "JKT48",
  },
  {
    path: "assets/asadekont.mp3",
    displayName: "asadekontol",
    cover: "assets/tytyd.jpeg",
    artist: "SANDIBABI",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // ubah icon tombol play
  playBtn.classList.replace("fa-play", "fa-pause");
  // set tombol title hover
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // ubah icon tombol pause
  playBtn.classList.replace("fa-pause", "fa-play");
  // set tombol title hover
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
