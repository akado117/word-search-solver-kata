

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
        if (typeof searchString !== 'string') return baseConfig;

        const inputLineByLineArray = searchString.split('\n');
        const wordArray = inputLineByLineArray[0] && inputLineByLineArray[0].split(',') || [];

        let containsSingleCharWord = false;
        wordArray.forEach((word) => {
            if (word.length < 2) {
                containsSingleCharWord = true;
            }
        })

        if (!wordArray.length || containsSingleCharWord) return baseConfig;


    }
}