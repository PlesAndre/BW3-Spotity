const params = new URLSearchParams(window.location.search);
const query = params.get("id");

const firstSection = document.getElementById("top-page-artist");
const ol = document.getElementById("tracklist");

function getTracklistData(query) {
  const URL = `https://striveschool-api.herokuapp.com/api/deezer/album/${query}`;
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Artista non caricato");
      }
      return response.json();
    })
    .then((data) => {
      let artist = data.artist;
      getFooterInfo(data.cover, data.title, data.artist.name);
      // creo il div per l'artista e il suo 1° album del json

      firstSection.innerHTML = `<div class="d-flex align-items-center">
            <img
               src="${data.cover_xl}"
              alt="Img: ${data.tille}"
              class="img-fluid me-3 rounded"
             style="width: 250px; height: 250px"
            />
              <div>
              <div class="card-header mx-2">
                  <h6>ALBUM</h6>
                  <h1 class="fs-1">${data.title}</h1>
                  <div class="d-flex justify-content-start mt-5">
                  <img
               src="${artist.picture_small}"
              alt="Img: ${artist.name}"
              class="img-fluid me-3 rounded-circle"
             style="width: 30px; height: 30px"
            />
                  <p class="fw-light px-2">${artist.name}</p>
                  <p class="fw-light px-2">${data.release_date}</p>
                  <p class="fw-light px-2">${data.nb_tracks} Tracce</p>
                  <p id="duration" class="fw-light px-2"></p>
                  </div>
                </div>
              </div>
            </div>`;

      const trackData = data.tracks.data;
      trackData.forEach((track, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="linkAlbum" href="#"><span class="album-number">${
          index + 1
        }</span> 
        <span>${track.title}</span><a/> `;
        ol.appendChild(li);
      });

      convertSeconds(data.duration);

      function convertSeconds(duration) {
        console.log(duration);
        const durations = document.getElementById("duration");
        const min = Math.floor(duration / 60);
        const sec = duration % 60;
        durations.innerHTML = `<p id="duration" class="fw-light px-2">Tot: ${min} minuti e ${sec} secondi</p>`;
      }
    });
}

getTracklistData(query);
