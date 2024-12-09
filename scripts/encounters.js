#!/usr/bin/node
/* global $ */

//   display character : ignore / engage
//   if engage : polite, mellow, rude,
//   implement key-press option selection

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

function respond () {
  const pos = $('.player-pos');
  pos.removeClass('encounter active');
  $('.response').hide();
  $('.encounter-box img').hide();
  $('.encounter-box p').clear();
  $('.encounter-box p').show();
}

function respondPositively () {
  respond();
  effectStats(1);
}

function respondNeutrally () {
  respond();
  effectStats(0);
}

function respondNegatively () {
  respond();
  effectStats(-1);
}

function initEncounter () {
  const pos = $('.player-pos');
  if (pos.hasClass('encounter') && !pos.hasClass('active')) {
    pos.addClass('active');
    $('.character').show();
    $('.encounter-box img').show();
    $('.encounter-box p').hide();
  }
}

$(function () {
  createEncounters(8);

  $('.encounter-box img').hide();
  $('.response').hide();
  $('.character').hide();

  $('html').on('keydown', function (e) {
    initEncounter();
  });

  $('#engage').on('click', function () {
    $('.encounter-box img').hide();
    $('.encounter-box p').show();
    $('.character').hide();
    $('.response').show();
  });

  $('#ignore').on('click', function () {
    $('.character').hide();
    respond();
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
