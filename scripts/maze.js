#!/usr/bin/node
/* global $ */

function buildRow (size) {
  $('.maze').append('<tr class="row"></tr>');
  for (let i = 0; i < size; i++) {
    $('tr').last().append('<td class="block"></td>');
  }
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size);
  }
}

$(function () {
  buildMazeGrid(16);
});
