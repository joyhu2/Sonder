document.addEventListener("readystatechange", function(event) {
	if(event.target.readyState == "interactive") {

		// Adding a "JavaScript is Enabled" Body Class

		document.querySelector("body").classList.add("js");
		// Or this shorter version: document.body.classList.add("js");

		// Podcast Player Controls

		document.querySelector("#podcast .player-controls a:first-child").addEventListener("click", function(event) {
			this.parentElement.classList.toggle("playing");
			document.querySelector("#podcast audio").play();
			event.preventDefault();
		});

		document.querySelector("#podcast .player-controls a:last-child").addEventListener("click", function(event) {
			this.parentElement.classList.toggle("playing");
			document.querySelector("#podcast audio").pause();
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
      const records = data.result.records[currentRecordIndex]; // Access the current record in the records array
      const bird_song_url_full = records.URL;
      const bird_song_url = bird_song_url_full.split(";")[0] + ".mp3";

      const audioElement = document.getElementById("audio");
      const sourceElement = audioElement.querySelector("source");

      // Update the src attribute
      sourceElement.setAttribute("src", bird_song_url);
      audioElement.load();

      currentRecordIndex++; // Increment the index for the next song
    })
    .catch(error => console.log('error', error));
};

// Initialize the first song
getNextSong();

// Listen for the 'ended' event on the audio element
document.getElementById("audio").addEventListener("ended", () => {
  getNextSong(); // Fetch and play the next song
});


/*fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {
		const records = data.result.records[0];  // Access the first record in the records array
        const bird_song_url_full = records.URL;
        const bird_song_url = bird_song_url_full.split(";")[0] + ".mp3";

		const audioElement = document.getElementById("audio");
        const sourceElement = audioElement.querySelector("source");

		// Update the src attribute
        sourceElement.setAttribute("src", bird_song_url);
		audioElement.load();
    })
    .catch(error => console.log('error', error));
*/