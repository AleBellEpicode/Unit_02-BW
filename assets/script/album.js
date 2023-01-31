window.onload = async () => {
   let queryString = new URLSearchParams(window.location.search)
   let id = queryString.get("albumId")
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
      let data = await res.json()
      //titolo album
      let albumTitle = document.querySelector("#albumTitle")
      albumTitle.innerHTML = data.title
      //artista album
      let artistName = document.querySelector("#artistName")
      artistName.innerHTML = data.artist.name
      //immagine album
      let albumImg = document.querySelector("#albumImg")
      albumImg.src = data.cover_big
      //lista le canzoni dell'album
      for (let i = 0; i < data.tracks.data.length; i++) {
         renderTrackList(data.tracks.data[i])
      }
      //altri album dell'artista
      otherAlbums(data.artist.name)
   } catch (err) {
      console.log(err)
      //  window.location.replace('index.html')
   }
}

const otherAlbums = async (artist) => {
   console.log(artist)
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

const renderTrackList = (track) => {
   let trackList = document.querySelector('#trackList');
   trackList.innerHTML += `<p song-id="${track.id}">${track.title_short} - ${track.artist.name}</p>`
}

const renderRelatedAlbums = (album) => {
   let artistOther = document.querySelector('#otherAlbums')
   artistOther.innerHTML += `<p album-id="${album.id}">${album.title}</p>`
}