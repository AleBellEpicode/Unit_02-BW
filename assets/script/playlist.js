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
    let playlistLink = document.createElement("a");
    playlistLink.innerText = playlistName;

    let playlistDiv = document.createElement("div");

    playlistDiv.appendChild(playlistLink);

    playlistNameDisplay.appendChild(playlistDiv);

    localStorage.setItem(JSON.stringify(playlistName, playlistName));
});

const saveInPlaylist = (id, plId = 0, plName = 'Brani che ti piacciono') => {
    likedSongs = JSON.parse(localStorage.getItem('playlist'))
    if (likedSongs === null) {
        likedSongs = [{
            id: plId,
            name: plName,
            songs: []
        }];
    }
    likedSongs[plId].songs.push(id)
    localStorage.setItem('playlists', JSON.stringify(likedSongs))
}