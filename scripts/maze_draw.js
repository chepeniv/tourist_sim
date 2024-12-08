#!/usr/bin/node
/* global $ */

// if encoded with prime numbers use a dictionary
const wallEncodings = [
  /* 00 - 00 */ 'no-wall',

  /* 01 - 02 */ 'right-wall',
  /* 02 - 03 */ 'top-wall',
  /* 03 - 05 */ 'left-wall',
  /* 04 - 07 */ 'bottom-wall',

  /* 05 - 11 */ 'right-wall left-wall',
  /* 06 - 13 */ 'top-wall bottom-wall',

  /* 07 - 17 */ 'right-wall bottom-wall left-wall',
  /* 08 - 19 */ 'top-wall right-wall bottom-wall',
  /* 09 - 23 */ 'right-wall top-wall left-wall',
  /* 10 - 29 */ 'top-wall left-wall bottom-wall',

  /* 11 - 31 */ 'right-wall top-wall',
  /* 12 - 37 */ 'left-wall top-wall',
  /* 13 - 41 */ 'left-wall bottom-wall',
  /* 14 - 43 */ 'right-wall bottom-wall'
];

const initMaze = [
  [0, 4, 4, 3],
  [14, 2, 5, 1],
  [3, 10, 1, 6],
  [6, 3, 7, 4],

  [4, 6, 1, 6],
  [6, 12, 11, 4],
  [3, 7, 5, 6],
  [0, 1, 6, 1]
];

// fetch generated maze from file
// if no such maze exist use default init
const mazeLayout = initMaze;

function drawMaze (layout) {
  const size = layout.length;
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      const coordinates = `.${row} .${column}`;
      const wallCode = layout[row][column];
      const walls = wallEncodings[wallCode];
      $(coordinates).addClass(walls);
    }
  }
}

$(function () {
  drawMaze(mazeLayout);
});
