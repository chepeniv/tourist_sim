#!/usr/bin/node
/* global $ */

//   implement key-press option selection

const stats = {
  name: ['health', 'cash'],
  values: [20, 5],
  colors: [20, 5]
};

function initStats () {
  $('.health').css({ width: `${stats.values[0]}%` });
  $('.cash').css({ width: `${stats.values[1]}%` });
}

// populate the map with encounters randomly
function createEncounters (size) {
  for (let i = 0; i < size; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    $(`.${randY} .${randX}`).addClass('encounter');
  }
}

// this is primarily to check that the stats work
function effectStats (num) {
  const change = Math.floor(Math.random() * 15);
  const select = Math.floor(Math.random() * 2) % 2;
  const oldVal = stats.values[select];
  if (num > 0) {
    stats.values[select] = oldVal + change;
    $(`.${stats.name[select]}`).css({ width: `${stats.values[select]}%` });
  } else if (num < 0) {
    stats.values[select] = oldVal - change;
    $(`.${stats.name[select]}`).css({ width: `${stats.values[select]}%` });
  } else {
    console.log('no change');
  }
}

function endEncounter () {
  $('.player-pos').removeClass('encounter active');
  $('.encounter-box h3').text('Encounters');
  $('.encounter-box p').hide();
  $('.response').hide();
}

function respondPositively () {
  endEncounter();
  effectStats(1);
}

function respondNeutrally () {
  endEncounter();
  effectStats(0);
}

function respondNegatively () {
  endEncounter();
  effectStats(-1);
}

function initEncounter () {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('active')) {
    pos.addClass('active');
    $('.encounter-box h3').text('Name');
    $('.encounter-box img').show();
    $('.character').show();
  }
}

function dismissEncounter () {
  $('.player-pos').removeClass('encounter active');
  $('.encounter-box h3').text('Encounters');
  $('.encounter-box img').hide();
  $('.character').hide();
}

function engageEncounter () {
  const rand = Math.floor(Math.random() * 4);
  const rantText = `static/assets/dialogue/enc_dialog-${rand}.txt`;
  $.get(rantText, function (data) {
    $('.encounter-box p').text(data);
  }, 'text');

  $('.encounter-box img').hide();
  $('.character').hide();

  $('.encounter-box p').show();
  $('.response').show();
}

$(function () {
  createEncounters(8);
  initStats();

  $('.encounter-box img').hide();
  $('.encounter-box p').hide();
  $('.response').hide();
  $('.character').hide();

  $('html').on('keydown', function (e) {
    initEncounter();
  });

  $('#engage').on('click', function () {
    engageEncounter();
  });

  $('#dismiss').on('click', function () {
    dismissEncounter();
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
});
