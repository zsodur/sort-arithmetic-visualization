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

        if ($(frame[i].el).css('left') != frame[i].css.left) {
            this.isNotmove = false
        }
        $(frame[i].el).css(frame[i].css)
    }
}

function Frames(arr) {
    this.arr = arr
    this.data = []
    this.divs = []
}

Frames.prototype.creatdivs = function(parent) {
    this.divs = []
    for (var i = 0; i < this.arr.length; i++) {
        $(parent).append($('<div class="' + 'div' + i + '">'))
        var o = {
            el: parent + ' .div' + i,
            val: this.arr[i],
            css: {
                left: i * 3 + 'rem',
                height: this.arr[i] *1.5 + 'rem',
                width:'2rem',
                background: '#325c79'
            }
        }
        this.divs.push(o)
        $(o.el).css(o.css)
    }
};

Frames.prototype.exchangeDiv = function(i, j) {
    this.divs[i].css.left = j * 3 + 'rem'
    this.divs[j].css.left = i * 3+ 'rem'
    var z = this.divs[i]
    this.divs[i] = this.divs[j]
    this.divs[j] = z
    this.add()
}

Frames.prototype.add = function() {
    var a = []
    for (var i = 0; i < this.divs.length; i++) {
        var o = {}
        clone(this.divs[i], o)
        a.push(o)
    }
    this.data.push(a)
};

Frames.prototype.creatData = function(fun) {
    fun(this)
}

Frames.prototype.normal = function(i, a = true) {
    this.divs[i].css.background = '#325c79'
    a && this.add()
};
Frames.prototype.active = function(i, a = true) {
    this.divs[i].css.background = '#fe7777'
    a && this.add()
};
Frames.prototype.active2 = function(i, a = true) {
    this.divs[i].css.background = '#02c39d'
    a && this.add()
};
Frames.prototype.finish = function(i, a = true) {
    this.divs[i].css.background = '#fec675'
    a && this.add()
};

function sort1(frames) {

    for (var i = 0; i < frames.divs.length - 1; i++) {
        frames.add()
        minObj = clone(frames.divs[i])
        frames.active(i)
        minIndex = i
        for (var j = i + 1; j < frames.divs.length; j++) {
            frames.active2(j)
            if (minObj.val > frames.divs[j].val) {
                minObj = clone(frames.divs[j])
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
    frames.finish(frames.divs.length - 1)

}

function sort2(frames) {
    for (var i = 0; i < frames.divs.length - 1; i++) {
        frames.add()
        frames.active(i)
        for (var j = i + 1; j < frames.divs.length; j++) {
            frames.active2(j)
            if (frames.divs[i].val > frames.divs[j].val) {
                frames.active(j)
                frames.exchangeDiv(i, j)
                frames.normal(j)
            } else {
                frames.normal(j, false)
            }
        }
        frames.finish(i)
    }
    frames.finish(frames.divs.length - 1)

}














function sort10(frames) {

    for (var i = 0; i < frames.divs.length - 1; i++) {
        frames.add()
        minObj = clone(frames.divs[i])
        frames.divs[i].active()
        frames.add()
        minIndex = i
        for (var j = i + 1; j < frames.divs.length; j++) {
            frames.divs[j].active2()
            frames.add()
            if (minObj.val > frames.divs[j].val) {
                minObj = clone(frames.divs[j])
                frames.divs[j].active()
                frames.divs[minIndex].normal()
                minIndex = j
                frames.add()
            } else {
                frames.divs[j].normal()
            }
        }
        frames.exchangeDiv(i, minIndex)
        frames.add()

        frames.divs[i].finish()

    }
    frames.add()
}
