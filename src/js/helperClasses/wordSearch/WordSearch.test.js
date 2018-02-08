import WordSearch from '../wordSearch';

describe('WordSearch Class', () => {
    describe('setWordSearchData', () => {
        it('should not cause program to crash if invalid data fed in', () => {
            expect(WordSearch.setWordSearchData('some junk data that isn what it should be ')).toBe(undefined);
        });
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