function Frames(arr) {
    this.arr = arr
    this.data = []
    this.squares = []
}

Array.max = function(array) {
    return Math.max.apply(Math, array);
};

Frames.prototype.creatSquares = function(parent) {
    this.squares = []
    var length = this.arr.length
    var max = Array.max(this.arr)
    for (var i = 0; i < length; i++) {
        var o = {
            el: parent + ' .div' + i,
            val: this.arr[i],
            positionx: i,
            positiony: 0,
            css: {
                // left: i * 3 + 'rem',
                transform: 'translate(' + (i - length / 2 + 0.5) * 2.5 + 'rem' + ')',
                transition: 'left 1s linear,height .1s linear,transform 1s linear',
                width: '2rem',
                background: '#325c79',
                height: this.arr[i] * (10 / max) + 'rem',
                opacity: 1
            }
        }
        this.squares.push(o)
        $(parent).append($('<div class="' + 'div' + i + '">'))
        $(o.el).css(o.css)
    }
};

Frames.prototype.exchangeSquare2 = function(i, j) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    this.squares[i].css.transform = 'translate(' + (this.squares[j].positionx - this.arr.length / 2 + 0.5) * 2.5 + this.squares[i].positiony*12+'rem' + ')'
    this.squares[j].css.transform = 'translate(' + (this.squares[i].positionx - this.arr.length / 2 + 0.5) * 2.5 + this.squares[i].positiony*12+'rem' + ')'
    this.squares[i].positionx = j
    this.squares[i].positionx = i
    this.add()
}

Frames.prototype.exchangeSquare = function(i, j) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 +'rem,' +this.squares[i].positiony*12+ 'rem)'
    this.squares[j].css.transform = 'translate(' + (i - this.arr.length / 2 + 0.5) * 2.5 +'rem,' +this.squares[j].positiony*12+ 'rem)'
    var z = this.squares[i]
    this.squares[i] = this.squares[j]
    this.squares[j] = z
    this.add()
}

Frames.prototype.moveSquare = function(i, j) {
    // this.squares[i].css.left = j * 2.5 + 'rem'
    // this.squares[j].css.left = i * 2.5+ 'rem'
    if (this.squares[i].positiony) {
        this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 + 'rem' + ') '
        this.squares[i].positiony = 0
    } else {
        this.squares[i].positiony = 1
        this.squares[i].css.transform = 'translate(' + (j - this.arr.length / 2 + 0.5) * 2.5 + 'rem' + ',12rem) '

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
