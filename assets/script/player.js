let audioPlayer = document.querySelector("#audioPlayer");

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
    audioPlayer.play();
    playState = "play";
  });
};

let playIconContainer = document.querySelector("#playerPlay");
let playState = "pause";
playIconContainer.addEventListener("click", () => {
  if (playState === "play") {
    audioPlayer.pause();

    playState = "pause";
  } else {
    audioPlayer.play();

    playState = "play";
  }
});
