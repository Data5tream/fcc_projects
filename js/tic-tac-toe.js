// Variables
var score = 0;
var p1sym = 0; // 0 = O || 1 = x
var fturn = 0; // First turn ID
var turnc = 0; // Turn count
var winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

// Display functions
function showSymbolSelection() {
  $('#symbolselection').show();
  $('#symbolselection').addClass('animated fadeInDownBig');
}

function hideSymbolSelection() {
  $('#symbolselection').hide();
  $('#symbolselection').removeClass('animated fadeInDownBig');
}

// Callbacks
$('#selectX').click(function() {
  p1sym = 1;
  hideSymbolSelection();
  startGame();
});
$('#selectO').click(function() {
  p1sym = 0;
  hideSymbolSelection();
  startGame();
});

// Game functions
function startGame() {
  fturn = Math.floor(Math.random() *2); // Get the first player
  if (fturn == 1) {
    cpuFirstTurn();
  } else {
    humanTurn();
  }
}
function doTurn(pos) {
  if (turnc % 2 + fturn == 0) { // It's a CPU turn
    if (p1sym == 0) {
      sym = "X";
    } else {
      sym = "O";
    }
  } else { // It's a human turn
    if (p1sym == 0) {
      sym = "O";
    } else {
      sym = "X";
    }
  }

  $('#'+pos).text(sym);
}

function humanTurn() {
}

// AI functions
function cpuFirstTurn() {
  var startpos = [0, 2, 4, 6, 8];
  doTurn(startpos[Math.floor(Math.random() *5)]); // Get a random corner or center to start
}

function cpuTurn() {

}
