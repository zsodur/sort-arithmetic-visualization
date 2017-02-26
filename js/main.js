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


function Animation(speed) {
    var speed = speed || 5
    speed = speed > 10 ? 10 : speed
    speed = speed < 1 ? 1 : speed
    speed = 10 - speed
    this.frames = []
    this.setp = 0
    this.interval = speed * 300
    this._interval = speed * 100
    this.isNotmove = false
    this.status = 0
}

Animation.prototype.play = function() {
    if (this.status === 0) {
        this.status = 1
        this.run()
    }
}
Animation.prototype.stop = function() {
    this.status = 0
}
Animation.prototype.run = function() {
    var _this = this
    var interval = this.isNotmove ? this._interval : this.interval
    setTimeout(function() {
        if (_this.setp !== _this.frames.length - 1 && _this.status === 1) {
            _this.next()
            _this.run()
        } else {
            _this.status = 0
        }
    }, interval)
}
Animation.prototype.next = function() {
    this.setp < (this.frames.length - 1) && this.setp++
        this.update()
}
Animation.prototype.prev = function() {
    this.setp > 0 && this.setp--
        this.update()
}
Animation.prototype.update = function() {
    var frame = this.frames[this.setp]
    this.isNotmove = true
    for (var i = 0; i < frame.length; i++) {
        // console.log($(frame[i].el)[0].style.transform)
        // if ($(frame[i].el)[0].style.left != frame[i].css.left) {
        //     this.isNotmove = false
        // }
        if ($(frame[i].el)[0].style.transform != frame[i].css.transform) {
            this.isNotmove = false
        }
        $(frame[i].el).css(frame[i].css)
    }
}

function Frames(arr) {
    this.arr = arr
    this.data = []
    this.squares = []
}


Array.max = function( array ){ 
return Math.max.apply( Math, array );
};

Frames.prototype.creatSquares = function(parent) {
    this.squares = []
    var length = this.arr.length
    var max = Array.max(this.arr)
    for (var i = 0; i < length; i++) {
        var o = {
            el: parent + ' .div' + i,
            val: this.arr[i],
            positionx:i,
            positiony:0,
            css: {
                // left: i * 3 + 'rem',
                transform: 'translate('+(i-length/2+0.5)* 2.5 + 'rem'+')',
                transition: 'left 1s linear,height .1s linear,transform 1s linear',                
                width:'2rem',
                background: '#325c79',
                height:this.arr[i] *(10/max) + 'rem',
                opacity:1
            }
        }
        this.squares.push(o)
        $(parent).append($('<div class="' + 'div' + i + '">'))
        $(o.el).css(o.css)
    }
};

Frames.prototype.exchangeDiv = function(i, j) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    this.squares[i].css.transform = 'translate('+(j-this.arr.length/2+0.5)* 2.5 + 'rem'+')'
    this.squares[j].css.transform = 'translate('+(i-this.arr.length/2+0.5)* 2.5 + 'rem'+')'
    var z = this.squares[i]
    this.squares[i] = this.squares[j]
    this.squares[j] = z
    this.add()
}

Frames.prototype.moveDiv = function(i, j) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    if(this.squares[i].positiony){
    this.squares[i].css.transform = 'translate('+(j-this.arr.length/2+0.5)* 2.5 + 'rem'+') '

        this.squares[i].positiony = 0
    }else{
        this.squares[i].positiony = 1
    this.squares[i].css.transform = 'translate('+(j-this.arr.length/2+0.5)* 2.5 + 'rem'+',12rem) '

    }
    this.squares[i].positionx = j




    this.add()
}


Frames.prototype.add = function() {
    var a = []
    for (var i = 0; i < this.squares.length; i++) {
        var o = {}
        clone(this.squares[i], o)
        a.push(o)
    }
    this.data.push(a)
};

Frames.prototype.creatData = function(fun) {
    fun(this)
}

Frames.prototype.normal = function(i, a = true) {
    this.squares[i].css.background = '#325c79'
    a && this.add()
};
Frames.prototype.active = function(i, a = true) {
    this.squares[i].css.background = '#fe7777'
    a && this.add()
};
Frames.prototype.active2 = function(i, a = true) {
    this.squares[i].css.background = '#02c39d'
    a && this.add()
};
Frames.prototype.finish = function(i, a = true) {
    this.squares[i].css.background = '#fec675'
    a && this.add()
};
Frames.prototype.dark = function(i, a = true) {
    this.squares[i].css.opacity = '0.2'
    a && this.add()
};
Frames.prototype.light = function(i, a = true) {
    this.squares[i].css.opacity = '1'
    a && this.add()
};

