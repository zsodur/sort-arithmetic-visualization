function sort1(ary) {
    frames.add()
    length = ary.length;


    for (var i = 0; i < length; i++) {

        //完成排序yellow,未排序blue
        for (var k = 0; k < i; k++) {
            frames.divs[k].css.background = 'yellow'
        }
        for (var k = i; k < frames.divs.length; k++) {
            frames.divs[k].css.background = 'blue'
        }

        _min = ary[i]
        what = frames.divs[i].css.left
        what2 = frames.divs[i]
        frames.divs[i].css.background = 'red'
        frames.add()
        k = i
        aaaaaa = {
            css: {
                background: ''
            }
        }
        for (var j = i + 1; j < length; j++) {
            aaaaaa.css.background = 'blue'
            frames.divs[j].css.background = 'green'
            frames.add()
            if (_min > ary[j]) {
                _min = ary[j]
                what = frames.divs[j].css.left
                what2.css.background = 'blue'
                what2 = frames.divs[j]
                frames.divs[j].css.background = 'red'
                k = j
                aaaaaa = {
                    css: {
                        background: ''
                    }
                }
                frames.add()
            } else {
                aaaaaa = frames.divs[j]
            }
            if (j === length - 1 && frames.divs[j] != what2) {
                frames.divs[j].css.background = 'blue'
            }
        }
        ary[k] = ary[i]
        ary[i] = _min
        frames.divs[k].css.left = frames.divs[i].css.left
        frames.divs[i].css.left = what

        frames.divs = exchange(frames.divs, i, k)
        frames.add()
    }
    for (var i = 0; i < frames.divs.length; i++) {
        frames.divs[i].css.background = 'yellow'
    }
    frames.add()
}


function sort2() {

    frames.add()

    length = frames.divs.length;

    for (var i = 0; i < length; i++) {
        //完成排序yellow,未排序blue
        for (var k = 0; k < i; k++) {
            frames.divs[k].finish()
        }
        for (var k = i; k < frames.divs.length; k++) {
            frames.divs[k].normal()
        }
        frames.add()
        minObj = clone(frames.divs[i])
        frames.divs[i].active()
        frames.add()
        minIndex = i
        for (var j = i + 1; j < length; j++) {
            frames.divs[j].active2()
            frames.add()
            if (minObj.val > frames.divs[j].val) {
                minObj = clone(frames.divs[j])
                minIndex = j
            }
            for (var m = i; m < frames.divs.length; m++) {
                frames.divs[m].normal()
            }
            frames.divs[minIndex].active()
            frames.add()
        }
        frames.divs[minIndex].css.left = frames.divs[i].css.left
        frames.divs[i].css.left = minObj.css.left
        frames.divs = exchange(frames.divs, i, minIndex)
        frames.add()
    }

    for (var i = 0; i < frames.divs.length; i++) {
        frames.divs[i].finish()
    }
    frames.add()
}
