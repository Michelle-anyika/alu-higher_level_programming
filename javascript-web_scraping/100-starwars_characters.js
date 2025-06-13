#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

if (!movieId) process.exit();

request(url, (err, res, body) => {
  if (err) return;

  const film = JSON.parse(body);
  const characters = film.characters;

  characters.forEach((characterUrl) => {
    request(characterUrl, (err, res, body) => {
      if (!err) {
        const character = JSON.parse(body);
        console.log(character.name);
      }
    });
  });
});
