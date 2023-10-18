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
	limit: 1
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
