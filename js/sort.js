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

// 选择
function sort1(frames) {

    frames.add()

    for (var i = 0; i < frames.squares.length - 1; i++) {
        var minObj = clone(frames.squares[i])
        var minIndex = i
        frames.activeSquare(i)

        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2Square(j)

            if (minObj.val > frames.squares[j].val) {
                minObj = clone(frames.squares[j])
                frames.activeSquare(j, false)
                frames.normalSquare(minIndex)
                minIndex = j
            } else {
                frames.normalSquare(j,false)
            }
        }
        i !== minIndex && frames.exchangeSquare(i, minIndex)
        frames.finishSquare(i)
    }
    frames.finishSquare(frames.squares.length - 1)

}

// 冒泡
function sort2(frames) {

    frames.add()

    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.activeSquare(i)

        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2Square(j)

            if (frames.squares[i].val > frames.squares[j].val) {
                frames.active2Square(i,false)
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

// 快速
function sort3(frames,arr,arr2) {

    var a = []

    for (var i = 0; i < frames.squares.length; i++) {
        a.push(i)
    }
    var arr = arr || a

    if (arr.length <= 1) { 

        if (arr[0]) {
            frames.finishSquare(arr[0],false)
        }
        return
    }

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
    frames.activeSquare(arr[pivotIndex],false)
    frames.moveSquare(arr[pivotIndex],pivot.positionx)
    var ggggg = frames.squares[arr[0]].positionx

　　for (var i = 0; i < arr.length; i++){

        if(arr[i]===arr[pivotIndex]){
            continue
        }
        frames.active2Square(arr[i])

　　　　if (frames.squares[arr[i]].val <= pivot.val) {
            frames.moveSquare(arr[i],pivot.positionx-left.length-1)
　　　　　　left.unshift(arr[i]);
　　　　} else {
            frames.moveSquare(arr[i],right.length+1+pivot.positionx)
　　　　　　right.push(arr[i]);
　　　　}
        frames.normalSquare(arr[i],false)
　　}
    frames.finishSquare(arr[pivotIndex],false)
    var bbbb = Math.floor((left.length-right.length)/2)

    for (var i = 0; i < arr.length; i++) {
         frames.moveSquare(arr[i],frames.squares[arr[i]].positionx+bbbb,false)
    }
    frames.add()
    sort3(frames,left)    
    sort3(frames,right)  
};

// 归并
function sort4(frames,arr) {
  
    var a = []

    for (var i = 0; i < frames.squares.length; i++) {
        a.push(i)
    }
    var arr = arr || a
    var length = arr.length;

    if (arr.length <= 1) { 
        return arr
    }
    var num = Math.ceil(length/2);
    var left = sort4(frames,arr.slice(0, num));
    var right = sort4(frames,arr.slice(num, length));
    return merge(frames,left, right);
 
}

function merge(frames,left, right) {

    frames.add()

    for (var i = 0; i < frames.squares.length; i++){

        if(left.indexOf(i)===-1 && right.indexOf(i)===-1){
            frames.darkSquare(i,false)
        }else{
            frames.lightSquare(i,false)
        }
　　}
    frames.add()
    var a = new Array()

    if(left.length !== 0){
        positionx = frames.squares[left[0]].positionx
    }else{
        positionx = frames.squares[right[0]].positionx
    }

    while (left.length > 0 && right.length > 0) {
        frames.activeSquare(left[0],false)
        frames.active2Square(right[0])

        if (frames.squares[left[0]].val <= frames.squares[right[0]].val) {
            frames.moveSquare(left[0],a.length===0?positionx:frames.squares[a[a.length-1]].positionx+1)
            var temp = left.shift();
            a.push(temp);
            frames.normalSquare(a[a.length-1],false)
        } else {
            frames.moveSquare(right[0],a.length===0?positionx:frames.squares[a[a.length-1]].positionx+1)
            var temp = right.shift();
            a.push(temp);
            frames.normalSquare(a[a.length-1],false)
        }

    }

    while (left.length > 0) {
        frames.moveSquare(left[0],a.length===0?positionx:frames.squares[a[a.length-1]].positionx+1,false)
        var temp = left.shift();
        frames.normalSquare(temp,false)
        a.push(temp);
    }

    while (right.length > 0) {
        frames.moveSquare(right[0],a.length===0?positionx:frames.squares[a[a.length-1]].positionx+1,false)
        var temp = right.shift();
        frames.normalSquare(temp,false)
        a.push(temp);
    }
    frames.add()

    for (var i = 0; i < a.length-1; i++) {
        frames.changePositiony(a[i],false)
    }
    frames.changePositiony(a[a.length-1])
    return a;
}

// 插入
function sort5(frames){

    frames.add()
    frames.finishSquare(0)

    for(var i = 1; i < frames.squares.length; i++){
        frames.activeSquare(i,false)
        frames.moveSquare(i,i)
        frames.active2Square(i-1)

        if(frames.squares[i].val < frames.squares[i-1].val){
            var guardIndex = i
            var j = i 

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
            }
            frames.finishSquare(j,false)
            frames.moveSquare(j,j)     
        }else{

            for (var k = 0; k < i; k++) {
                frames.finishSquare(k, false)
            }
            frames.finishSquare(i,false)
            frames.moveSquare(i,i)
        }
    }
}

// 希尔
function sort6(frames) {

    frames.add()
    var length = frames.squares.length;
    var gap = Math.round(length / 2);

    for (gap; gap > 0; gap = Math.round(gap / 2 - 0.1)) {

        for (var i = gap; i < length; i++) {
            frames.activeSquare(i)
            var insert =  frames.squares[i].val;
            var index = i;
            var index2;

            for (var j = i; j >= 0; j -= gap) {
                frames.active2Square(j)
                
                if ( insert < frames.squares[j].val) {

                    frames.finishSquare(j+gap)
                    frames.exchangeSquare(j,j+gap)

                }else{
                    frames.normalSquare(j)
                }
            }
           
        }
    }
}

function sort6(frames) {

    frames.add()
    var len = frames.squares.length;

    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {

        for (var i = gap; i < len; i++) {

            for (var j = i - gap; j >= 0; j -= gap) {
                frames.activeSquare(j,false)
                frames.active2Square(gap + j)

                if (frames.squares[j].val > frames.squares[gap + j].val) {
                    frames.exchangeSquare(j, gap + j)
                    frames.normalSquare(j ,false)
                frames.normalSquare(gap + j)
                } else {
                    frames.normalSquare(j,false)
                    frames.normalSquare(gap + j)
                    break
                }
            }
        }
    }
}
