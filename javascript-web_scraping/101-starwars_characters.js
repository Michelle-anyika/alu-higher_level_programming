#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./101-starwars_characters.js <movie_id>');
  process.exit(1);
}

const filmUrl = `https://swapi.dev/api/films/${movieId}/`;

request(filmUrl, { json: true }, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  if (response.statusCode !== 200) {
    console.error(`Failed to fetch film ${movieId}: Status code ${response.statusCode}`);
    return;
  }

  const characters = body.characters;
  if (!characters || characters.length === 0) {
    return;
  }

  // Function to fetch a single character's name
  const fetchCharacterName = (url) => {
    return new Promise((resolve, reject) => {
      request(url, { json: true }, (err, res, charBody) => {
        if (err) reject(err);
        else if (res.statusCode !== 200) reject(new Error(`Failed to fetch ${url}`));
        else resolve(charBody.name);
      });
    });
  };

  // Sequentially fetch and print character names to keep order
  (async () => {
    for (const charUrl of characters) {
      try {
        const name = await fetchCharacterName(charUrl);
        console.log(name);
      } catch (e) {
        console.error(e.message);
      }
    }
  })();
});
