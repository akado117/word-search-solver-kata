import WordSearch from '../wordSearch';

describe('WordSearch Class', () => {
    describe('parseWordSearchString', () => {
        const baseConfig = {
            _wordGrid: [],
            _width: null,
            _height: null,
            _wordArray: [],
        };
        it('should return base settings with no modifications should the input be an incorrect data type', () => {
            expect(WordSearch.parseWordSearchString(12313)).toEqual(baseConfig);
        })
    })
});