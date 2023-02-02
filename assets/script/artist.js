window.onload = async () => {
   let queryString = new URLSearchParams(window.location.search)
   let id = queryString.get("artistId")
   try {
      let restop = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=5`)
      let resartist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
      let { data: topSongs } = await restop.json()
      let artist = await resartist.json()
      //artista album
      let artistName = document.querySelector("#artistnameh2")
      artistName.innerHTML = artist.name
      //immagine album
      let artistPic = document.querySelector("#img")
      artistPic.style.backgroundImage = `url(${artist.picture_xl})`
      //imposta come playbutton la prima traccia dell'album
      let artistPlay = document.querySelector('#album-playButton')
      artistPlay.setAttribute('onclick', 'setPlayer(event)')
      artistPlay.setAttribute('song-id', topSongs[0].id)
      //numero ascoltatori mensili
      let monthlyListners = document.querySelector('.ascolti')
      monthlyListners.innerHTML = `${artist.nb_fan} ascoltatori mensili`
      //lista le canzoni dell'album
      for (let i = 0; i < topSongs.length; i++) {
         renderTrackList(topSongs[i], i + 1)
      }
      //altri album dell'artista
      otherAlbums(artist.name)
   } catch (err) {
      console.log(err)
      //  window.location.replace('index.html')
   }
}

const otherAlbums = async (artist) => {
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      let { data: songs } = await res.json()
      // let artistOther = document.querySelector('#otherAlbums > h2')
      // artistOther.innerHTML += songs[0].artist.name
      songs.length < 6 ? limitAlbums = songs.length : limitAlbums = 6
      for (let i = 0; i < limitAlbums; i++) {
         renderRelatedAlbums(songs[i].album)
      }
   } catch (err) {
      console.log(err)
   }
}

const renderTrackList = (track, i) => {
   let trackList = document.querySelector('#popolari-tracklist-container');
   let songDuration = durationFormat(track.duration)
   trackList.innerHTML += `
   <div class="row row-cols-3 mt-2" id="songContainer" song-id="${track.id}" onclick="setPlayer(event)">
        <div class="col col-5 d-flex">
          <span class="me-4" id="number" style="display: inline-block;">${i}</span>
          <span id="play" style="display: none;">
            <i class="bi bi-play-fill"></i>
          </span>
          <div id="track-name" class="d-flex flex-column">
            ${track.title_short}
          </div>
        </div>
        <div class="col col-3 flex-fill justify-content-end d-none d-md-flex">
          <p id="play-number">${track.rank.toLocaleString('en-US')}</p>
        </div>
        <div class="col col-3 flex-fill d-flex justify-content-end">
          <p id="track-lenght " class="text-secondary">${songDuration}</p>
        </div>
      </div>`
}

const renderRelatedAlbums = async (album) => {
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${album.id}`)
      let fetchedAlbum = await res.json()
      let releaseYear = (new Date(fetchedAlbum.release_date)).getFullYear()
      let artistOther = document.querySelector('#altrialbum')
      artistOther.innerHTML += `
   <div class="card col p-3 p-0 playing-card" style="width: 9rem" onclick="location.href='albumpage.html?albumId=${album.id}';">
          <img src="${album.cover_medium}" class="card-img-top position-relative" alt="...">
          <a class="" album-id="${album.id}" onclick="setPlayer(event)">
            <i class="bi bi-play-circle-fill suggestedPlaylist-playButton position-absolute"></i>
          </a>
          <div class="card-body">
            <h6 class="card-title">${album.title}</h6>
            <p class="card-text text-secondary">
              ${releaseYear} &#183; Album
            </p>
          </div>
        </div>`
   } catch (error) {
      console.log(error);
   }
}

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
}
