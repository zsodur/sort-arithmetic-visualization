function Frames(arr) {
    this.arr = arr
    this.data = []
    this.squares = []
    this.parentHeight = ''
}

Array.max = function(array) {
    return Math.max.apply(Math, array);
};

Frames.prototype.creatSquares = function(parent) {
    this.squares = []
    var length = this.arr.length
    var max = Array.max(this.arr)
    this.parentHeight = $(parent).height()
    // alert((50+this.parentHeight)
    $(parent).html('')
    for (var i = 0; i < length; i++) {
        var o = {
            el: parent + ' .square' + i,
            val: this.arr[i],
            positionx: i,
            positiony: 0,
            css: {
                // left: i * 3 + 'rem',
                transform: 'translate(' + (i - length / 2 + 0.5) * 2.5 + 'rem' + ')',
                transition: 'transform 1s linear',
                width: '2rem',
                background: '#325c79',
                height: this.arr[i] * (this.parentHeight / max) + 'px',
                opacity: 1
            }
        }
        this.squares.push(o)
        $(parent).append($('<div class="square' + i + '"><span>'+this.arr[i]+'</span></div>'))
        $(o.el).css(o.css)
    }
};



Frames.prototype.exchangeSquare = function(i, j , isAdd = true) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 +'rem,' +this.squares[i].positiony*(50+this.parentHeight)+ 'px)'
    this.squares[j].css.transform = 'translate(' + (i - this.arr.length / 2 + 0.5) * 2.5 +'rem,' +this.squares[j].positiony*(50+this.parentHeight)+ 'px)'
    var z = this.squares[i]
    this.squares[i] = this.squares[j]
    this.squares[j] = z
    isAdd && this.add()
}

Frames.prototype.moveSquare2 = function(i, j, isAdd = true) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 +'rem,' +this.squares[j].positiony*(50+this.parentHeight)+ 'px)'
    this.squares[i] = this.squares[j]
    isAdd && this.add()
}


Frames.prototype.moveSquare = function(i, j, isAdd = true) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    console.log(i)
    if (this.squares[i].positiony) {
        this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 + 'rem' + ') '
        this.squares[i].positiony = 0
    } else {
        this.squares[i].positiony = 1
        this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 + 'rem,' +(50+this.parentHeight)+ 'px)'

    }
    this.squares[i].positionx = j
    isAdd && this.add()
}

Frames.prototype.changePositiony = function(i, isAdd = true) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    if (this.squares[i].positiony) {
        this.squares[i].positiony = 0
        this.squares[i].css.transform = 'translate(' + (this.squares[i].positionx - this.arr.length / 2 + 0.5) * 2.5 + 'rem' + ') '
    } else {
        this.squares[i].css.transform = 'translate(' + (this.squares[i].positionx - this.arr.length / 2 + 0.5) * 2.5 + 'rem' + ',12rem) '
        this.squares[i].positiony = 1
    }
    isAdd && this.add()
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
    this.data = []
    fun(this)
}

Frames.prototype.normalSquare = function(i, isAdd = true) {
    this.squares[i].css.background = '#325c79'
    isAdd && this.add()
};
Frames.prototype.activeSquare = function(i, isAdd = true) {
    this.squares[i].css.background = '#fe7777'
    isAdd && this.add()
};
Frames.prototype.active2Square = function(i, isAdd = true) {
    this.squares[i].css.background = '#02c39d'
    isAdd && this.add()
};
Frames.prototype.finishSquare = function(i, isAdd = true) {
    this.squares[i].css.background = '#fec675'
    isAdd && this.add()
};
Frames.prototype.darkSquare = function(i, isAdd = true) {
    this.squares[i].css.opacity = '0.2'
    isAdd && this.add()
};
Frames.prototype.lightSquare = function(i, isAdd = true) {
    this.squares[i].css.opacity = '1'
    isAdd && this.add()
};
