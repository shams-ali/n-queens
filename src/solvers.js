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
  var board = new Board({n: n});
  var queenCount = 0;
  var col = 0;
  var row = 0;
  var check = function() {
    if (board.hasAnyQueensConflicts(row, col)) {
      board.togglePiece(row, col); //turns off
      queenCount--;
      col++;
    } else {
      row++;
    }
    toggle();
  };
  var toggle = function() {
    if (queenCount === n || n === 2 || n === 3) {
      console.log('this is n: ' + n);
      console.log('this is queenCount: ' + queenCount);
      console.log('this is board.rows(): ' + board.rows());
      //debugger;
      return board.rows();
    }
    board.togglePiece(row, col); //turns on;
    queenCount++;
    check();
  };
  toggle();
  //var solution = board.rows(); //fixme
  var solution = toggle();
  console.log('this is solution: ' + solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
