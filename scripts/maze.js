#!/usr/bin/node
/* global $ */

// TASK
// implement key hold down
// implement map bounds
// implement block bounds
// implement exit blocks
// implement padding on entry and exit blocks

// const fs = require('fs');

const mazeSize = 16;

// key codes
const left = 37;
const up = 38;
const right = 39;
const down = 40;

// block type definitions
const horHall = 0;
const verHall = 1;
const deadEndDown = 2;
const deadEndLeft = 3;
const deadEndUp = 4;
const deadEndRight = 5;
const cornerUpLeft = 6;
const cornerUpRight = 7;
const cornerDownRight = 8;
const cornerDownLeft = 9;

// temporary: suppressing errors
console.log(horHall, verHall, deadEndDown, deadEndUp, deadEndLeft, deadEndRight);
console.log(cornerUpRight, cornerUpLeft, cornerDownLeft, cornerDownRight);

function buildRow (size, y) {
  $('.maze').append(`<tr class="row ${y}"></tr>`);
  const lastRow = $('tr').last();

  for (let x = 0; x < size; x++) {
    lastRow.append(`<td class="block ${x}"></td>`);
    const lastBlock = lastRow.children().last();
    if (y === 0) {
      lastBlock.addClass('bound-top');
    }
    if (y === size - 1) {
      lastBlock.addClass('bound-bottom');
    }
    if (x === 0) {
      lastBlock.addClass('bound-left');
    }
    if (x === size - 1) {
      lastBlock.addClass('bound-right');
    }
  }
}

function padNum (size) {
  const center = size / 2;
  return Math.floor((Math.random() * center) + (center / 2));
}

function setEntry (size) {
  const entry = padNum(size);
  const row = `.${entry} .0`;
  $(row).addClass('player-pos');
}

function setExits (size) {
  const topExit = padNum(size);
  const rightExit = padNum(size);
  const bottomExit = padNum(size);

  const topEdge = `.0 .${topExit}`;
  const rightEdge = `.${rightExit} .${size - 1}`;
  const bottomEdge = `.${size - 1} .${bottomExit}`;

  $(topEdge).addClass('exit-top');
  $(rightEdge).addClass('exit-right');
  $(bottomEdge).addClass('exit-bottom');
}

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
  setEntry(size);
  setExits(size);
}

$(function () {
  buildMazeGrid(mazeSize);

  $('html').bind('keyup', function (e) {
    if (e.keyCode < left || down < e.keyCode) {
      return;
    }

    const oldPos = $('.player-pos');
    const index = oldPos.index();
    const rowIndex = oldPos.parent().index();

    const boundRight = oldPos.hasClass('bound-right');
    const boundLeft = oldPos.hasClass('bound-left');
    const boundTop = oldPos.hasClass('bound-top');
    const boundBottom = oldPos.hasClass('bound-bottom');

    if (e.keyCode === right && !boundRight) {
      oldPos.toggleClass('player-pos');
      oldPos.next().toggleClass('player-pos');
    } else if (e.keyCode === left && !boundLeft) {
      oldPos.toggleClass('player-pos');
      oldPos.prev().toggleClass('player-pos');
    } else if (e.keyCode === up && !boundTop) {
      oldPos.toggleClass('player-pos');
      const newPos = `.${rowIndex - 1} .${index}`;
      $(newPos).toggleClass('player-pos');
    } else if (e.keyCode === down && !boundBottom) {
      oldPos.toggleClass('player-pos');
      const newPos = `.${rowIndex + 1} .${index}`;
      $(newPos).toggleClass('player-pos');
    }
  });
});
