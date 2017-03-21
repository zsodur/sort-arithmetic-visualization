var select = {
        data: [3],
        init: function() {
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


                _this.creatSquares()
            })

            $('.sort').mouseover(function() {
                var index = $('.sort').index(this)
                $('#explain').css('display', 'block')
                $('#explain div').css('display', 'none')
                $('#explain div').eq(index).css('display', 'block')
            })

            $('.sort').mouseout(function() {
                $('#explain').css('display', 'none')
            })

            $('#array').bind('input propertychange', function() {

                _this.creatSquares()
                console.log(11111)


            });

            $('#random').click(function() {
                _this.random()
            })

            $('#startAndPause').click(function() {
                if (animate) {
                    if(animate.status === 0){
                        animate.play()
                animate2 && animate2.play()

                        $(this).html('暂停')
                    }else{

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


        

    },
    random: function() {

        var num = Math.random() * 5 + 10
        num = parseInt(num, 10)
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(parseInt((Math.random() * 10 + 1), 10))
        }
        $('#array').val(arr.join(','))
        this.creatSquares()


    },
    creatSquares: function() {
        $('.sort').removeClass('sortActive')
        for (var i = 0; i < this.data.length; i++) {
            $('.sort').eq(this.data[i]).addClass('sortActive')
        }
        animate && animate.close()
        animate2 && animate2.close()
        var arrStr = $('#array').val()
            // if (this.data.length === 0 || arrStr.length === 0) {
            //     return
            // }

        if (arrStr.charAt(arrStr.length - 1) === ',') {
            arrStr = arrStr.Substring(0, arrStr.Length - 1)
        }
        var arr = arrStr.split(",")
        var arrNum = []
        for (var i = 0; i < arr.length; i++) {
            var num = parseInt(arr[i])
            console.log(num)
            if(!(isNaN(num))){
                arrNum.push(num)
                
            }

        }
        console.log(arrNum)

        frames = new Frames(arrNum)




        if (this.data.length === 2) {
            $('#container1').html('')
            frames.creatSquares('#container3')
            frames.creatData(getSortFun(this.data[0]))
            animate = new Animation({
                speed:5,
                frames:frames.data,
                callback:function () {
                    console.log('')
                    $('#startAndPause').html('开始')
                }
            })
            frames.creatSquares('#container4')
            frames.creatData(getSortFun(this.data[1]))
            animate2 = new Animation({
                speed:5,
                frames:frames.data,
                callback:function () {
                    console.log('')
                    $('#startAndPause').html('开始')
                }
            })
            return
        }
        $('#container3').html('')
        $('#container4').html('')
        frames.creatSquares('#container1')
        if (this.data.length === 0) {
            return
        }
        frames.creatData(getSortFun(this.data[0]))
        animate = new Animation({
                speed:5,
                frames:frames.data,
                callback:function () {
                    console.log('')
                    $('#startAndPause').html('开始')
                }
            })


    }
}
var animate;
var animate2;
select.init()
select.random()

var startMouseX;
var startSliderX
$('#progressBar .slider').mousedown(function (e) {
    startMouseX = e.originalEvent.x || e.originalEvent.layerX || 0; 
    startSliderX = $(this).position().left
    console.log(startMouseX,startSliderX)
    $('html').on('mousemove',sliderMove)


})

$('html').mouseup(function (e) {
    $('html').off('mousemove',sliderMove)
    speed = $('#progressBar .slider').position().left/$('#progressBar').width() * 10 + 1
    console.log(speed)
    animate && animate.setSpeed(speed)
    animate2 && animate2.setSpeed(speed)
    

})

function sliderMove(e) {
    var nowMouseX = e.originalEvent.x || e.originalEvent.layerX || 0; 

    var x = nowMouseX - startMouseX
    if ((startSliderX+x)<=0 || (startSliderX+x)>$('#progressBar').width()-$('#progressBar .slider').width()) {
        return
    }
    $('#progressBar .slider').css('left',startSliderX+x+'px')
    

}










function getSortFun(index) {
    switch (index) {
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
}
