document.addEventListener("readystatechange", function(event) {
  if(event.target.readyState == "interactive") {

      // Adding a "JavaScript is Enabled" Body Class
      document.querySelector("body").classList.add("js");

      // Podcast Player Controls
      document.querySelector("#podcast .player-controls a:first-child").addEventListener("click", function(event) {
          this.parentElement.classList.toggle("playing");
          const audioElement = document.getElementById("audio");
          audioElement.play();
          event.preventDefault();
      });

      document.querySelector("#podcast .player-controls a:last-child").addEventListener("click", function(event) {
          this.parentElement.classList.toggle("playing");
          const audioElement = document.getElementById("audio");
          audioElement.pause();
          event.preventDefault();
      });
      
  }
});


const baseUrl = 'https://data.gov.au/data/api/3/action/datastore_search';

const queryParams = {
  resource_id: 'ef2c8a26-efc6-4f57-8149-7ea2ad75ce3a',
	limit: 100
};

const queryString = new URLSearchParams(queryParams).toString();

const urlWithParams = baseUrl + "?" + queryString;

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let currentRecordIndex = 0; // Keep track of the current record index

const getNextSong = () => {
  // Fetch the next song's data
  fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {
      // Access the current record in the records array
      const records = data.result.records[currentRecordIndex]; 
      const bird_song_url_full = records.URL;
      const bird_song_url = bird_song_url_full.split(";")[0] + ".mp3";

      const audioElement = document.getElementById("audio");
      const sourceElement = audioElement.querySelector("source");

      // Update the src attribute
      sourceElement.setAttribute("src", bird_song_url);
      audioElement.load();

      // Increment the index for the next song
      currentRecordIndex++; 
    })
    .catch(error => console.log('error', error));
};

// Initialize the first song
getNextSong();

// Listen for the 'ended' event on the audio element
document.getElementById("audio").addEventListener("ended", () => {
  getNextSong(); // Fetch and play the next song
});

let currentRecordIndex_1 = 0;

fetch(urlWithParams, requestOptions)
  .then(response => response.json())
  .then(data => {
      // Access the current record in the records array
    const records = data.result.records[currentRecordIndex_1]; 
    const birdNamesString = records['Subjectheadings:Topical'];
    const birdNamesArray = birdNamesString.split(';');

    const defaultBirdNames = ['Default Bird 1', 'Default Bird 2', 'Default Bird 3'];

    const h3Elements = document.querySelectorAll('.gallery h3');

    for (let i = 0; i < h3Elements.length; i++) {
      if (birdNamesArray[i + 3]) { // +2 because we start from the third item
          h3Elements[i].textContent = birdNamesArray[i + 3];
      } else {
          h3Elements[i].textContent = defaultBirdNames[i];
      }
    }

      // Increment the index for the next song
    currentRecordIndex_1++; 
})
.catch(error => console.log('error', error));