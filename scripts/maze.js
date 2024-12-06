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
    if (e.keyCode === right) {
      const oldPos = $('.player_pos');
      oldPos.toggleClass('player_pos');
      oldPos.next().toggleClass('player_pos');
    }
    if (e.keyCode === left) {
      const oldPos = $('.player_pos');
      oldPos.toggleClass('player_pos');
      oldPos.prev().toggleClass('player_pos');
    }
  });
});
