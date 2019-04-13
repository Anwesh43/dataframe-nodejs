Array.prototype.flatMap = function(cb) {
    const arr = new Array()
    this.forEach((thisEach) => {
        if (thisEach.constructor == Array) {
            thisEach.forEach((val) => {
                if (arr && arr.push && typeof(arr.push) === "function")
                    arr.push(cb(val))
            })
        }
    })
    return arr
}
class Utils {

    static checkIfObjectValuesLengthIsEqual(obj) {
        if (typeof(obj) === "object") {
            const objectVals = Object.values(obj)
            if (obj.length == 0) {
                return false
            }
            const firstValueLength = objectVals[0].length
            return Object.values(obj).map((obj) => obj.length).reduce((prevVal, currVal) => prevVal && firstValueLength === currVal, true)
        }
        return false
    }

    static createObjectFromKeys(keys, prevObj) {
        const newDFObj = {}
        keys.forEach((key) => {
            newDFObj[key] = prevObj[key]
        })
        return newDFObj
    }

    static filterArrayByIndex(arr, cb) {
        return arr.filter((arrVal, index) => cb(index))
    }

    static filterObjectKeysByIndex(obj, cb) {
        return Utils.filterArrayByIndex(Object.keys(obj), cb)
    }

    static createObjectForFirstNKeys(obj, n) {
        const filteredArray = Utils.filterObjectKeysByIndex(obj, (index) => index < n)
        return Utils.createObjectFromKeys(filteredArray, obj)
    }

    static createObjectForLastNKeys(obj, n) {
        const filterIndex = Object.keys(obj).length - n
        const filteredArray = Utils.filterObjectKeysByIndex(obj, (index) => index >= filterIndex)
        return Utils.createObjectFromKeys(filteredArray, obj)
    }

    static getCommonKeys(objArr) {
        if (objArr.constructor !== Array) {
            console.log(objArr.constructor)
            return []
        }
        return objArr.map(obj => Object.keys(obj)).flatMap(key => key).reduce((arr, curr) => {
            if (arr.indexOf(curr) == -1) {
                arr.push(curr)
            }
            return arr
        }, [])
    }
    static checkIfValuesAreObject(obj) {
        return Object.values(obj).map(obVal => typeof(obVal)).filter(obType => obType === "object").length == Object.values(obj).length
    }

    static fillEmptyKeysForObject(obj) {
        const keys = Utils.getCommonKeys(Object.values(obj))
        var newObj = {}
        Object.keys(obj).forEach((key) => {
            var currOb = obj[key]
            var currNewObj = Object.assign({}, currOb)
            keys.forEach((ck) => {
                  if (!(ck in currOb)) {
                      currNewObj[ck] = null
                  }
            })
            newObj[key] = currNewObj
        })
        return newObj
    }
}

module.exports = Utils
