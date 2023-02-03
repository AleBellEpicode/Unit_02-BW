const createPlaylistBtn = document.getElementById("create-playlist");
const playlistInput = document.getElementById("playlist-input");
const playlistNameInput = document.getElementById("playlist-name-input");
const submitPlaylistBtn = document.getElementById("submit-playlist-btn");
const playlistNameDisplay = document.getElementById("playlist-name-display");

createPlaylistBtn.addEventListener("click", function () {
    playlistInput.style.display = "flex";
});

submitPlaylistBtn.addEventListener("click", function () {
    playlistInput.style.display = "none";
    let playlistName = playlistNameInput.value;
    playlists.push(playlistName)
    localStorage.setItem('archivioplaylist', JSON.stringify(playlists));
    drawPlaylists()
});

const drawPlaylists = () => {
    playlistNameDisplay.innerHTML = ''
    for (let i = 0; i < playlists.length; i++) {
        if (i === 5) {
            playlistNameDisplay.innerHTML += `<div><a song-id="132199630" onclick="setPlayer(event)">${playlists[i]}</a></div>`

        } else {
            playlistNameDisplay.innerHTML += `<div><a>${playlists[i]}</a></div>`
        }
    }
}

let retrivePlaylists = localStorage.getItem('archivioplaylist')
if (retrivePlaylists) {
    playlists = JSON.parse(retrivePlaylists)
} else {
    playlists = ['toxic music', 'un nuovo mito', 'techno bunker', 'aria di casaTUA', "l'erba del vicino", 'eastrEggs del dev']
}
drawPlaylists()
