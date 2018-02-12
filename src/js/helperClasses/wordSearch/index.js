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
    constructor(arg) {
        this._wordGrid = [];
        this._width = null;
        this._height = null;
        this._wordArray = [];
        if (typeof arg === 'string') {
            this.setWordSearchData(this.parseWordSearchString(arg));
        }
    }

    setWordSearchData(dataObjToSet) {
        if (!dataObjToSet) return;
        const { wordGrid, width, height, wordArray } = dataObjToSet;
        this._wordGrid = typeof wordGrid === 'object' && wordGrid || [];
        this._width = typeof width === 'number' && width || null;
        this._height = typeof height === 'number' && height || null;
        this._wordArray = typeof wordArray === 'object' && wordArray || [];
    }

    getWordSearchData() {
        return {
            wordGrid: this._wordGrid,
            width: this._width,
            height: this._height,
            wordArray: this._wordArray,
        }
    }

    parseWordSearchString(searchString) {
        const baseConfig = {
            wordGrid: [],
            width: null,
            height: null,
            wordArray: [],
        };
        if (typeof searchString !== 'string') return false;

        //parse word line and validate
        const inputLineSpliteArray = searchString.split(/\r\n|\n/);

        baseConfig.wordArray = inputLineSpliteArray[0] && inputLineSpliteArray[0].split(',') || [];
        let containsSingleCharWord = false;
        baseConfig.wordArray.forEach((word) => {
            if (word.length < 2) {
                containsSingleCharWord = true;
            }
        });
        if (!baseConfig.wordArray.length || containsSingleCharWord) return false;

        //parse rest of searchGrid input
        baseConfig.wordGrid = inputLineSpliteArray.splice(1);
        baseConfig.height = baseConfig.wordGrid.length;
        if (baseConfig.height === 0) return false;

        let rowLengthDifferentThanHeight = false;
        baseConfig.wordGrid = baseConfig.wordGrid.map((gridString) => {
            const splitRow = gridString.split(',');
            if (splitRow.length !== baseConfig.height) rowLengthDifferentThanHeight = true;
            return splitRow;
        });
        if (rowLengthDifferentThanHeight) return false;
        baseConfig.width = baseConfig.wordGrid[0].length;
        return baseConfig
    }

    searchForWordAroundGridLoc(word, gridData, coords) { //assumes there has already been a current position check
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
                const [rowPos, colPos] = this.buildCoord(value, i, coords);
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

    getCoordsOfWord(word, directionArr, startingCoord) {
        if (typeof word !== 'string'
            || typeof directionArr !== 'object'
            || typeof startingCoord !== 'object'
            || directionArr.length === 0) return false;

        let invalidDirection;
        const coordObjects = directionArr.map((direction) => {
            const dirKeyValue = directionalKeys.get(direction);
            if (!dirKeyValue) return invalidDirection = true;
            const coords = [startingCoord];
            for (let i = 1; i < word.length; i++) {
                coords.push(this.buildCoord(dirKeyValue, i, startingCoord ));
            }
            return {
                word,
                coords,
            }
        });

        if (invalidDirection) return false;
        return coordObjects
    }

    buildCoord(dirKeyValue, index, startingCoord) {
        return [dirKeyValue[0] * index + startingCoord[0], dirKeyValue[1] * index + startingCoord[1]];
    }

    buildOutputCoordString(wordObjects) {
        if (typeof wordObjects !== 'object'
            || !wordObjects.length
            || wordObjects.filter(wordObj => (typeof wordObj.word !== 'string' || typeof wordObj.coords !== 'object')).length) return 'please use correct data';

        let stringToReturn = '';
        wordObjects.forEach((wordObj) => {
            let coordSubString = ': ';
            wordObj.coords.forEach(coord => coordSubString += `(${coord[0]},${coord[1]}),`);
            stringToReturn += `${wordObj.word}${coordSubString.slice(0,-1)}\n`
        });

        return stringToReturn;
    }

    findWordsInWordGrid(searchDataObj) { //entry into searching so data checking is somewhat heavy
        const { width, height, wordGrid, wordArray } = searchDataObj;
        if (typeof searchDataObj !== 'object'
            || typeof width !== 'number'
            || typeof height !== 'number'
            || typeof wordGrid !== 'object'
            || !wordGrid.length
            || !wordGrid[0].length
            || typeof wordArray !== 'object'
            || !wordArray.length
            || wordGrid.filter(row => typeof row !== 'object').length
            || wordArray.filter(row => typeof row !== 'string').length) return false;

        const wordCoordObjArray = [];
        wordGrid.forEach((row, rowIdx) => {
            row.forEach((col, colIdx) => {
                wordArray.forEach((word) => {
                    const currentGridLocation = [rowIdx, colIdx];
                    const wordDirectionArray = this.searchForWordAroundGridLoc(word, searchDataObj, currentGridLocation);
                    let wordCoordObj;
                    if (wordDirectionArray) {
                        wordCoordObj = this.getCoordsOfWord(word, wordDirectionArray, currentGridLocation);
                    }
                    if (wordCoordObj) wordCoordObjArray.push(wordCoordObj);
                });
            });
        });

        return wordCoordObjArray.length ? wordCoordObjArray : false;
    }
}