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

        $('#array').bind('input propertychange', function() {

            _this.creatSquares()
            console.log(11111)


        });

    },
    random:function () {

        var num = Math.random()*5 + 10
        num = parseInt(num, 10)
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(parseInt((Math.random()*10 + 1),10))
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
            arrNum.push(parseInt(arr[i]))

        }
        console.log(arrNum)

        frames = new Frames(arrNum)




        if (this.data.length === 2) {
            $('#container1').html('')
            frames.creatSquares('#container3')
            frames.creatData(getSortFun(this.data[0]))
            animate = new Animation(5)
            animate.frames = frames.data
            frames.creatSquares('#container4')
            frames.creatData(getSortFun(this.data[1]))
            animate2 = new Animation(5)
            animate2.frames = frames.data
            return
        }
            $('#container3').html('')
            $('#container4').html('')
        frames.creatSquares('#container1')
        if (this.data.length === 0) {
            return
        }
            frames.creatData(getSortFun(this.data[0]))
            animate = new Animation(5)
            animate.frames = frames.data
        

    }
}
var animate;
var animate2;
select.init()
select.random()


function getSortFun(index) {
    switch (index) {
        case 0:
            return sort1
            break;
        case 1:
            return sort2
            break;
        case 2:
            return sort3
            break;
        case 3:
            return sort4
            break;
        case 4:
            return sort5
            break;
        case 5:
            return sort6
            break;
    }
}

// var p = [3,6,1,7,9,3,6,8,6,1];
// var p = [32,5,1,5,4,3,2];




// frames2 = new Frames(p)
// frames2.creatdivs('#container2')
// frames2.creatData(sort2)
// animate2 = new Animation(5)
// animate2.frames = frames2.data
// animate2.play()

document.getElementById('btn1').onclick = function() {
    // frames.creatData(sort4)
    // animate = new Animation(6)
    // animate.frames = frames.data
    // animate.play()


    animate.play()
    animate2 && animate2.play()
        // animate2.play()
}
document.getElementById('btn2').onclick = function() {
    animate.next()
        // animate2.next()
}
document.getElementById('btn3').onclick = function() {
    animate.prev()
        // animate2.prev()
}
document.getElementById('btn4').onclick = function() {
    animate.stop()
        // animate2.stop()
}
