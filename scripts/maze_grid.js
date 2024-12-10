#!/usr/bin/node
/* global $ */

const mazeSize = 8;
const lastRow = mazeSize - 1;
const lastColumn = lastRow;

// used to confine and center entry and exits
function padNum (size) {
  const center = size / 2;
  return Math.floor((Math.random() * center) + (center / 2));
}

function buildRow (size, y) {
  $('.maze').append(`<tr class="row ${y}"></tr>`);
  const lastRow = $('tr').last();

  for (let x = 0; x < size; x++) {
    lastRow.append(`<td class="block ${x}"></td>`);
    const lastBlock = lastRow.children().last();
    if (y === 0) {
      lastBlock.addClass('top-wall');
    }
    if (y === size - 1) {
      lastBlock.addClass('bottom-wall');
    }
    if (x === 0) {
      lastBlock.addClass('left-wall');
    }
    if (x === size - 1) {
      lastBlock.addClass('right-wall');
    }
  }
}

function setEntry (size) {
  const entry = padNum(size);
  const row = `.${entry} .0`;
  $(row).addClass('player-pos');
}

function setExits (size) {
  const topExit = padNum(size);
  const rightExit = padNum(size);
  const bottomExit = padNum(size);

  const topEdge = `.0 .${topExit}`;
  const rightEdge = `.${rightExit} .${lastColumn}`;
  const bottomEdge = `.${lastRow} .${bottomExit}`;

  $(topEdge).addClass('exit-top');
  $(rightEdge).addClass('exit-right');
  $(bottomEdge).addClass('exit-bottom');
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
  setEntry(size);
  setExits(size);
}

$(function () {
  buildMazeGrid(mazeSize);
});
