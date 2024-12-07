#!/usr/bin/node
/* global $ */

// TASK
// implement key hold down
// implement map bounds
// implement exit blocks
// implement padding on entry and exit blocks

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

function buildMazeGrid (size) {
  for (let i = 0; i < size; i++) {
    buildRow(size, i);
  }
}

function setEntry (size) {
  const entry = Math.floor(Math.random() * size);
  const row = `.${entry} .0`;
  $(row).first().addClass('player_pos');
}

$(function () {
  buildMazeGrid(mazeSize);
  setEntry(mazeSize);

  $('html').bind('keyup', function (e) {
    if (e.keyCode < left || down < e.keyCode) {
      return;
    }

    const oldPos = $('.player_pos');
    const index = oldPos.index();
    const rowIndex = oldPos.parent().index();

    const boundRight = oldPos.hasClass('bound-right');
    const boundLeft = oldPos.hasClass('bound-left');
    const boundTop = oldPos.hasClass('bound-top');
    const boundBottom = oldPos.hasClass('bound-bottom');

    if (e.keyCode === right && !boundRight) {
      oldPos.toggleClass('player_pos');
      oldPos.next().toggleClass('player_pos');
    } else if (e.keyCode === left && !boundLeft) {
      oldPos.toggleClass('player_pos');
      oldPos.prev().toggleClass('player_pos');
    } else if (e.keyCode === up && !boundTop) {
      oldPos.toggleClass('player_pos');
      const newPos = `.${rowIndex - 1} .${index}`;
      $(newPos).toggleClass('player_pos');
    } else if (e.keyCode === down && !boundBottom) {
      oldPos.toggleClass('player_pos');
      const newPos = `.${rowIndex + 1} .${index}`;
      $(newPos).toggleClass('player_pos');
    }
  });
});
