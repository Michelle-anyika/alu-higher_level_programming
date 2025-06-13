#!/usr/bin/node
const request = require('request');

const url = process.argv[2];

request(url, (err, response, body) => {
  if (err) {
    console.log(err);
  } else {
    const todos = JSON.parse(body);
    const completed = {};

    todos.forEach((todo) => {
      if (todo.completed) {
        if (completed[todo.userId]) {
          completed[todo.userId]++;
        } else {
          completed[todo.userId] = 1;
        }
      }
    });

    console.log(completed);
  }
});
