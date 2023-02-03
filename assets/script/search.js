let searchInput = document.querySelector("#searchBar");
let trackList = document.querySelector("#tracks");
let artistList = document.querySelector("#artists");
let albumsList = document.querySelector("#suggested-playlist");

window.onload = async function () {
  let queryString = new URLSearchParams(window.location.search);
  let query = queryString.get("query");
  searchInput.value = query;
  await fetchByQuery(query);
  searchInput.addEventListener("keyup", fetchByInput);
};

const fetchByInput = async (event) => {
  fetchByQuery(event.target.value);
};

const fetchByQuery = async (query) => {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    );
    let { data: songs } = await res.json();
    songs.length > 4 ? (popularNo = 4) : (popularNo = songs.length);
    trackList.innerHTML = "";
    artistList.innerHTML = "";
    albumsList.innerHTML = "";
    for (let i = 0; i < popularNo; i++) {
      renderTracks(songs[i], i + 1);
      renderAlbums(songs[i].album, songs[i].artist);
    }
    //altri album dell'artista
    renderArtists(songs[0].artist);
  } catch (err) {
    console.log(err);
    //  window.location.replace('index.html')
  }
};

const renderTracks = (track, i) => {
  trackList.innerHTML += `<div class="songContainer container-fluid" song-id="${track.id}" onclick="setPlayer(event)">
   <div class="number-title-song">
     <span class="num">${i}</span>
     <p>${track.title_short} - ${track.artist.name}</p>
   </div>
   <div class="songDuration">
     <p> ${durationFormat(track.duration)}</p>
   </div>
 </div>`;
};

const renderArtists = (artist) => {
  artistList.innerHTML += `<div class="img-artist-container">
   <img src="${artist.picture_big}" alt="" class="w-100 rounded-circle" onclick="location.href='artistpage.html?artistId=${artist.id}';>
 </div>
 <div>
   <p class="nameArtist">${artist.name}</p>
 </div>
 <div>
   <span class="tagArtist">${artist.id}</span>
 </div>
 <div class="btn-play-hover">
   <a class="">
     <i class="bi bi-play-circle-fill suggestedPlaylist-playButton position-absolute playSearchCard"></i>
   </a>
 </div>`;
};
const durationFormat = (duration) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + " ore" + (mins < 10 ? "0" : "");
    ret += " " + mins + " min ";
  }
  if (hrs <= 0) {
    ret += "" + mins + ":";
    ret += "" + secs;
  }

  return ret;
};

const renderAlbums = (album, artist) => {
  albumsList.innerHTML += `<div class="card col p-3 p-0 playing-card" style="width: 11rem" album-id="${album.id}">
   <img src=" ${album.cover_big}" class="card-img-top position-relative" alt="..." onclick="location.href='albumpage.html?albumId=${album.id}';" />
   <a class="">
     <i class="bi bi-play-circle-fill suggestedPlaylist-playButton position-absolute" album-id="${album.id}" onclick="setPlayer(event)"></i>
   </a>
   <div class="card-body" onclick="location.href='albumpage.html?albumId=${album.id}';">
     <h6 class="card-title">${album.title}</h6>
     <p class="card-text text-secondary">
     ${artist.name}
     </p>
   </div>
 </div>`;
};
