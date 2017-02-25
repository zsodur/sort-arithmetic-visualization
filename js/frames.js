function Div(el, val, css) {
    this.el = el
    this.val = val
    this.css = css
}

Div.prototype.normal = function() {
    this.css.background = 'blue'
};
Div.prototype.active = function() {
    this.css.background = 'red'
};
Div.prototype.active2 = function() {
    this.css.background = 'green'
};
Div.prototype.finish = function() {
    this.css.background = 'yellow'
};


// var frames = {
//     data: [],
//     divs: [],
//     creatdivs: function(arr) {
//         this.divs = []
//         for (var i = 0; i < arr.length; i++) {
//             $('body').append($('<div>').attr('id', 'div' + i))
//             var o = new Div('#div' + i, arr[i], {
//                 left: i * 100 + 'px',
//                 height: arr[i] * 50 + 'px',
//                 background: 'blue'
//             })
//             this.divs.push(o)
//             $(o.el).css(o.css)
//         }
//     },
//     add: function() {
//         var a = []
//         for (var i = 0; i < this.divs.length; i++) {
//             var o = {}
//             clone(this.divs[i], o)
//             a.push(o)
//         }
//         this.data.push(a)
//     },
// }

function Frames(arr) {
    this.arr = arr
    this.data = []
    this.divs = []

}

Frames.prototype.creatdivs = function() {
    this.divs = []
    for (var i = 0; i < this.arr.length; i++) {
        $('body').append($('<div>').attr('id', 'div' + i))
        var o = new Div('#div' + i, this.arr[i], {
            left: i * 100 + 'px',
            height: this.arr[i] * 50 + 'px',
            background: 'blue'
        })
        this.divs.push(o)
        $(o.el).css(o.css)
    }
};

Frames.prototype.add = function() {
    var a = []
    for (var i = 0; i < this.divs.length; i++) {
        var o = {}
        clone(this.divs[i], o)
        a.push(o)
    }
    this.data.push(a)
};
