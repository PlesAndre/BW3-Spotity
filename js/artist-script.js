const mainArtist = document.querySelector("main");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

function getArtistData(query) {
  const URL = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Artista non caricato");
      }
      return response.json();
    })
    .then((json) => {
      // converto il parametro json in json.data
      const data = json.data;
      getFooterInfo(data[0].album.cover, data[0].title, data[0].artist.name);
      // prende l'artista che viene selezionato dal index.html
      const artistInfo = data[0].artist;
      // crea un <div> dove all'interno gli passo HTML con il nome, l'immagine e il verificato dell'artista
      const artistName = document.createElement("div");
      artistName.className = "d-flex align-items-center";
      artistName.id = "artistContainer";
      artistName.innerHTML = `
          <img
            src="${artistInfo.picture_xl}"
            alt="${artistInfo.name}"
            class="w-100 h-100 object-fit-fill"
          />
          <div id="verified">
            <p>Artista verificato 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
              </svg>
            </p>
            <h2 class="artistName">${artistInfo.name}</h2>
          </div>
      `;

      // crea un <p> "Popolari"
      const paragraph = document.createElement("p");
      paragraph.innerText = "Discografia Artista";
      paragraph.className = "popular";

      // crea un <div> dove all'interno gli passo tutti gli album dell'artista selezionato
      const artistAlbums = document.createElement("div");
      artistAlbums.className =
        "d-flex flex-column align-items-start albumContainer";

      // la <ol> viene creata per dargli un numero crescente agli album passati all'interno delle <li>
      const ol = document.createElement("ol");
      ol.className = "album-list";

      // prende solamente gli album inerenti all'artista
      const artistData = data.filter(
        (currentAlbum) => currentAlbum.artist.id === artistInfo.id
      );

      // il forEach mi crea l'apposito <li> con ogni album presi dalla fetch
      artistData.forEach((albumEl, indexLiEl) => {
        const li = document.createElement("li");

        // lo span mi incrementa l'indice ogni volta che crea un <li>, per far in modo che possa modificare il numero della <ol> tramite CSS
        li.innerHTML = `
          <span class="album-number">${indexLiEl + 1}</span> 
          <a class="linkAlbum d-flex" href="./album.html?id=${
            albumEl.album.id
          }">
            <img
              src="${albumEl.album.cover_medium}"
              alt="${albumEl.album.title}"
              class="img-fluid rounded"
              style="width: 70px; height: 70px"
            />
            <div class="d-flex align-items-center">
              <span>${albumEl.album.title}</span>
            </div>
          </a>
        `;

        ol.appendChild(li);
      });

      // appende la <ol> al div artistAlbums
      artistAlbums.appendChild(ol);

      mainArtist.appendChild(artistName);
      mainArtist.appendChild(paragraph);
      mainArtist.appendChild(artistAlbums);
    })
    .catch((error) => console.error("Error:", error));
}
// avvio la get con la query passata dalla pagina home
window.onload = () => getArtistData(query);
