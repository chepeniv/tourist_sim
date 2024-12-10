#!/usr/bin/node
/* global $ */

// if encoded with prime numbers use a dictionary
const wallEncodings = [
  /* 00 - 00 */ 'no-wall',

  /* 01 - 02 */ 'left-wall',
  /* 02 - 03 */ 'top-wall',
  /* 03 - 05 */ 'right-wall',
  /* 04 - 07 */ 'bottom-wall',

  /* 05 - 11 */ 'right-wall left-wall',
  /* 06 - 13 */ 'top-wall bottom-wall',

  /* 07 - 17 */ 'right-wall bottom-wall left-wall',
  /* 08 - 19 */ 'top-wall left-wall bottom-wall',
  /* 09 - 23 */ 'right-wall top-wall left-wall',
  /* 10 - 29 */ 'top-wall right-wall bottom-wall',

  /* 11 - 31 */ 'left-wall top-wall',
  /* 12 - 37 */ 'right-wall top-wall',
  /* 13 - 41 */ 'right-wall bottom-wall',
  /* 14 - 43 */ 'left-wall bottom-wall'
];

const initMaze = [
  [0, 4, 4, 3],
  [14, 11, 5, 1],
  [4, 10, 1, 6],
  [6, 3, 7, 4],

  [4, 6, 1, 6],
  [6, 12, 11, 4],
  [3, 7, 5, 6],
  [0, 1, 2, 1]
];

// fetch generated maze from file
// if no such maze exist use default init
const mazeLayout = initMaze;

function drawMaze (layout) {
  const height = layout.length;
  const width = Math.floor(height / 2);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const shift = y % 2;
      const row = y;
      const column = (x * 2) + shift;

      const code = layout[y][x];
      const walls = wallEncodings[code];

      const coordinates = `.${row} .${column}`;
      $(coordinates).addClass(walls);
    }
  }
}

$(function () {
  drawMaze(mazeLayout);
});
