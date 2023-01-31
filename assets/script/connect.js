const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/"

const fetchByQuery = async (type = 'query', query) => {

   let res = '';

   switch (type) {
      case 'album':
         res = await fetch(`${APIUrl}album/${query}`)
         try {
            if (res.ok) {
               const albums = await res.json()
               return await albums
            }
         } catch (err) {
            console.log('Error while fetching')
         }
         break;

      case 'artist':
         res = await fetch(`${APIUrl}artist/${query}`)
         try {
            if (res.ok) {
               const artist = await res.json()
               return await artist
            }
         } catch (err) {
            console.log('Error while fetching')
         }
         break;

      case 'song':
         res = await fetch(`${APIUrl}song/${query}`)
         try {
            if (res.ok) {
               const song = await res.json()
               return await song
            }
         } catch (err) {
            console.log('Error while fetching')
         }
         break;

      default:
         res = await fetch(`${APIUrl}search?q=${query}`)
         try {
            if (res.ok) {
               const { data: songs } = await res.json()
               return await songs;
            }
         } catch (err) {
            console.log('Error while fetching')
         }
         break;
   }
}

/* utilizzo: fetchByQuery('tipologiaquery', 'query')
tipologia per id: album, song, artist
altro tipo: 'query' */


const searchQuery = async (string) => {
   let songs = await fetchByQuery('query', string)
   let albums = []
   await songs.forEach(element => {
      albums.push(element.album)
   });
   return await { songs, albums }
   /*  DEBUG  await console.log({ songs, albums }) */
   /* utilizzo: await searchQuery('ricerca') */
}

const saveLiked = (id) => {
   likedSongs = JSON.parse(localStorage.getItem('liked'))
   if (likedSongs == null) {
      likedSongs = []
   }
   likedSongs.push(id)
   localStorage.setItem('liked', JSON.stringify(likedSongs))
}