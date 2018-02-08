

export default class WordSearch {
    _wordGrid = [];
    _width = null;
    _height = null;
    _wordArray = [];

    static parseWordSearchString(searchString) {
        const baseConfig = {
            _wordGrid: [],
            _width: null,
            _height: null,
            _wordArray: [],
        };
        if (typeof searchString !== 'string') return null;

        //parse word line and validate
        const inputLineSpliteArray = searchString.split('\n');
        baseConfig._wordArray = inputLineSpliteArray[0] && inputLineSpliteArray[0].split(',') || [];

        let containsSingleCharWord = false;
        baseConfig._wordArray.forEach((word) => {
            if (word.length < 2) {
                containsSingleCharWord = true;
            }
        });
        if (!baseConfig._wordArray.length || containsSingleCharWord) return null;

        //parse rest of searchGrid input
        baseConfig._wordGrid = inputLineSpliteArray.splice(1);
        baseConfig._height = baseConfig._wordGrid.length;
        if (baseConfig._height === 0) return null;

        let rowLengthDifferentThanHeight = false;
        baseConfig._wordGrid = baseConfig._wordGrid.map((gridString) => {
            const splitRow = gridString.split(',');
            if (splitRow !== baseConfig._height) rowLengthDifferentThanHeight = true;
            return splitRow;
        });
        if (rowLengthDifferentThanHeight) return null;

    }
}