let audioPlayer = document.querySelector("#audioPlayer");
let seekSlider = document.querySelector("#sliderCenter");
let audioContainer = document.querySelector('#divFooterCenter')
let volumeSlider = document.querySelector('#customRange2');



const retrieveBySong = async (songid) => {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/track/${songid}`
    );
    let data = await res.json();
    let mp3 = data.preview;
    audioPlayer.setAttribute("src", mp3);
    startPlayer();
    // costruisco i link a album e artista
    let artistId = data.artist.id;
    let albumId = data.album.id;
    //artist name in player
    let artistName = data.artist.name;
    let artistPlayer = document.querySelector(
      "#songInfoFooter > p:nth-child(2)"
    );
    artistPlayer.innerHTML = `<a href="artistpage.html?artistId=${artistId}">${artistName}</a>`;
    //title in player
    let titlePlayer = document.querySelector("#songTitleFooter");
    titlePlayer.innerHTML = `<a href="albumpage.html?albumId=${albumId}">${data.title_short}</a>`;
    //cover album in player
    let albumImg = data.album.cover_big;
    let playerImg = document.querySelector("#coverContainer");
    playerImg.style.backgroundImage = `url("${albumImg}")`;
  } catch (err) {
    console.log(err);
  }
};

const setPlayer = async (event) => {
  volumeSlider.max = 100
  volumeSlider.value = 70
  if (event.target.attributes["song-id"]) {
    retrieveBySong(event.target.attributes["song-id"].value);
  } else if (event.target.attributes["album-id"]) {
    let albumid = event.target.attributes["album-id"].value;
    try {
      let resalbum = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${albumid}`
      );
      let album = await resalbum.json();
      retrieveBySong(album.tracks.data[0].id);
    } catch (err) {
      console.log(err);
    }
  }
};

const startPlayer = () => {
  audioPlayer.addEventListener("loadedmetadata", () => {
    seekSlider.value = 0
    audioPlayer.play();
    playState = "play";
    playIconContainer.classList.remove('bi-play-circle-fill')
    playIconContainer.classList.add('bi-pause-circle-fill')
    requestAnimationFrame(whilePlaying);
  });
};

let playIconContainer = document.querySelector("#playerPlay");
let playState = "pause";
playIconContainer.addEventListener("click", () => {
  if (playState === "play") {
    audioPlayer.pause();
    playIconContainer.classList.add('bi-play-circle-fill')
    playIconContainer.classList.remove('bi-pause-circle-fill')
    cancelAnimationFrame(animationSlider)
    playState = "pause";
  } else {
    audioPlayer.play();
    playIconContainer.classList.remove('bi-play-circle-fill')
    playIconContainer.classList.add('bi-pause-circle-fill')
    requestAnimationFrame(whilePlaying);
    playState = "play";
  }
});

volumeSlider.addEventListener('input', (e) => {
  showRangeProgress(e.target);
});

const showRangeProgress = (rangeInput) => {
  if (rangeInput === seekSlider) audioContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
  else audioContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
  showRangeProgress(e.target);
});

const setSliderMax = () => {
  seekSlider.max = Math.floor(audioPlayer.duration);
}

const whilePlaying = () => {
  seekSlider.value = Math.floor(audioPlayer.currentTime);
  audioContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
  animationSlider = requestAnimationFrame(whilePlaying);
}

if (audioPlayer.readyState > 0) {
  setSliderMax();
} else {
  audioPlayer.addEventListener('loadedmetadata', () => {
    setSliderMax();
  });
}

seekSlider.addEventListener('change', () => {
  audioPlayer.currentTime = seekSlider.value;
  requestAnimationFrame(whilePlaying);
});

volumeSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  audioPlayer.volume = value / 100;
});