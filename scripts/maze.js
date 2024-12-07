#!/usr/bin/node
/* global $ */

const mazeSize = 16;

const left = 37;
const up = 38;
const right = 39;
const down = 40;

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
