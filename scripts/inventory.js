#!/usr/bin/node
/* global $ */

const tableSize = 4;

function inventoryRow (size) {
  $('.items-table').append('<tr class="items-row"></tr>');

  const lastRow = $('.items-row').last();
  for (let i = 0; i < size; i++) {
    lastRow.append('<td class="item empty"></td>');
  }
}

function inventoryTable (size) {
  for (let i = 0; i < size; i++) {
    inventoryRow(size);
  }
}

$(function () {
  inventoryTable(tableSize);
});
