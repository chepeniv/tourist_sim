#!/usr/bin/node
/* global $ */

const tableSize = 4;

function inventoryRow (size) {
  $('.items-table').append('<tr class="items-row"></tr>');

  const lastRow = $('.items-row').last();
  for (let i = 0; i < size; i++) {
    lastRow.append('<td class="empty-slot"></td>');
  }
}

// drop items across the map randomly
function dropRandItems (size) {
  for (let i = 0; i < size; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    $(`.${randY} .${randX}`).addClass('item-block');
  }
}

function inventoryTable (size) {
  for (let i = 0; i < size; i++) {
    inventoryRow(size);
  }
}

function examineItem () {
  const pos = $('.player-pos');
  const emptySlot = $('.empty-slot').first();
  if (pos.hasClass('item-block')) {
    pos.removeClass('item-block');
    emptySlot.addClass('full-slot');
    emptySlot.removeClass('empty-slot');
  }
}

$(function () {
  inventoryTable(tableSize);
  dropRandItems(8);

  $('html').on('keydown', function (e) {
    examineItem();
  });
});
