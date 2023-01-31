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

    let playlistId = JSON.parse(localStorage.getItem("playlists"))

    if (playlistId !== null) {

        newPlaylistId = playlistId.length + 1

    } else {
        newPlaylistId = 1
    }


    playlistDiv.id = newPlaylistId

    playlistDiv.appendChild(playlistLink);

    playlistNameDisplay.appendChild(playlistDiv);

    localStorage.setItem('playlists', JSON.stringify([{ id: newPlaylistId, name: playlistName, songs: [] }]));
});

