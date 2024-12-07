#!/usr/bin/node
/* global $ */

const wallEncodings = [
  'no-wall', 'top-wall', 'right-wall', 'bottom-wall', 'left-wall'
/* ------ 0, -------- 1, ---------- 2, ----------- 3, --------- 4 */
];

const initMaze = [
  [0, 3, 4, 3, 0, 0, 0, 0],
  [2, 0, 2, 2, 0, 4, 0, 0],
  [2, 1, 2, 2, 3, 4, 0, 0],
  [2, 3, 3, 3, 0, 3, 3, 0],

  [0, 3, 3, 0, 3, 3, 3, 0],
  [0, 2, 2, 0, 4, 0, 0, 0],
  [0, 2, 2, 0, 4, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
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
