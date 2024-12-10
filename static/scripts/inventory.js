#!/usr/bin/node
/* global $ */

const tableSize = 2;

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
  const isFull = $('.items-table').hasClass('inventory-full');
  if (!isFull) {
    const freeSlot = $('.empty-slot').first();
    freeSlot.addClass('full-slot');
    freeSlot.removeClass('empty-slot');
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
    $('.items-table').removeClass('inventory-full');
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

    const freeSlot = $('.empty-slot');
    if (!freeSlot[0]) {
      $('.items-table').addClass('inventory-full');
      $('.inventory h3').text('Remove Item');
    }
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
