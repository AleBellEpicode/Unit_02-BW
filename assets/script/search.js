let searchInput = document.querySelector('#searchInput')
let trackList = document.querySelector('#tracks');
let artistList = document.querySelector('#artists');
let albumsList = document.querySelector('#albums')

window.onload = async function () {
   let queryString = new URLSearchParams(window.location.search)
   let query = queryString.get("query")
   searchInput.value = query
   await fetchByQuery(query)
   searchInput.addEventListener('keyup', fetchByInput)
}


const fetchByInput = async (event) => {
   fetchByQuery(event.target.value)
}


const fetchByQuery = async (query) => {
   try {
      let res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
      let { data: songs } = await res.json()
      songs.length > 6 ? popularNo = 6 : popularNo = songs.length
      trackList.innerHTML = ''
      artistList.innerHTML = ''
      albumsList.innerHTML = ''
      for (let i = 0; i < popularNo; i++) {
         renderTracks(songs[i])
         renderAlbums(songs[i].album, songs[i].artist)
         renderArtists(songs[i].artist)
      }
      //altri album dell'artista
   } catch (err) {
      console.log(err)
      //  window.location.replace('index.html')
   }
}

const renderTracks = (track) => {
   trackList.innerHTML += `<p song-id="${track.id}">${track.title_short} - ${track.artist.name}</p>`
}

const renderArtists = (artist) => {
   artistList.innerHTML += `<p artist-id="${artist.id}">${artist.name}</p>`
}

const renderAlbums = (album, artist) => {
   albumsList.innerHTML += `<p album-id="${album.id}">${album.title} - ${artist.name}</p>`
}