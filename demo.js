$(function() {
  var k = new Kalman();
  var paper = Raphael($('#canvas')[0], $('#canvas').width(), $('#canvas').height());
  var predicted = undefined;

  function updateNumbers() {
    var text='<table border=0 cellpadding=0 cellspacing=0><tr><td class="h x">x =</td><td colspan="4" class="h">P =</td></tr>';
    for (var i=1;i<=4;i++) {
      text+='<tr>';
      text+='<td class="x">'+Math.round(k.x.e(i,1))+'</td>';
      for (var j=1;j<=4;j++) {
        text+='<td>'+Math.round(k.P.e(i,j))+'</td>';
      }
      text+='</tr>';
    }
    text+='</table>';
    $('.numbers').html(text);
  }
  updateNumbers();

  $('#canvas').click(function(e) {
    k.filter(e.clientX, e.clientY);
    paper.circle(e.clientX, e.clientY, 2).attr({stroke: '#777', fill: '#777'});
    if (predicted) predicted.remove();
    predicted = paper.ellipse(k.nextX(), k.nextY(), k.P.e(1,1), k.P.e(2,2)).attr({stroke: '#373'});
    updateNumbers();
  });

  $('#reset').click(function() {
    paper.clear();
    predict = false;
    k = new Kalman();
    updateNumbers();
  });
});
