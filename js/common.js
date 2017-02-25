    function exchange(array, index, index2) {
        var z = array[index]
        array[index] = array[index2]
        array[index2] = z
        return array
    }

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
