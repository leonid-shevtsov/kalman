// 2-dimensional Kalman filter

window.Kalman = function() {
  
  this.x = Matrix.Zero(4, 1);
  this.P = Matrix.Diagonal([1000000, 1000000, 1000000, 1000000]);
  this.u = Matrix.Zero(4, 1);

  this.dt = 1;
  this.mP = 10;

  this.F = Matrix.create([
    [1, 0, this.dt, 0],
    [0, 1, 0,       this.dt],
    [0, 0, 1,       0],
    [0, 0, 0,       1]
  ]);

  this.H = Matrix.create([
    [1, 0, 0, 0],
    [0, 1, 0, 0]
  ]);

  this.R = Matrix.create([
    [this.mP, 0],
    [0,       this.mP]
  ]);

  this.I = Matrix.I(4);

  // Note that this filter does measurement first, then prediction, so the x vector stores the predicted
  // state at the next timestep.
  this.filter = function(measuredX, measuredY) {
    // measurement
    var Z = Matrix.create([[measuredX], [measuredY]]);
    var y = Z.subtract(this.H.multiply(this.x));
    var S = this.H.multiply(this.P).multiply(this.H.transpose()).add(this.R);
    var K = this.P.multiply(this.H.transpose()).multiply(S.inverse());
    this.x = this.x.add(K.multiply(y));
    this.P = this.I.subtract(K.multiply(this.H)).multiply(this.P);
    
    // prediction
    this.x = this.F.multiply(this.x).add(this.u);
    this.P = this.F.multiply(this.P).multiply(this.F.transpose());
  };

  this.currentX = function() {
    return this.x.e(1,1);
  };

  this.currentY = function() {
    return this.x.e(2,1);
  };

  this.currentVx = function() {
    return this.x.e(3,1);
  };

  this.currentVy = function() {
    return this.x.e(4,1);
  };
};
