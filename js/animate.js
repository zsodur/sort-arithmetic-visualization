function Animation(json) {
    this.speed = json.speed ? json.speed:5
    this.frames = json.frames ? json.frames:[]
    this.setp = 0
    this.isNotmove = false
    this.status = 0

    this.setSpeed(this.speed)
    this.callback = json.callback ? json.callback:function () {
    }
    
}

Animation.prototype.setSpeed = function(speed) {
    this.speed = speed
    this.interval = (10-this.speed) * 200
    this._interval = (10-this.speed) * 100
    if(this.frames[0]){
        for (var i = 0; i < this.frames[0].length; i++) {

            $(this.frames[0][i].el).css('transition','transform '+this.interval/1000+'s linear')
        }
    }
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
            _this.callback()
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




            this.isNotmove = false
        }
        $(frame[i].el).css(frame[i].css)
    }
}
