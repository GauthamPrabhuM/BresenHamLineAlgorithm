
var grid;
var res = 5;
var rows, cols;
var pos;
var vel;

function Array2D(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function setup() {
  createCanvas(640, 480);
  rows = width / res;
  cols = height / res;
  grid = Array2D(rows, cols);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      grid[x][y] = 0;
    }
  }
  pos = createVector(0, 0);
  vel = createVector(3, 5);
}

function draw() {
  background(255);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      grid[x][y] = 0;
    }
  }
  pos.add(vel);
  if (pos.x > width / res - res || pos.x < 1) {
    vel.x *= -1;
  }
  if (pos.y > height / res || pos.y < 1) {
    vel.y *= -1;
  }
  bresenhamLine(pos.x, pos.y, (width - 1) / res, (height - 1) / res);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var px = x * res;
      var py = y * res;
      stroke(0);
      strokeWeight(res / 20);
      if (grid[x][y] == 1) {
        fill(0);
      } else {
        noFill();
      }
      square(px, py, res);
    }
  }
}

function bresenhamLine(x0, y0, x1, y1) {
  var deltaX = x1 - x0;
  var deltaY = y1 - y0;
  var deltaErr = abs(deltaY / deltaX);
  var error = 0;
  var y = y0;
  for (var x = x0; x <= x1; x++) {
    grid[x][y] = 1;
    error += deltaErr;
    if (error >= 0.5) {
      y += (deltaY > 0 ? 1 : -1);
      error -= 1;
    }
  }
}