function sort1(frames) {

    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.add()
        minObj = clone(frames.squares[i])
        frames.active(i)
        minIndex = i
        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2(j)
            if (minObj.val > frames.squares[j].val) {
                minObj = clone(frames.squares[j])
                frames.active(j, false)
                frames.normal(minIndex)
                minIndex = j
            } else {
                frames.normal(j, false)
            }
        }
        i !== minIndex && frames.exchangeDiv(i, minIndex)
        frames.finish(i)
    }
    frames.finish(frames.squares.length - 1)

}

function sort2(frames) {
    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.add()
        frames.active(i)
        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.active2(j)
            if (frames.squares[i].val > frames.squares[j].val) {
                frames.active(j)
                frames.exchangeDiv(i, j)
                frames.normal(j)
            } else {
                frames.normal(j, false)
            }
        }
        frames.finish(i)
    }
    frames.finish(frames.squares.length - 1)

}


function sort3(frames) {
    var hhhhhhhhh
    if(frames.constructor === Array){
        hhhhhhhhh = frames
    }else{
        hhhhhhhhh = frames.squares
    }
    
　　if (hhhhhhhhh.length <= 1) { 
        window.frames.squares = hhhhhhhhh
        console.log(frames)
        return frames }
　　var pivotIndex = Math.floor(hhhhhhhhh.length / 2);
　　var pivot = hhhhhhhhh.splice(pivotIndex, 1)[0];
    console.log(pivot)
　　var left = [];
　　var right = [];
　　for (var i = 0; i < hhhhhhhhh.length; i++){
　　　　if (hhhhhhhhh[i].val < pivot.val) {
　　　　　　left.push(hhhhhhhhh[i]);
　　　　} else {
　　　　　　right.push(hhhhhhhhh[i]);
　　　　}
　　}
    console.log(left)
　　return sort3(left).concat([pivot], sort3(right));
};


var count = 0
function sort3(frames,arr) {
    count++
    // console.log(frames)
    var a = []
    for (var i = 0; i < frames.squares.length; i++) {
        a.push(i)
    }
    var arr = arr || a
    // console.log(arr)
    if (arr.length <= 1) { 

        return}
for (var i = 0; i < frames.squares.length; i++){

        if(arr.indexOf(i)===-1){
            frames.dark(i,false)
        }else{

            frames.light(i,false)
        }
　　}
frames.add()

    var pivotIndex = Math.floor(arr.length / 2)
　　
    // console.log(frames.squares)
　　var pivot = frames.squares[arr[pivotIndex]]; // {val:,el:,css:}
    // console.log(frames.squares)
　　var left = [];
　　var right = [];
    // console.log(count,pivot.val)
    frames.active(arr[pivotIndex])
    var ggggg = frames.squares[arr[0]].positionx


　　for (var i = 0; i < arr.length; i++){
    // console.log(i)
        // console.log(frames.squares[arr[i]])
        // console.log(pivot)
        if(arr[i]===arr[pivotIndex]){continue;}
        frames.active2(arr[i])

        // console.log($(frames.squares[arr[0]].el).css('transform'))

　　　　if (frames.squares[arr[i]].val < pivot.val) {

            frames.moveDiv(arr[i],left.length+ggggg)
　　　　　　left.push(arr[i]);

　　　　} else {
            frames.moveDiv(arr[i],right.length+1+frames.squares[arr[pivotIndex]].positionx)
　　　　　　right.push(arr[i]);
　　　　}
    frames.normal(arr[i])
　　}

    if (left.length<=1) {
    frames.moveDiv(arr[pivotIndex],left.length+ggggg)
    for (var i = right.length - 1; i >= 0; i--) {
        right[i]
        frames.moveDiv(right[i],left.length+1+i+ggggg)
    }
    }
    // console.log('left',left)
    // console.log('right',right)

　　sort3(frames,left)
    sort3(frames,right)

};










function sort10(frames) {

    for (var i = 0; i < frames.squares.length - 1; i++) {
        frames.add()
        minObj = clone(frames.squares[i])
        frames.squares[i].active()
        frames.add()
        minIndex = i
        for (var j = i + 1; j < frames.squares.length; j++) {
            frames.squares[j].active2()
            frames.add()
            if (minObj.val > frames.squares[j].val) {
                minObj = clone(frames.squares[j])
                frames.squares[j].active()
                frames.squares[minIndex].normal()
                minIndex = j
                frames.add()
            } else {
                frames.squares[j].normal()
            }
        }
        frames.exchangeDiv(i, minIndex)
        frames.add()

        frames.squares[i].finish()

    }
    frames.add()
}
