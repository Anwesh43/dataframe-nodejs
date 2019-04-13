const Utils = require('./utils/Utils')

class DataFrame {

    head(n) {
        return DataFrame.createForObjectRow(Utils.createObjectForFirstNKeys(this.obj, n || 10))
    }

    tail(n) {
        return DataFrame.createForObjectRow(Utils.createObjectForLastNKeys(this.obj, n || 10))
    }

    show() {
        var showStr = ""
        showStr += "index" + "\t" + this.columns.join("\t")
        showStr += "\n"
        this.rows.forEach((row, index) => {
            showStr += this.rowIndexes[index]
            this.columns.forEach((column) => {
                showStr += "\t" +(row[column] != null? row[column] : "")
            })
            showStr += "\n"
        })
        console.log(showStr)
    }

    setColumnNames(columns) {

    }

    constructor(obj, columns) {
        this.obj = obj
        this.rowIndexes = Object.keys(obj)
        this.rows = Object.values(obj)
        this.rowValues = this.rows.map(row => Object.values(row))
        this.columns = columns || Utils.getCommonKeys(Object.values(obj))
    }

    static createForArrayRow(obj) {
        if (!Utils.checkIfObjectValuesLengthIsEqual(obj)) {
            throw new Error("lenght of each array for a key must be same")
        }
        return new DataFrame(obj)
    }

    static createForObjectRow(obj) {
        if (typeof(obj) !== "object") {
            throw new Error("please provide a object")
        }
        if (!Utils.checkIfValuesAreObject(obj)) {
            throw new Error("values of object must be objects")
        }
        const columns = Utils.getCommonKeys(Object.values(obj))
        return new DataFrame(Utils.fillEmptyKeysForObject(obj), columns)
    }
}

module.exports = {createForArrayRow : DataFrame.createForArrayRow, createForObjectRow : DataFrame.createForObjectRow}
