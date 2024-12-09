#!/usr/bin/node
/* global $ */

//   implement key-press option selection
//   add consequences

function createEncounters (size) {
  for (let i = 0; i < size; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    $(`.${randY} .${randX}`).addClass('encounter');
  }
}

function effectStats (num) {
  // modify health and cash bars
}

function endEncounter () {
  $('.player-pos').removeClass('encounter active');
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
    $('.encounter-box img').show();
    $('.character').show();
  }
}

function dismissEncounter () {
  $('.player-pos').removeClass('encounter active');
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
