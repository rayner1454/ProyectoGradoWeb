/*jshint jquery:true browser:true strict:true node:true es5:true
laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true unused:true*/
/*global URL:true*/
$(function () {
  "use strict";

  var vidEl = document.querySelector("#js-video");
  var canvas = document.querySelector('#js-snapshot').getContext('2d');
  var n = window.navigator;
  var newPixels;
  var oldPixels;
  var tmpPixels;
  var pixLength;
  var $hl = $('#js-pointer');
  var firstFrame = true;
  var intervalTime = 100;
  var keyFrame = 20;
  var drawCount = 0
     ,$document = $(document);

  function positionPointer(targetx, targety) {
    var newLeft, newTop;

    newLeft = Math.floor($document.width() * ((vidEl.width - targetx) / vidEl.width));
    newTop = Math.floor($document.height() * (targety / vidEl.height));

    if (newLeft > document.width * 0.2) {
      // TODO debounce
      //$('#js-snapshot').fadeToggle();
    }

    /*
    $hl.css(
        { left: newLeft + 'px', top: newTop + 'px' }
    );
    */
    $hl.animate(
        { left: newLeft + 'px', top: newTop + 'px' }
      , Math.floor(intervalTime - intervalTime * 0.2)
    );
  }

  n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
  console.log(n.getUserMedia);
  function initialize() {
    if (navigator.getUserMedia) {
    window.navigator.getUserMedia({ video: true }, function (stream) {
      vidEl.src = URL.createObjectURL(stream);
      console.log('URL video stream', vidEl.src);
      vidEl.play();
      setInterval(draw, intervalTime);
      $('.js-allow-video').fadeOut();
      $('.js-toggle-video').fadeIn();
      $('#js-snapshot').slideDown();
      $('#js-pointer').fadeIn();
    },
    function(err) {
      console.log("An error occured! " + err);
    });
    } else {
  alert('Sorry, your browser does not support getUserMedia');
}
  }
  $('body').on('click', '.js-allow-video', initialize);
  $('body').on('click', '.js-toggle-video', function () {
    $('#js-snapshot').slideToggle();
  });


  function draw() {
    var vidWidth = vidEl.width
      , vidHeight = vidEl.height
      , i
      , j
      , columns
      , scores
      ;

    //Let's add some bloody stuff the analyze the image in the canvas
    canvas.drawImage(vidEl, 0, 0, vidWidth, vidHeight);

    //Get the imageData from the canvas

    if (firstFrame) {
      newPixels = canvas.getImageData(0, 0, vidWidth, vidHeight);
      pixLength = newPixels.data.length / 4;
      firstFrame = false;
      return;
    }

    oldPixels = newPixels;
    newPixels = canvas.getImageData(0, 0, vidWidth, vidHeight);
    tmpPixels = canvas.getImageData(0, 0, vidWidth, vidHeight);

    //columns: make two dimensional array to store which pixels detect green
    //scores: 2d array to store the 5x5 scores for each pixel. Each pixel
    //	gets a score of the summary of the green pixels around it. It looks
    //	at the 5 pixels to the left, right, above and below the pixel. The
    //	pixel gets the score of the sum of that total.
    columns = [];
    columns.length = vidWidth;
    scores = [];
    scores.length = vidWidth;
    for(i = 0; i < vidWidth; i++){
      columns[i] = [];
      columns[i].length = vidHeight;
      scores[i] = [];
      scores[i].length = vidHeight;
    }

    for (i = 0; i < scores.length; i += 1) {
      for (j = 0; j < scores[0].length; j += 1) {
        scores[i][j] = 0;
      }
    }

    /*
      Pretend this represents the image vidWidth=10px and vidHeight=5px
      [],[],[],[],[],[],[],[],[],[],[]
      [],[],[],[],[],[],[],[],[],[],[]
      [],[],[],[],[],[],[],[],[],[],[]
      [],[],[],[],[],[],[],[],[],[],[]
      [],[],[],[],[],[],[],[],[],[],[]
    
      -We need to fill the columns array with one entry for each pixel.

      -The entry will be 1 or 0: 1 if greenish, 0 if anything else

      -We will do something with this
      
      LET'S FILL THE MAP WITH 1 and 0 for the image
      checkout six
    */

    //load the columns with 1 and 0 for green and non-green pixels respectively
    var index = -4
      ;

    for(i = 0; i < pixLength; i++){
      index += 4;
      var r = Math.abs(newPixels.data[index] - oldPixels.data[index])
        , g = Math.abs(newPixels.data[index + 1] - oldPixels.data[index + 1])
        , b = Math.abs(newPixels.data[index + 2] - oldPixels.data[index + 2])
        , total = r + g + b
        , left = Math.floor(i % vidWidth)
        , top = Math.floor(i / vidWidth)
        ;
        
      // 0-255 , 3 * 255
      if (r > 16 || g > 16 || b > 16) {
      //if (total > 16) {
        //IT'S DIFFERENT!
        tmpPixels.data[i * 4 + 1] = 1; //total;      //it's green, make pixel invisible
        columns[left][top] = 1;                 //give it a columns value of 1
      } else {
        //NOT DIFFERENT
        columns[left][top] = 0;                 //give it a columns value of 0
      }
      
    }

    //NOW LET'S CALCULATE EACH SCORE BY WAY OF A NEIGHBORHOOD OPERATION
    /*
      [],[],[],[ ],[ ],[1],[ ],[ ],[],[],[]
      [],[],[],[ ],[ ],[1],[ ],[ ],[],[],[]
      [],[],[],[1],[1],[?],[1],[1],[],[],[]
      [],[],[],[ ],[ ],[1],[ ],[ ],[],[],[]
      [],[],[],[ ],[ ],[1],[ ],[ ],[],[],[]
    
      You get a score of the total of the people around you
    */

    var targetX
      , targetY
      ;

    function scoreByNeighbors() {
      var i
        , j
        , rowLimit
        , colLimit
        , suspect
        , localSum
        , kMax = 100
        , k
        ;

      colLimit = columns.length;
      rowLimit = columns[0].length;

      //sum the score for each pixel
      // more j means lower
      // more i means righter
      for (j = 0; j < vidHeight; j++) {
        for (i = 0; i < vidWidth; i++) {
          suspect = columns[i][j];
          if (suspect) {
            localSum = kMax;
          } else {
            localSum = 0;
            continue;
          }

          // TODO for each value of k
          // get each corner i - k, i + k, j - k, j + k
          // sweep (non-inclusively) from [i - k][j - k] to [i - k][j + k]
          // sweep (non-inclusively) from [i - k][j + k] to [i - k][j - k]
          // sweep (non-inclusively) from [i + k][j - k] to [i + k][j + k]
          // sweep (non-inclusively) from [i + k][j + k] to [i + k][j - k]
          // sweep a minimum of 10 spaces
          // sweep a maximum of 100 spaces
          // when the sum is less than 1/4, stop the sweep
          
          // work left
          k = 0;
          while (suspect && i - k >= 0 && k <= kMax) {
            suspect = columns[i - k][j];
            if (suspect) {
              localSum += (kMax - k);
            }
            k += 1;
          }

          // work right
          k = 0;
          while (suspect && i + k < rowLimit && k <= kMax) {
            suspect = columns[i + k][j];
            if (suspect) {
              localSum += (kMax - k);
            }
            k += 1;
          }

          // give points from a pixel for each pixel above it
          /*
          k = 0;
          while (suspect && (j - k >= 0) && k <= kMax) {
            suspect = columns[i][j - k];
            if (suspect) {
              localSum += (kMax - k);
            }
            k += 1;
          }
          */

          // give points to a pixel for each pixel below it
          k = 0;
          while (suspect && (j + k < colLimit) && k <= kMax) {
            suspect = columns[i][j + k];
            if (suspect) {
              //localSum += (kMax - k);
              localSum += (kMax + k);
            }
            k += 1;
          }

          scores[i][j] = localSum;
        }
      }

      var targetX = 0
        , targetY = 0
        , highScore = 0
        , targetCount = 0
        ;

      for (i = 0; i < vidWidth; i++) {
        for (j = 0; j < vidHeight; j++) {
          if (scores[i][j] > highScore) {
            highScore = scores[i][j];
          }
        }
      }

      if (highScore < kMax * 15) {
        console.log('no movement values were high enough:', highScore, 'kMax * 15');
        return;
      }

      var goodScore = highScore * 0.9;
      for (i = 0; i < vidWidth; i++) {
        for (j = 0; j < vidHeight; j++) {
          if (scores[i][j] > goodScore) {
            targetX += i,
            targetY += j;
            targetCount += 1;
          }
        }
      }

      if (targetCount < 10) {
        console.log('too few movement values were high enough: ', targetCount, '< 10');
        return;
      }

      targetX = targetX / targetCount;
      targetY = targetY / targetCount;

      positionPointer(targetX, targetY);
    }

    function scoreByScan() {
      var nCol
        , mCol
        , nRow
        , startCol
        , preDipCol
        , colVal
        , numCols
        , column
        , score
        , highColVal = 0
        , highScore = 0
        , lowestHighScore = 1500
        , crop = 0 // to crop out the noise that way overinflates
        , weightedScore
        , connectedVal
        , highConnVal
        ;

      // for n consecutive cells in a row, all cells get the value n
      for (nRow = crop; nRow < vidHeight - crop; nRow += 1) {
        startCol = 0;
        highConnVal = 0;
        for (nCol = crop; nCol < vidWidth - crop; nCol += 1) {
          connectedVal = columns[nCol][nRow];
          if (connectedVal) {
            if (!startCol) {
              startCol = nCol;
            }
            if (connectedVal > highConnVal) {
              highConnVal = connectedVal;
            }
          } else {
            if (startCol) {
              numCols = nCol - startCol;
              colVal = Math.max(numCols, highConnVal);
              if (colVal > highColVal) {
                highColVal = colVal;
              }
              for (mCol = startCol; mCol < nCol; mCol += 1) {
                scores[mCol][nRow] += highColVal;//colVal;
              }
              startCol = 0;
            }
          }
        }
        startCol = 0;
      }

      // each row gets the value of the cell beneath it
      for (nCol = crop; nCol < vidWidth - crop; nCol += 1) {
        column = scores[nCol];
        for (nRow = (vidHeight - crop) - 2; nRow >= crop; nRow -= 1) {
          if (column[nRow]) {
            column[nRow] += column[nRow + 1];
            score = column[nRow];
            scores[nCol][nRow] = score;
            if (score > highScore) {
              highScore = score;
              targetX = nCol;
              targetY = nRow;
            }
          }
        }
      }

      // smooth the scores
      for (nCol = crop; nCol < vidWidth - crop; nCol += 1) {
        column = scores[nCol];
        for (nRow = (vidHeight - crop) - 2; nRow >= crop; nRow -= 1) {
        }
      }

      var threshold = 1000;
      for (nCol = crop; nCol < vidWidth - crop; nCol += 1) {
        column = scores[nCol];
        startCol = 0;
        preDipCol = 0;
        for (nRow = (vidHeight - crop) - 2; nRow >= crop; nRow -= 1) {
          score = scores[nCol][nRow];// = columns[nCol][nRow];
          if (score > threshold) {
            if (preDipCol) {
              for (mCol = preDipCol; mCol < nCol; mCol += 1) {
                tmpPixels.data[(((vidWidth * nRow) + nCol) * 4) + 0] = 255;
                tmpPixels.data[(((vidWidth * nRow) + nCol) * 4) + 1] = 0;
              }
              preDipCol = 0;
              startCol = 0;
            } else if (!startCol) {
              startCol = nCol;
            }
          } else {
            if (startCol) {
              preDipCol = startCol;
              startCol = 0;
            }
          }
        }
      }
      for (nCol = crop; nCol < vidWidth - crop; nCol += 1) {
        column = scores[nCol]; //columns[nCol];
        for (nRow = (vidHeight - crop) - 2; nRow >= crop; nRow -= 1) {
          score = column[nRow];

          // take the highest Y high score
          if (score > lowestHighScore && score > highScore * 0.25 && nRow < targetY) {
            targetY = nRow;
            targetX = nCol;
          }

          weightedScore = Math.floor((score / highScore) * 512);
          tmpPixels.data[(((vidWidth * nRow) + nCol) * 4) + 3] = 255 - weightedScore;
        }
      }

      console.log('HighColVal', highColVal);
      console.log('HighScore', highScore);

      if (highScore > lowestHighScore) {
        positionPointer(targetX, targetY);
      }
    }

    scoreByNeighbors();
    //scoreByScan();
    canvas.putImageData(tmpPixels, 0, 0);
    return;


  }
});
