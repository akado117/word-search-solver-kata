import WordSearch from '../wordSearch';
import { cloneDeep } from 'lodash';

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
        });
    });

    describe('searchForWordAroundGirdLoc', () => {
        const word = 'bee';
        const gridData = {
                wordGrid:[
                    ['a', 'a', 'a'],
                    ['b', 'b', 'b'],
                    ['c', 'c', 'e'],
                ],
                width: 3,
                height: 3,
            };
        const coords = [[0, 0], [0, 2], [2, 2], [2, 0], [1, 1]];
        function iterateThroughPossibleGridLocations(word, optionalAnswers, optionalGridData) {
            coords.forEach((coord, idx) => expect(WordSearch.searchForWordAroundGirdLoc(word, optionalGridData || gridData, coord)).toEqual(optionalAnswers && optionalAnswers[idx] || false))
        }
        it('should return false and not crash if incorrect data fed in', () => {
            expect(WordSearch.searchForWordAroundGirdLoc(word, coords)).toBe(false);
            expect(WordSearch.searchForWordAroundGirdLoc(213, gridData, coords)).toBe(false);
            expect(WordSearch.searchForWordAroundGirdLoc(word, 'asd', coords)).toBe(false);
            expect(WordSearch.searchForWordAroundGirdLoc(word, gridData, 23)).toBe(false);

        });
        it('should return false if the search finds nothing in the diagonal direction', () => {
            iterateThroughPossibleGridLocations(word);
        });
        it('should return array containing directions of word if found', () => {
            const newGridData = cloneDeep(gridData);
            newGridData.wordGrid[0][0] = 'e';
            iterateThroughPossibleGridLocations('be', [0, 0, 0, 0, ['DR', 'UL']], newGridData);
        });
        it('should return array containing directions of word if found', () => {
            const newGridData = cloneDeep(gridData);
            newGridData.wordGrid = [
                ['a', 'e', 'a'],
                ['b', 'b', 'e'],
                ['c', 'c', 'c'],
            ];
            iterateThroughPossibleGridLocations('be', [0, 0, 0, 0, ['R', 'U']], newGridData);
        })
    });

    describe('getCoordsOfWord', () => {
        const word = 'RICK';
        const directionArr = ['UL', 'R', 'DL'];
        const startingPoint = [3, 3];
        it('should return false if incorrect data fed in', () => {
            expect(WordSearch.getCoordsOfWord(word, 'some incorrect data', startingPoint)).toBe(false);
            expect(WordSearch.getCoordsOfWord(12, directionArr, startingPoint)).toBe(false);
            expect(WordSearch.getCoordsOfWord(word, directionArr, 'MORTY')).toBe(false);
        });
        it('should return false if no directions fed in', () => {
            expect(WordSearch.getCoordsOfWord(word, [], startingPoint)).toBe(false);
        });
        it('should return false if any invalid directions fed in', () => {
            expect(WordSearch.getCoordsOfWord(word, ['get', 'shwifty'], startingPoint)).toBe(false);
        });
        it('should return array of objects containing word and coords', () => {
            const solution = [{
                word,
                coords: [[3,3], [2, 2], [1, 1], [0, 0]],
            }, {
                word,
                coords: [[3, 3], [3, 4], [3, 5], [3, 6]]
            },{
                word,
                coords: [[3,3], [4, 2], [5, 1], [6, 0]]
            }];
            expect(WordSearch.getCoordsOfWord(word, directionArr, startingPoint)).toEqual(solution);
        })
    })
});