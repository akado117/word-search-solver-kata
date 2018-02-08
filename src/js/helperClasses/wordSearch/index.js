import fs from 'fs';

export default class WordSearch {
    _wordGrid = [];
    _width = null;
    _height = null;
    _wordArray = [];

    static setWordSearchData(dataObjToSet) {
        const { wordGrid, width, height, wordArray } = dataObjToSet;
        this._wordGrid = wordGrid || [];
        this._width = width || null;
        this._height = height || null;
        this._wordArray = wordArray || [];

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

}