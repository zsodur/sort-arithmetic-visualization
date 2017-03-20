function Animation(speed) {
    this.frames = []
    this.setp = 0
    this.interval = (10-speed) * 300
    this._interval = (10-speed) * 100
    this.isNotmove = false
    this.status = 0
          
    $('.square').css('transition','transform '+this.interval/1000+'s linear')
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

Animation.prototype.close = function() {
    this.frames = []
    this.setp = 0
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
        if (String($(frame[i].el)[0].style.transform) !== String(frame[i].css.transform)) {
        console.log('----------------------------------------')
        console.log($(frame[i].el)[0].style.transform)
        console.log(frame[i].css.transform)
            console.log('bucuobucuo')
            this.isNotmove = false
        }
        $(frame[i].el).css(frame[i].css)
    }
}
