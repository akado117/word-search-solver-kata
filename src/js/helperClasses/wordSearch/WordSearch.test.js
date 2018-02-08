import WordSearch from '../wordSearch';

describe('WordSearch Class', () => {
    let newWordSearch;
    beforeEach(() => {
        newWordSearch = new WordSearch();
    });
    describe('setWordSearchData', () => {
        it('should not cause program to crash if invalid data fed in', () => {
            expect(newWordSearch.setWordSearchData('some junk data that isn what it should be ')).toBe(undefined);
        });
        it('should keep internal data defaults if incomplete data fed in', () => {
            const fakeParsedData = {
                wordArray: 123,
                wordGrid: undefined,
                waidth: ['some', 'body'],
                heihgt: ['once', 'told', 'me'],

            };
            newWordSearch.setWordSearchData(fakeParsedData);
            expect(newWordSearch._height).toEqual(null);
            expect(newWordSearch._width ).toEqual(null);
            expect(newWordSearch._wordGrid).toEqual([]);
            expect(newWordSearch._wordArray).toEqual([]);
        });
        it('should set internal data when types are correct', () => {
            const fakeParsedData = {
                wordArray: ['the', 'world'],
                wordGrid: ['is', 'gonna', 'owe', 'me'],
                width: 12,
                height: 12,

            };
            newWordSearch.setWordSearchData(fakeParsedData);
            expect(newWordSearch._height).toEqual(12);
            expect(newWordSearch._width ).toEqual(12);
            expect(newWordSearch._wordGrid).toEqual(['is', 'gonna', 'owe', 'me']);
            expect(newWordSearch._wordArray).toEqual(['the', 'world']);
        })
    });

    describe('parseWordSearchString', () => {
        const extraDesc = 'should return null';
        it(`${extraDesc} should the input be an incorrect data type`, () => {
            expect(WordSearch.parseWordSearchString(12313)).toBe(null);
        });
        it(`${extraDesc} if the first line contains any words with less than two letters`, () => {
            expect(WordSearch.parseWordSearchString(',\na,b')).toBe(null);
            expect(WordSearch.parseWordSearchString('asd,dds,1337,uno,no,I')).toBe(null);
        });
        it(`${extraDesc} if there are any rows with a different length than grid height or there are no rows`, () => {
            expect(WordSearch.parseWordSearchString('asd,dds,1337,uno,no')).toBe(null);
            expect(WordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b,b')).toBe(null);
            expect(WordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b\nc,c,c')).toBe(null);
        });
        it('should return parsed input as an object with a word array and grid', () => {
            const result = {
                wordGrid: [
                    ['a', 'a', 'a'],
                    ['b', 'b', 'b'],
                    ['c', 'c', 'c'],
                ],
                width: 3,
                height: 3,
                wordArray: ['asd', 'dds', '1337', 'uno', 'no'],
            };
            expect(WordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b,b\nc,c,c')).toEqual(result);
        })
    })
});