#!/usr/bin/node
/* global $ */

//   implement key-press option selection

// stat codes
const health = 0;
const cash = 1;

// init values
const initHealth = 50;
const initCash = 5;

// stat storage
const stats = {
  names: ['health', 'cash'],
  values: [initHealth, initCash],
  colors: [getColor(initHealth), getColor(initCash)]
};

function getColor (num) {
  const red = Math.floor(255 * (100 - num) / 200);
  const green = Math.floor(255 * num / 100);
  const blue = Math.floor(255 * num / 600);
  return `rgb(${red}, ${green}, ${blue})`;
}

function setStat (statCode, value) {
  const name = `.${stats.names[statCode]}`;
  const color = getColor(value);

  stats.values[statCode] = value;
  stats.colors[statCode] = color;

  $(name).css({
    width: `${value}%`,
    'background-color': `${color}`
  });
}

function handleStatChange (statCode, change) {
  const newVal = stats.values[statCode] + change;
  if (newVal < 0) {
    setStat(statCode, 0);
  } else if (newVal > 100) {
    setStat(statCode, 100);
  } else {
    setStat(statCode, newVal);
  }
}

function randStatChange (direction) {
  const change = Math.floor(Math.random() * 15);
  const select = Math.ceil(Math.random() * 2) % 2;

  if (direction > 0) {
    handleStatChange(select, change);
  } else if (direction < 0) {
    handleStatChange(select, -change);
  } else {
    console.log('no change');
  }
}

function respondPositively () {
  randStatChange(1);
  endEncounter();
}

function respondNeutrally () {
  randStatChange(0);
  endEncounter();
}

function respondNegatively () {
  randStatChange(-1);
  endEncounter();
}

// populate the map with encounters randomly
function createEncounters (size) {
  for (let i = 0; i < size; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    $(`.${randY} .${randX}`).addClass('encounter');
  }
}

function initEncounter () {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('active')) {
    pos.addClass('active');
    $('.encounter-box h3').text('Name');
    $('.encounter-box img').show();

    $('.interaction').show();
    $('#dismiss button').text('ignore');
    $('#engage button').text('engage');
  }
}

function engageEncounter () {
  const rand = Math.floor(Math.random() * 4);
  const rantText = `static/assets/dialogue/enc_dialog-${rand}.txt`;
  $.get(rantText, function (data) {
    $('.encounter-box p').text(data);
  }, 'text');

  $('.items-table').addClass('ready-selection');
  $('.inventory h3').text('Select Item');

  $('.encounter-box img').hide();
  $('.interaction').hide();

  $('.encounter-box p').show();
  $('.response').show();
}

function endEncounter () {
  $('.items-table').removeClass('ready-selection');
  $('.player-pos').removeClass('encounter active');
  $('.inventory h3').text('Inventory');
  $('.encounter-box h3').text('Encounters');
  $('.encounter-box img').hide();
  $('.encounter-box p').hide();
  $('.interaction').hide();
  $('.response').hide();
}

$(function () {
  createEncounters(8);
  setStat(health, initHealth);
  setStat(cash, initCash);

  $('.encounter-box img').hide();
  $('.encounter-box p').hide();
  $('.response').hide();
  $('.interaction').hide();

  $('html').on('keydown', function (e) {
    initEncounter();
  });

  $('#engage').on('click', function () {
    const pos = $('.player-pos');
    if (pos.hasClass('encounter')) {
      engageEncounter();
    }
  });

  $('#dismiss').on('click', function () {
    endEncounter();
  });

  $('#polite').on('click', function () {
    respondPositively();
  });

  $('#mellow').on('click', function () {
    respondNeutrally();
  });

  $('#rude').on('click', function () {
    respondNegatively();
  });

  $('.items-table').on('click', 'td', function () {
    const table = $('.items-table');
    const tableIsFull = table.hasClass('inventory-full');
    const tableIsReady = table.hasClass('ready-selection');
    const slotIsFull = $(this).hasClass('full-slot');
    if (tableIsReady && !tableIsFull && slotIsFull) {
      $(this).removeClass('full-slot');
      $(this).addClass('empty-slot');
      endEncounter();
    } else if (tableIsFull) {
      $(this).removeClass('full-slot');
      $(this).addClass('empty-slot');
      table.removeClass('inventory-full');
      $('.inventory h3').text('Inventory');
    }
  });
});
