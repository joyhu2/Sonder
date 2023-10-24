const baseUrl = 'https://data.gov.au/data/api/3/action/datastore_search';

const queryParams = {
    resource_id: 'ef2c8a26-efc6-4f57-8149-7ea2ad75ce3a',
	limit: 20
};

const queryString = new URLSearchParams(queryParams).toString();

const urlWithParams = baseUrl + "?" + queryString;

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {
      // Access the current record in the records array
      const records = data.result.records[0]; 
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
      //currentRecordIndex++; 
})
.catch(error => console.log('error', error));