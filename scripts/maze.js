#!/usr/bin/node
/* global $ */

const mazeSize = 16;

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

// block type definitions
const horHall = 0;
const vertHall = 1;
const deadEndDown = 2;
const deadEndLeft = 3;
const deadEndUp = 4;
const deadEndRight = 5;
const cornerUpLeft = 6;
const cornerUpRight = 7;
const cornerDownRight = 8;
const cornerDownLeft = 9;

function buildRow (size, i) {
  $('.maze').append(`<tr class="row ${i}"></tr>`);
  for (let i = 0; i < size; i++) {
    $('tr').last().append(`<td class="block ${i}"></td>`);
  }
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
}

// create random entry point on left edge
function setEntry (size) {
  const entry = Math.floor(Math.random() * size);
  const row = `.${entry} .0`;
  $(row).first().addClass('player_pos');
}

$(function () {
  buildMazeGrid(mazeSize);
  setEntry(mazeSize);

  $('html').bind('keyup', function (e) {
    if (e.keyCode < left || down < e.keyCode) {
      return;
    }

    const oldPos = $('.player_pos');
    const index = oldPos.index();
    const rowIndex = oldPos.parent().index();
    oldPos.toggleClass('player_pos');

    if (e.keyCode === right) {
      oldPos.next().toggleClass('player_pos');
    } else if (e.keyCode === left) {
      oldPos.prev().toggleClass('player_pos');
    } else if (e.keyCode === up) {
      const newPos = `.${rowIndex - 1} .${index}`;
      $(newPos).toggleClass('player_pos');
    } else {
      const newPos = `.${rowIndex + 1} .${index}`;
      $(newPos).toggleClass('player_pos');
    }
  });
});
