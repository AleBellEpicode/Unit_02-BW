window.onload = async () => {
   let queryString = new URLSearchParams(window.location.search)
   let id = queryString.get("artistId")
   try {
      let restop = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=5`)
      let resartist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
      let { data: topSongs } = await restop.json()
      let artist = await resartist.json()
      //artista album
      let artistName = document.querySelector("#artistName")
      artistName.innerHTML = artist.name
      //immagine album
      let artistPic = document.querySelector("#artistPic")
      artistPic.src = artist.picture_big
      //lista le canzoni dell'album
      for (let i = 0; i < topSongs.length; i++) {
         renderTrackList(topSongs[i])
      }
      //altri album dell'artista
      otherAlbums(artist.name)
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
      songs.length < 6 ? limitAlbums = songs.length : limitAlbums = 6
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