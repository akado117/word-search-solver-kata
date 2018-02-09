const directionalKey = { // row, column - is up on row + is right on column
    UR: [-1, 1],
    LR: [1, 1],
    LL: [1, -1],
    UL: [-1, -1],
};

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

    static diagonalSearch(word, gridData, coords) { //assumes there has already been a current position check
        if (typeof word !== 'string' || typeof gridData !== 'object' || typeof coords !== 'object') return false;
        const { width, height, wordGrid } =  gridData;
        if (!width || !height || !wordGrid) return false;
        const possibleDirections = {
            UR: true,
            LR: true,
            LL: true,
            UL: true,
        };
        let failCounter = 0;
        function onFail(key) {
            possibleDirections[key] = false;
            failCounter++;
        }
        for (let i = 1; i < word.length; i++ ) {
            if (failCounter === 4) break;
            Object.keys(directionalKey).forEach((key) => {
                if (!possibleDirections[key]) return; //if its already had a fail
                const rowPos = directionalKey[key][0] * i + coords[0];
                const colPos = directionalKey[key][1] * i + coords[1];
                //out of bounds check
                if (rowPos < 0 || height <= rowPos) return onFail(key);
                if (colPos < 0 || width <= colPos) return onFail(key);
                //equality check
                if (word[i] !== wordGrid[rowPos][colPos]) return onFail(key);
            })
        }

        if (failCounter === 4) return false;
        const successfulDirections = [];
        Object.keys(possibleDirections).forEach((key) => {
            if (possibleDirections[key]) successfulDirections.push(key);
        });
        return successfulDirections;
    }

}