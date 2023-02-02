window.onload = async () => {
   let queryString = new URLSearchParams(window.location.search)
   let id = queryString.get("albumId")
   let durationCounter = 0
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
      let data = await res.json()
      //titolo album
      let albumTitle = document.querySelector("#album-title")
      albumTitle.innerHTML = data.title
      //artista album
      let artistName = document.querySelector("#artist-name")
      artistName.innerHTML = `<a href="artistpage.html?artistId=${data.artist.id}">${data.artist.name}</a>`
      //immagine album
      let albumImg = document.querySelector("#album-cover")
      albumImg.src = data.cover_big
      //anno di produzione
      let releaseYear = (new Date(data.release_date)).getFullYear()
      let albumY = document.querySelector('#album-year')
      albumY.innerHTML = ` &#183; ${releaseYear} &#183; `
      //numero tracce
      let trackNo = document.querySelector('#track-number')
      trackNo.innerHTML = `${data.tracks.data.length} brani, `
      //lista le canzoni dell'album
      for (let i = 0; i < data.tracks.data.length; i++) {
         renderTrackList(data.tracks.data[i], i + 1)
         durationCounter += data.tracks.data[i].duration
      }
      //calcola la durata complessiva dell'album
      let totalTrackTime = document.querySelector('#track-time')
      totalTrackTime.innerHTML = durationFormat(durationCounter)
      //imposta come playbutton la prima traccia dell'album
      let albumPlay = document.querySelector('#album-playButton')
      albumPlay.setAttribute('onclick', 'setPlayer(event)')
      albumPlay.setAttribute('song-id', data.tracks.data[0].id)
      //altri album dell'artista
      otherAlbums(data.artist.name)
   } catch (err) {
      console.log(err)
      //  window.location.replace('index.html')
   }
}

const otherAlbums = async (artist) => {
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      let { data: songs } = await res.json()
      let artistOther = document.querySelector('#otherAlbums > h2')
      artistOther.innerHTML += songs[0].artist.name
      songs.length < 4 ? limitAlbums = songs.length : limitAlbums = 4
      for (let i = 0; i < limitAlbums; i++) {
         renderRelatedAlbums(songs[i].album)
      }
   } catch (err) {
      console.log(err)
   }
}

const renderTrackList = (track, i) => {
   let trackList = document.querySelector('#album-tracklist-container');
   let trackLenght = track.duration
   trackList.innerHTML += `
       <div class="row row-cols-3 mt-5">
          <div class="col col-5 d-flex">
            <span class="align-self-center me-4" song-id="${track.id}" onclick=setPlayer(event)>${i}</span>
            <div id="track-name" class="d-flex flex-column">
              ${track.title_short}
              <p id="track-artist" class="mt-3 text-secondary"><a href="artistpage.html?artistId=${track.artist.id}">${track.artist.name}</a></p>
            </div>
          </div>
          <div class="col col-3 flex-fill justify-content-end d-none d-md-flex">
            <p id="play-number" class="text-secondary">${track.rank.toLocaleString('en-US')}</p>
          </div>
          <div class="col col-3 flex-fill d-flex justify-content-end">
            <p id="track-lenght " class="text-secondary">${durationFormat(trackLenght)}</p>
          </div>
      </div>`
}

const renderRelatedAlbums = (album) => {
   let artistOther = document.querySelector('#otherAlbums')
   artistOther.innerHTML += `<p album-id="${album.id}">${album.title}</p>`
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