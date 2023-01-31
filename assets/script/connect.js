const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/"

const fetchByQuery = async (type = 'query', query) => {

   let res = '';

   switch (type) {
      case 'album':
         res = await fetch(`${APIUrl}album/${query}`)
         const albums = await res.json()
         return await albums
         break;

      case 'artist':
         res = await fetch(`${APIUrl}artist/${query}`)
         const artist = await res.json()
         return await artist
         break;

      default:
         res = await fetch(`${APIUrl}search?q=${query}`)
         const { data: songs } = await res.json()
         return await songs;
         break;
   }
}