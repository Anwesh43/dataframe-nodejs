const Utils = require('../lib/utils/Utils')
const assert = require('assert')
const {obj} = require('./common')
function testGetCommonKeys() {
    const objArr = Object.values(obj)
    const obKeys = Utils.getCommonKeys(objArr)
    console.log(obKeys)
    assert(obKeys.join(", ") === "name, age, id, salary")
}

function testFillEmptyKeys() {
    console.log(Utils.fillEmptyKeysForObject(obj))
}

testGetCommonKeys()
testFillEmptyKeys()
