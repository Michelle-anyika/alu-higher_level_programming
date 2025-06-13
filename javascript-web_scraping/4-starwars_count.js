#!/usr/bin/node
const request = require('request');

const url = process.argv[2];
const characterId = '18';

request(url, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const data = JSON.parse(body);
    let count = 0;

    for (const film of data.results) {
      for (const character of film.characters) {
        if (character.includes(`/people/${characterId}/`)) {
          count++;
          break;
        }
      }
    }

    console.log(count);
  }
});
