import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Chessboard from 'chessboardjs';
import * as Chess from 'chess.js';


@Component({
  selector: 'app-feeds-container',
  templateUrl: './feeds-container.component.html',
  styleUrls: ['./feeds-container.component.scss']
})
export class FeedsContainerComponent implements OnInit {
  board;
  constructor() {
  }



  ngOnInit() {
    $(document).ready(function(){
      var board,
        boardEl = $('#board'),
        game = new Chess(),
        squareToHighlight;

      var removeHighlights = function(color) {
        boardEl.find('.square-55d63')
          .removeClass('highlight-' + color);
      };

      var makeRandomMove = function() {
        var possibleMoves = game.moves({
          verbose: true
        });

        // game over
        if (possibleMoves.length === 0) return;

        var randomIndex = Math.floor(Math.random() * possibleMoves.length);
        var move = possibleMoves[randomIndex];
        game.move(move.san);

        // highlight black's move
        removeHighlights('black');
        boardEl.find('.square-' + move.from).addClass('highlight-black');
        squareToHighlight = move.to;

        // update the board to the new position
        board.position(game.fen());
      };

      var onDrop = function(source, target) {
        // see if the move is legal
        console.log(JSON.stringify(source));
        console.log(JSON.stringify(target));
        var move = game.move({
          from: source,
          to: target,
          promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';

        // highlight white's move
        removeHighlights('white');
        boardEl.find('.square-' + source).addClass('highlight-white');
        boardEl.find('.square-' + target).addClass('highlight-white');
        console.log(board.fen());
        console.log(move.san);

        // make random move for black
        window.setTimeout(makeRandomMove, 250);
      };

      // do not pick up pieces if the game is over
      // only pick up pieces for White
      var onDragStart = function(source, piece, position, orientation) {
        if (game.in_checkmate() === true || game.in_draw() === true ||
          piece.search(/^b/) !== -1) {
          return false;
        }
      };

      var onMoveEnd = function() {
        boardEl.find('.square-' + squareToHighlight)
          .addClass('highlight-black');
      };

// update the board position after the piece snap
// for castling, en passant, pawn promotion
      var onSnapEnd = function() {
        board.position(game.fen());
      };

      var cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMoveEnd: onMoveEnd,
        onSnapEnd: onSnapEnd
      };
      board = Chessboard('board', cfg);
    });
  }

}
