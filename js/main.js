var select = {
    data: [0],

    getNum: function() {

        return this.data.length
    },

    getSortFun: function(index) {

        switch (this.data[index]) {
            case 0:
                return sort1
            case 1:
                return sort2
            case 2:
                return sort3
            case 3:
                return sort4
            case 4:
                return sort5
            case 5:
                return sort6
        }
    },

    activeBtn: function() {

        $('.sort').removeClass('sortActive')
        for (var i = 0; i < this.data.length; i++) {
            $('.sort').eq(this.data[i]).addClass('sortActive')
        }
    },

    init: function() {

        this.activeBtn()
        var _this = this
        $('.sort').click(function() {
            var index = $('.sort').index(this)

            if (_this.data.indexOf(index) === -1) {
                _this.data.push(index)
            } else {
                _this.data.splice(_this.data.indexOf(index), 1)
            }

            if (_this.data.length > 2) {
                _this.data.shift()
            }
            container.creatSquares()
            _this.activeBtn()
        })
        $('.sort').mouseover(function() {
            var index = $('.sort').index(this)
            explain.show(index)
        })
        $('.sort').mouseout(function() {
            explain.hide()
        })
    }
}


var controller = {
    getArr: function() {

        var arrStr = $('#array').val()
        var arr = arrStr.split(",")
        var arrNum = []

        for (var i = 0; i < arr.length; i++) {
            var num = parseInt(arr[i])
            if (!(isNaN(num))) {
                arrNum.push(num)
            }
        }
        return arrNum
    },

    random: function() {

        var num = Math.random() * 5 + 10
        num = parseInt(num, 10)
        var arr = []

        for (var i = 0; i < num; i++) {
            arr.push(parseInt((Math.random() * 10 + 1), 10))
        }
        $('#array').val(arr.join(','))
        container.creatSquares()
    },
    init: function() {

        this.random()
        var _this = this
        $('#array').bind('input propertychange', function() {
            container.creatSquares()
        });
        $('#random').click(function() {
            _this.random()
        })
        $('#startAndPause').click(function() {

            if (animate) {

                if (animate.status === 0) {
                    animate.play()
                    animate2 && animate2.play()
                    $(this).html('暂停')
                } else {
                    animate.stop()
                    animate2 && animate2.stop()
                    $(this).html('开始')
                }
            }
        })
        $('#prev').click(function() {
            animate && animate.prev()
            animate2 && animate2.prev()
        })
        $('#next').click(function() {
            animate && animate.next()
            animate2 && animate2.next()
        })
        var startMouseX;
        var startSliderX
        $('#progressBar .slider').mousedown(function(e) {
            startMouseX = e.originalEvent.x || e.originalEvent.layerX || 0;
            startSliderX = $(this).position().left
            $('html').on('mousemove', sliderMove)
        })
        $('html').mouseup(function(e) {
            $('html').off('mousemove', sliderMove)
            speed = $('#progressBar .slider').position().left / $('#progressBar').width() * 10 + 1
            animate && animate.setSpeed(speed)
            animate2 && animate2.setSpeed(speed)
        })

        function sliderMove(e) {
            var nowMouseX = e.originalEvent.x || e.originalEvent.layerX || 0;
            var x = nowMouseX - startMouseX
            if ((startSliderX + x) <= 0 || (startSliderX + x) > $('#progressBar').width() - $('#progressBar .slider').width()) {
                return
            }
            $('#progressBar .slider').css('left', startSliderX + x + 'px')
        }
    }
}

var container = {
    clear: function() {

        $('#container1').html('')
        $('#container3').html('')
        $('#container4').html('')
        animate && animate.close()
        animate2 && animate2.close()
    },

    creatSquares: function() {
        
        this.clear()
        var arr = controller.getArr()
        frames = new Frames(arr)
        var sortNum = select.getNum()

        if (sortNum === 0) {
            frames.creatSquares('#container1')
        }

        if (sortNum === 1) {
            frames.creatSquares('#container1')
            frames.creatData(select.getSortFun(0))
            animate = new Animation({
                speed: 5,
                frames: frames.data,
                onover: function() {
                    $('#startAndPause').html('开始')
                }
            })
        }

        if (sortNum === 2) {
            frames.creatSquares('#container3')
            var sortFun = select.getSortFun(0)
            frames.creatData(select.getSortFun(0))
            animate = new Animation({
                speed: 5,
                frames: frames.data,
                onover: function() {
                    $('#startAndPause').html('开始')
                }
            })
            frames.creatSquares('#container4')
            frames.creatData(select.getSortFun(1))
            animate2 = new Animation({
                speed: 5,
                frames: frames.data,
                onover: function() {
                    $('#startAndPause').html('开始')
                }
            })
        }
    }
}

var animate
var animate2

select.init()
controller.init()
