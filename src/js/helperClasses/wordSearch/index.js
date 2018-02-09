const directionalKeys = new Map([ // row, column - is up on row + is right on column
    ['UR', [-1, 1]],
    ['R', [0, 1]],
    ['DR', [1, 1]],
    ['D', [1, 0]],
    ['DL', [1, -1]],
    ['L', [0, -1]],
    ['UL', [-1, -1]],
    ['U', [-1, 0]],
]);
const numberOfDirections = directionalKeys.size;

export default class WordSearch {
    _wordGrid = [];
    _width = null;
    _height = null;
    _wordArray = [];

    setWordSearchData(dataObjToSet) {
        const { wordGrid, width, height, wordArray } = dataObjToSet;
        this._wordGrid = typeof wordGrid === 'object' && wordGrid || [];
        this._width = typeof width === 'number' && width || null;
        this._height = typeof height === 'number' && height || null;
        this._wordArray = typeof wordArray === 'object' && wordArray || [];
    }

    static parseWordSearchString(searchString) {
        const baseConfig = {
            wordGrid: [],
            width: null,
            height: null,
            wordArray: [],
        };
        if (typeof searchString !== 'string') return null;

        //parse word line and validate
        const inputLineSpliteArray = searchString.split('\n');
        baseConfig.wordArray = inputLineSpliteArray[0] && inputLineSpliteArray[0].split(',') || [];

        let containsSingleCharWord = false;
        baseConfig.wordArray.forEach((word) => {
            if (word.length < 2) {
                containsSingleCharWord = true;
            }
        });
        if (!baseConfig.wordArray.length || containsSingleCharWord) return null;

        //parse rest of searchGrid input
        baseConfig.wordGrid = inputLineSpliteArray.splice(1);
        baseConfig.height = baseConfig.wordGrid.length;
        if (baseConfig.height === 0) return null;

        let rowLengthDifferentThanHeight = false;
        baseConfig.wordGrid = baseConfig.wordGrid.map((gridString) => {
            const splitRow = gridString.split(',');
            if (splitRow.length !== baseConfig.height) rowLengthDifferentThanHeight = true;
            return splitRow;
        });
        if (rowLengthDifferentThanHeight) return null;
        baseConfig.width = baseConfig.wordGrid[0].length;
        return baseConfig
    }

    static searchForWordAroundGirdLoc(word, gridData, coords) { //assumes there has already been a current position check
        if (typeof word !== 'string' || typeof gridData !== 'object' || typeof coords !== 'object') return false;
        const { width, height, wordGrid } =  gridData;
        if (!width || !height || !wordGrid) return false;

        if (word[0] !== wordGrid[coords[0]][coords[1]]) return false;

        const possibleDirections = {};
        let failCounter = 0;
        function onFail(key) {
            possibleDirections[key] = false;
            failCounter++;
        }

        for (let i = 1; i < word.length; i++ ) {
            if (failCounter === numberOfDirections) break;
            directionalKeys.forEach((value, key) => {
                if (possibleDirections[key] === false) return; //if its already had a fail
                const rowPos = value[0] * i + coords[0];
                const colPos = value[1] * i + coords[1];
                //out of bounds check
                if (rowPos < 0 || height <= rowPos) return onFail(key);
                if (colPos < 0 || width <= colPos) return onFail(key);
                //equality check
                if (word[i] !== wordGrid[rowPos][colPos]) return onFail(key);
            })
        }

        if (failCounter === numberOfDirections) return false;
        const successfulDirections = [];
        directionalKeys.forEach((value, key) => {
            if (typeof possibleDirections[key] === 'undefined') successfulDirections.push(key);
        });
        return successfulDirections;
    }

    static getCoordsOfWord(word, directionArr, startingPoint) {
        if (typeof word !== 'string'
            || typeof directionArr !== 'object'
            || typeof startingPoint !== 'object'
            || directionArr.length === 0) return false;

        let invalidDirection;
        const coordObjects = directionArr.map((direction) => {
            const dirKeyValue = directionalKeys.get(direction);
            if (!dirKeyValue) return invalidDirection = true;
            const coords = [startingPoint];
            for (let i = 1; i < word.length; i++) {
                coords.push([dirKeyValue[0] * i + startingPoint[0], dirKeyValue[1] * i + startingPoint[1]]);
            }
            return {
                word,
                coords,
            }
        });

        if (invalidDirection) return false;
        return coordObjects
    }
}