function clone(p, c) {
    var c = c || {};
    for (var prop in p) {
        if (typeof p[prop] === 'object') {
            c[prop] = (p[prop].constructor === Array) ? [] : {}
            clone(p[prop], c[prop])
        } else {
            c[prop] = p[prop]
        }
    }
    return c
}

function sort1(frames) {

    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.add()
        minObj = clone(frames.squares[i])
        frames.activeSquare(i)
        minIndex = i
        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2Square(j)
            if (minObj.val > frames.squares[j].val) {
                minObj = clone(frames.squares[j])
                frames.activeSquare(j, false)
                frames.normalSquare(minIndex)
                minIndex = j
            } else {
                frames.normalSquare(j, false)
            }
        }
        i !== minIndex && frames.exchangeSquare(i, minIndex)
        frames.finishSquare(i)
    }
    frames.finishSquare(frames.squares.length - 1)

}

function sort2(frames) {
    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.add()
        frames.activeSquare(i)
        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2Square(j)
            if (frames.squares[i].val > frames.squares[j].val) {
                frames.activeSquare(j)
                frames.exchangeSquare(i, j)
                frames.normalSquare(j)
            } else {
                frames.normalSquare(j, false)
            }
        }
        frames.finishSquare(i)
    }
    frames.finishSquare(frames.squares.length - 1)

}


function sort3(frames,arr) {
    var a = []
    for (var i = 0; i < frames.squares.length; i++) {
        a.push(i)
    }
    var arr = arr || a
    if (arr.length <= 1) { return}
    for (var i = 0; i < frames.squares.length; i++){
        if(arr.indexOf(i)===-1){
            frames.darkSquare(i,false)
        }else{
            frames.lightSquare(i,false)
        }
　　}
    frames.add()
    var pivotIndex = Math.floor(arr.length / 2)
　　var pivot = frames.squares[arr[pivotIndex]]; // {val:,el:,css:}
　　var left = [];
　　var right = [];
    frames.activeSquare(arr[pivotIndex])
    var ggggg = frames.squares[arr[0]].positionx
　　for (var i = 0; i < arr.length; i++){
        if(arr[i]===arr[pivotIndex]){continue;}
        frames.active2Square(arr[i])
　　　　if (frames.squares[arr[i]].val < pivot.val) {
            frames.moveSquare(arr[i],pivot.positionx-left.length-1)
　　　　　　left.unshift(arr[i]);
　　　　} else {
            frames.moveSquare(arr[i],right.length+1+pivot.positionx)
　　　　　　right.push(arr[i]);
　　　　}
        frames.normalSquare(arr[i],false)
　　}
    
    frames.moveSquare(arr[pivotIndex],pivot.positionx)
　　sort3(frames,left)
    sort3(frames,right)    
};

function sort4(frames){

    frames.add()
    frames.finishSquare(0)

    for(var i = 1; i < frames.squares.length; i++){
    frames.activeSquare(i,false)
    frames.moveSquare(i,i)
    frames.active2Square(i-1)
    if(frames.squares[i].val < frames.squares[i-1].val){


      var guardIndex = i
      

      var j = i - 1;

      frames.exchangeSquare(i,j)
      frames.finishSquare(i,false)
      
      // while(j > 0 && frames.squares[j].val < frames.squares[j-1].val){
      //   frames.active2Square(j-1)
      //   frames.exchangeSquare(j-1,j)
      //   frames.finishSquare(j)
      //   j--
    

      // }

      for (var k = j; k > 0; k--) {
            frames.active2Square(k-1)

          if(frames.squares[k].val < frames.squares[k-1].val){
            frames.exchangeSquare(k-1,k)
            
            frames.finishSquare(k,false)
            j--
          }else{
            frames.finishSquare(k-1,false)
            break

          }
}frames.finishSquare(j,false)
            frames.moveSquare(j,j)
    
    //       }
    //   }

      
    }else{

        for (var k = 0; k < i; k++) {
        frames.finishSquare(k, false)
    }

        frames.finishSquare(i,false)
        frames.moveSquare(i,i)
    

    }
  }
}
