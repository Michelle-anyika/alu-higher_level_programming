#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./100-starwars_characters.js <movie_id>');
  process.exit(1);
}

const filmUrl = `https://swapi.dev/api/films/${movieId}/`;

// Request film data to get characters URLs
request(filmUrl, { json: true }, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch film ${movieId}: Status code ${response.statusCode}`);
    return;
  }

  const characters = body.characters; // array of character URLs
  if (!characters || characters.length === 0) {
    return;
  }

  // Function to fetch each character name
  const fetchCharacterName = (url) => {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, charBody) => {
        if (err) return reject(err);
        if (res.statusCode !== 200) return reject(new Error(`Failed to fetch character: ${url}`));
        resolve(charBody.name);
      });
    });
  };

  // Fetch all character names concurrently
  Promise.all(characters.map(fetchCharacterName))
    .then(names => {
      names.forEach(name => console.log(name));
    })
    .catch(err => {
      console.error('Error fetching characters:', err);
    });
});
