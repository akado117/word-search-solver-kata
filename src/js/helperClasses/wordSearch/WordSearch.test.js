import WordSearch from '../wordSearch';
import createSandbox from 'jest-sandbox';
import { cloneDeep } from 'lodash';

describe('WordSearch Class', () => {
    let wordSearch;
    beforeEach(() => {
        wordSearch = new WordSearch();
    });
    describe('setWordSearchData', () => {
        it('should not cause program to crash if invalid data fed in', () => {
            expect(wordSearch.setWordSearchData('some junk data that isn what it should be ')).toBe(undefined);
        });
        it('should keep internal data defaults if incomplete data fed in', () => {
            const fakeParsedData = {
                wordArray: 123,
                wordGrid: undefined,
                waidth: ['some', 'body'],
                heihgt: ['once', 'told', 'me'],

            };
            wordSearch.setWordSearchData(fakeParsedData);
            expect(wordSearch._height).toEqual(null);
            expect(wordSearch._width ).toEqual(null);
            expect(wordSearch._wordGrid).toEqual([]);
            expect(wordSearch._wordArray).toEqual([]);
        });
        it('should set internal data when types are correct', () => {
            const fakeParsedData = {
                wordArray: ['the', 'world'],
                wordGrid: ['is', 'gonna', 'owe', 'me'],
                width: 12,
                height: 12,

            };
            wordSearch.setWordSearchData(fakeParsedData);
            expect(wordSearch._height).toEqual(12);
            expect(wordSearch._width ).toEqual(12);
            expect(wordSearch._wordGrid).toEqual(['is', 'gonna', 'owe', 'me']);
            expect(wordSearch._wordArray).toEqual(['the', 'world']);
        })
    });

    describe('parseWordSearchString', () => {
        const extraDesc = 'should return null';
        it(`${extraDesc} should the input be an incorrect data type`, () => {
            expect(wordSearch.parseWordSearchString(12313)).toBe(null);
        });
        it(`${extraDesc} if the first line contains any words with less than two letters`, () => {
            expect(wordSearch.parseWordSearchString(',\na,b')).toBe(null);
            expect(wordSearch.parseWordSearchString('asd,dds,1337,uno,no,I')).toBe(null);
        });
        it(`${extraDesc} if there are any rows with a different length than grid height or there are no rows`, () => {
            expect(wordSearch.parseWordSearchString('asd,dds,1337,uno,no')).toBe(null);
            expect(wordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b,b')).toBe(null);
            expect(wordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b\nc,c,c')).toBe(null);
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
            expect(wordSearch.parseWordSearchString('asd,dds,1337,uno,no\na,a,a\nb,b,b\nc,c,c')).toEqual(result);
        });
    });

    describe('searchForWordAroundGridLoc', () => {
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
            coords.forEach((coord, idx) => expect(wordSearch.searchForWordAroundGridLoc(word, optionalGridData || gridData, coord)).toEqual(optionalAnswers && optionalAnswers[idx] || false))
        }
        it('should return false and not crash if incorrect data fed in', () => {
            expect(wordSearch.searchForWordAroundGridLoc(word, coords)).toBe(false);
            expect(wordSearch.searchForWordAroundGridLoc(213, gridData, coords)).toBe(false);
            expect(wordSearch.searchForWordAroundGridLoc(word, 'asd', coords)).toBe(false);
            expect(wordSearch.searchForWordAroundGridLoc(word, gridData, 23)).toBe(false);

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
            expect(wordSearch.getCoordsOfWord(word, 'some incorrect data', startingPoint)).toBe(false);
            expect(wordSearch.getCoordsOfWord(12, directionArr, startingPoint)).toBe(false);
            expect(wordSearch.getCoordsOfWord(word, directionArr, 'MORTY')).toBe(false);
        });
        it('should return false if no directions fed in', () => {
            expect(wordSearch.getCoordsOfWord(word, [], startingPoint)).toBe(false);
        });
        it('should return false if any invalid directions fed in', () => {
            expect(wordSearch.getCoordsOfWord(word, ['get', 'shwifty'], startingPoint)).toBe(false);
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
            expect(wordSearch.getCoordsOfWord(word, directionArr, startingPoint)).toEqual(solution);
        });
    });

    describe('buildCoord', () => {
        it('should return coord array object when correct data fed in', () => {//this is a really simple helper function that's called A LOT, so not going to implement typeChecking for perf reasons
            expect(wordSearch.buildCoord([0, 1], 1, [3, 3])).toEqual([3, 4]);
            expect(wordSearch.buildCoord([-1, -1], 1, [3, 3])).toEqual([2, 2]);
        });
    });

    describe('buildOutputCoordString', () => {
        beforeEach(() => {

        });
        it('should return "please use correct data" if incorrect data fed in', () => {
            const solution = 'please use correct data';
            expect(wordSearch.buildOutputCoordString(1)).toBe(solution);
            expect(wordSearch.buildOutputCoordString([])).toBe(solution);
            expect(wordSearch.buildOutputCoordString([1, 'd', []])).toBe(solution);
            expect(wordSearch.buildOutputCoordString([{},{}])).toBe(solution);
            expect(wordSearch.buildOutputCoordString([{a: 'what is'},{b: 'my purpose'}])).toBe(solution);
            expect(wordSearch.buildOutputCoordString([{coords: 'what is'},{word: 'my purpose'}])).toBe(solution);
        });
        it('should return string of words with their coords', () => {
            const sampleInput = [{
                word: 'You',
                coords: [[4, 3], [3, 4]],
            }, {
                word: 'Pass',
                coords: [['c', 1], [3, 7]],
            }, {
                word: 'Butter',
                coords: [[1, 3], [3, 7]],
            }];
            const solution = 'You: (4,3),(3,4)\nPass: (c,1),(3,7)\nButter: (1,3),(3,7)\n';
            expect(wordSearch.buildOutputCoordString(sampleInput)).toEqual(solution);
        })
    })

    describe('findWordsInWordGrid', () => {
        const sampleInput = {
            wordGrid: [['a','c','e']],
            height: 5,
            width: 5,
            wordArray: ['bee', 'movie']
        };
        const searchStub = jest.fn();
        const coordsStub = jest.fn();
        let sandbox;
        beforeEach(() => {
            sandbox = createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('should return false if input data is incorrect', () => {
            const inputClone = cloneDeep(sampleInput);
            expect(wordSearch.findWordsInWordGrid(2)).toBe(false);
            expect(wordSearch.findWordsInWordGrid('adasdasd')).toBe(false);
            expect(wordSearch.findWordsInWordGrid({})).toBe(false);
            inputClone.wordArray = [1, 2];
            expect(wordSearch.findWordsInWordGrid(inputClone)).toBe(false);
            inputClone.wordArray = sampleInput.wordArray;
            inputClone.wordGrid = [{}];
            expect(wordSearch.findWordsInWordGrid(inputClone)).toBe(false);
            inputClone.wordGrid = sampleInput.wordGrid;
            inputClone.width = '1';
            expect(wordSearch.findWordsInWordGrid(inputClone)).toBe(false);
            inputClone.width = sampleInput.width;
            inputClone.height = '1';
            expect(wordSearch.findWordsInWordGrid(inputClone)).toBe(false);
        });
        it('returns false if no words found', () => {
            wordSearch.searchForWordAroundGridLoc = sandbox.fn(wordSearch.searchForWordAroundGridLoc).mockReturnValue(false);
            wordSearch.getCoordsOfWord = sandbox.fn(wordSearch.getCoordsOfWord).mockReturnThis(false);
            expect(wordSearch.findWordsInWordGrid(sampleInput)).toBe(false);
        });
        it('should not call get coords of word if theres no word directions found', () => {
            wordSearch.searchForWordAroundGridLoc = sandbox.fn(wordSearch.searchForWordAroundGridLoc).mockReturnValue(false);
            wordSearch.getCoordsOfWord = sandbox.fn(wordSearch.getCoordsOfWord).mockReturnValue({});
            wordSearch.findWordsInWordGrid(sampleInput);
            expect(wordSearch.searchForWordAroundGridLoc.mock.calls.length).toBe(6);
            expect(wordSearch.getCoordsOfWord.mock.calls.length).toBe(0);
        });
        it('should return array of wordCoordsObjects if getCoordsOfWord returns them', () => {
            wordSearch.searchForWordAroundGridLoc = sandbox.fn(wordSearch.searchForWordAroundGridLoc).mockReturnValue(['UL']);
            wordSearch.getCoordsOfWord = sandbox.fn(wordSearch.getCoordsOfWord).mockReturnValue({});
            expect(wordSearch.findWordsInWordGrid(sampleInput)).toEqual([{}, {}, {}, {}, {}, {}]);
            expect(wordSearch.searchForWordAroundGridLoc.mock.calls.length).toBe(6);
            expect(wordSearch.getCoordsOfWord.mock.calls.length).toBe(6);
            expect(wordSearch.getCoordsOfWord.mock.calls[0][0]).toBe(sampleInput.wordArray[0]);
            expect(wordSearch.getCoordsOfWord.mock.calls[0][1]).toEqual(['UL']);
        })
    })
});