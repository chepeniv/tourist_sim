#!/usr/bin/node
/* global $ */

// if encoded with prime numbers use a dictionary
// ref: 00 02 03 05 07 11 13 17 19 23 29 31 37 41 43
const wallEncodings = [
  'no-wall',
  'left-wall',
  'right-wall',
  'left-wall right-wall',

  'top-wall',
  'left-wall top-wall',
  'right-wall top-wall',
  'left-wall right-wall top-wall',

  'bottom-wall',
  'left-wall bottom-wall',
  'right-wall bottom-wall',
  'left-wall right-wall bottom-wall',

  'top-wall bottom-wall',
  'left-wall top-wall bottom-wall',
  'right-wall top-wall bottom-wall '
];

// default 12x12 maze
const initMaze = [
  [7, 6, 6, 6, 12, 6],
  [3, 10, 3, 3, 4, 3],
  [9, 5, 9, 3, 6, 6],
  [6, 12, 14, 11, 7, 2],
  [3, 9, 9, 9, 10, 6],
  [5, 3, 9, 5, 4, 3],

  [3, 3, 1, 9, 7, 12],
  [3, 3, 3, 12, 12, 6],
  [3, 9, 3, 3, 4, 3],
  [10, 6, 9, 12, 3, 6],
  [3, 2, 9, 5, 6, 14],
  [12, 9, 12, 13, 12, 10]
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
