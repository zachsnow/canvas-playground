$(function(){
  // Converts a function expecting a point (`x` and `y` coordinates) and a pixel
  // into one that expects just a pixel, and that is suitable for use with jCanvas's
  // `setPixles` `each` argument.
  var createCallback = function(fn){
    var x = 0;
    var y = 0;
    return function(px){
      fn(px, x, y);
      
      // Keep track of position, since jCanvas doesn't.
      x += 1;
      if(x >= SIZE){
        x = 0;
        y += 1;
        if(y >= SIZE){
          x = 0;
          y = 0;
        }
      }
    };
  };
  
  var toy = function(options){
    var $body = $('body');
    var $test = $('<div class="toy ' + options.name + '"></div>');
    
    $test.append('<h1>' + name + '</h1>');
    
    var $canvas = $('<canvas width="' + SIZE + '" height="' + SIZE + '"></canvas>');
    $test.append($canvas);
    
    var $link = $('<a href="#">Save...</a>');
    $link.click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var data = $canvas.getCanvasImage("png");
      var w = window.open('about:blank');
      w.document.write('<img src="' + data + '" />');
    });
    $test.append($link);

    $body.append($test);
    
    if(options.each){
      $canvas.setPixles({
        each: createCallback(options.each);
      })
    }
    if(options.draw){
      options.draw($canvas);
    }
  };
  
  toy({
    name: 'green',
    each: funciotn(x, y, px){
      px.r = px.b = 0;
      pg.g = px.a = 255;
    }
  });
});
