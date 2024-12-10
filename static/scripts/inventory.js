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

function acceptItem () {
  const pos = $('.player-pos');
  if (pos.hasClass('item-block')) {
    const emptySlot = $('.empty-slot').first();
    emptySlot.addClass('full-slot');
    emptySlot.removeClass('empty-slot');
    clearItem();
  }
}

function clearItem () {
  const pos = $('.player-pos');
  if (pos.hasClass('item-block')) {
    pos.removeClass('item-block');
    $('.encounter-box h3').text('Encounters');
    $('.encounter-box img').hide();
    $('.interaction').hide();
  }
}

function initItemInteraction () {
  const pos = $('.player-pos');
  if (pos.hasClass('item-block')) {
    $('.encounter-box h3').text('Item');
    $('.encounter-box img').show();

    $('.interaction').show();
    $('#dismiss button').text('decline');
    $('#engage button').text('pickup');
  }
}

$(function () {
  inventoryTable(tableSize);
  dropRandItems(8);

  $('html').on('keydown', function (e) {
    initItemInteraction();
  });

  $('#engage').on('click', function () {
    const pos = $('.player-pos');
    if (pos.hasClass('item-block')) {
      acceptItem();
    }
  });

  $('#dismiss').on('click', function () {
    clearItem();
  });
});
