// avvio la get con un artista predefinito
getArtistData("eminem");
// dichiaro le costanti che mi servono
const firstSection = document.getElementById("top-page-artist");
const randomAlbums = document.getElementById("randomAlbums");
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// get che popola il dom
function getArtistData(artist) {
  let apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore del server");
      }
      return response.json();
    })
    .then((json) => {
      let data = json.data;
      let artist = data[0].artist;
      let album = data[0].album;
      // creo il div per l'artista e il suo 1° album del json
      firstSection.innerHTML = `<div class="d-flex align-items-center">
          <img
            src="${artist.picture_xl}"
            alt="Img: ${artist.name}"
            class="img-fluid me-3 rounded"
            style="width: 25%"
          />
          <div>
            <div class="card-header mx-2">
              <h6>${artist.name}</h6>
              <h1 class="fs-1">${album.title}</h1>
              <p class="fw-light">L'album più ascoltato</p>
              <p class="fw-light">Clicca su Altro per i dettagli dell'artista</p>
            </div>
            <div class="d-flex align-items-center">
              <a href="${artist.link}" target="_blank" class="btn btn-success mx-2 me-2">Play</a>
              <a href="./artist.html?q=${artist.name}" class="btn btn-outline-light mx-2">Altro</a>
            </div>
          </div>
        </div>`;

      // avvio la funzione del footer per passare i dati
      getFooterInfo(album.cover, album.title, artist.name);

      // script per caricare nel dom album randomici ad ogni refresh
      let albumIdArray = [];
      let randomId = [];
      // prendo gli id e non solo gli index perchè nel json ci sono doppioni
      data.forEach((element) => {
        let albumId = element.album.id;
        albumIdArray.push(albumId);
      });
      // popolo l'array randomId con album randomici
      while (randomId.length < 12) {
        let randomIndex = Math.floor(Math.random() * albumIdArray.length);
        let selectedAlbumId = albumIdArray[randomIndex];
        if (!randomId.includes(selectedAlbumId)) {
          randomId.push(selectedAlbumId);
        }
      }
      // stampo le card in pagina
      randomId.forEach((id) => {
        let findId = data.find((e) => e.album.id === id);
        if (findId) {
          let album = findId.album;
          const cardDiv = document.createElement("div");
          cardDiv.classList.add(
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-lg-3",
            "mb-3"
          );
          cardDiv.innerHTML = `<div class="card text-white text-center" style="background-color: #212121">
        <img src="${album.cover_xl}" alt="${album.title}" class="card-img-top rounded" />
        <div class="card-body d-flex flex-column justify-content-between" style="height: 210px">
          <h6 class="card-title">${album.title}</h6>
          <small class="text-secondary">${artist.name}</small>
          <a href="./album.html?id=${album.id}" target="_blank" class="btn btn-outline-light">Tracklist</a>
        </div>
      </div>`;
          randomAlbums.appendChild(cardDiv);
        }
      });
    })
    .catch((error) => console.error("Error:", error));
}
// script per la search bar
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchData = searchInput.value.toLowerCase();
  if (searchData) {
    // pulisco i div per accogliere il nuovo artista
    firstSection.innerHTML = "";
    randomAlbums.innerHTML = "";
    // ri-avvio la get con il paramento della seachbar
    getArtistData(searchData);
    // pulisco campo della searchbar
    searchInput.value = "";
  } else alert("Artista non trovato");
  searchInput.value = "";
});
