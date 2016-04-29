/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var col = 0;
  for (var i = 0; i < n; i++) {
    board.togglePiece(i, col);
    col++;
  }
  var solution = board.rows();
  //console.log(solution); //fixme
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 1) {
    return 1;
  }
  return n * countNRooksSolutions(n - 1);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var rows = board.rows();
  var row = arguments[1] || 0;

  var check = function(row) {
    if (row === rows.length) {
      solution = solution.concat(rows);
      return;
    }
    for (var col = 0; col < rows.length; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        check(++row);
        if (solution.length > 0) {
          return solution;
        }
        board.togglePiece(--row, col);
      } else {
        board.togglePiece(row, col);
      }
    }
  };
  check(row);
  if (n === 2 || n === 3) {
    solution = rows;
  }
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var checkCount = function(row, board) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; ++col) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        checkCount(row + 1, board);
      }
      board.togglePiece(row, col);
    }
  };
  checkCount(0, board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
