#!/usr/bin/node
/* global $ */

const mazeSize = 16;

function buildRow (size, i) {
  $('.maze').append(`<tr class="row r${i}"></tr>`);
  for (let i = 0; i < size; i++) {
    $('tr').last().append(`<td class="block b${i}"></td>`);
  }
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
}

function setEntry (size) {
  const entry = Math.floor(Math.random() * size);
  const row = `.r${entry} .b0`;
  $(row).addClass('player_pos');
}

$(function () {
  buildMazeGrid(mazeSize);
  setEntry(mazeSize);
});
