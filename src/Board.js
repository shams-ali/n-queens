// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      var arr = this.rows()[rowIndex];
      for (var i = 0; i < arr.length; i++) {
        //console.log('this is arr: ' + arr);
        //if (arr[i] === 1) {
          //console.log('this is arr[i]:' + arr[i]);
          //counter++;
        counter += arr[i];
        //}
      }
      //console.log('this is counter :' + counter);
      return counter > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //console.log(this);
      var test = false;
      var that = this;
      _.each (that.rows(), function(value, key) {
        if (that.hasRowConflictAt(key)) {
          test = true;
        }
      });
      return test;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var counter = 0;
      var row = this.rows();
      //console.log(row);
      for (var i = 0; i < row.length; i++) {
        var toCheck = row[i][colIndex];
        //console.log('this is rows[i]: ' + row[i]);
        if (row[i][colIndex] === 1) {
          counter++;
        }
      }
      //console.log(counter);
      return counter > 1; // fixme*/
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var test = false;
      var that = this;
      _.each (that.rows(), function(value, key) {
        if (that.hasColConflictAt(key)) {
          test = true;
        }
      });
      return test;
    },




    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var arg = majorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      //console.log(arg);
      var counter = 0;
      if (arg >= 0) {
        var len = rows.length - arg;
        for ( var i = 0; i < len; i++) {
          if (rows[i][arg] === 1) {
            counter++;
          }
          arg++;
        }
      } else if (arg < 0) {
        var rowIndex = -(arg);
        var collumnIndex = 0;
        for (var i = rowIndex; i < rows.length; i++) {
          //console.log(rows[i]);
          if (rows[i][collumnIndex] === 1) {
            counter++;
          }
          collumnIndex++;
        }
      }
      return counter > 1;
    },
    /*hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = majorDiagonalColumnIndexAtFirstRow;

      for ( ; rowIdx < size && colIdx < size; rowIdx++, colIdx++ ) {
        if ( colIdx >= 0 ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
    },*/

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var test = false;
      var that = this;
      _.each(that.rows(), function(value, key) {
        if (that.hasMajorDiagonalConflictAt(key)) {
          test = true;
        }
      });
      _.each(that.rows(), function(value, key) {
        if (that.hasMajorDiagonalConflictAt(-key)) {
          test = true;
        }
      });

      return test;
    },
    /*hasAnyMajorDiagonalConflicts: function() {

      var size = this.get('n');

      for ( var i = 1 - size; i < size; i++ ) {
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }

      return false;
    },*/



    //Minor Diagonals - go from top-right to bottom-left
    //    --------------------------------------------------------------

    //test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var args = minorDiagonalColumnIndexAtFirstRow;
      var rows = this.rows();
      var counter = 0;
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][args] === 1) {
          counter++;
        }
        args--;
      }
      return counter > 1;
    },
    /*hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var size = this.get('n');
      var count = 0;
      var rowIdx = 0;
      var colIdx = minorDiagonalColumnIndexAtFirstRow;

      for ( ; rowIdx < size && colIdx >= 0; rowIdx++, colIdx-- ) {
        if ( colIdx < size ) {
          var row = this.get(rowIdx);
          count += row[colIdx];
        }
      }

      return count > 1;
    },*/

    //test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var test = false;
      var size = this.get('n');
      for (var i = 0; i < (size * 2) - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          test = true;
        }
      }
      return test;
    }
    // hasAnyMinorDiagonalConflicts: function() {
    //
    //   var size = this.get('n');
    //
    //   for ( var i = (size * 2) - 1; i >= 0; i-- ) {
    //     if ( this.hasMinorDiagonalConflictAt(i) ) {
    //       return true;
    //     }
    //   }
    //
    //   return false;
    // }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
