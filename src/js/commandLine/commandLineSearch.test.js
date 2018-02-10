import { searchForWords } from './commandLineSearch';
import WordSearch from '../helperClasses/wordSearch';
const mockGetWordSearchData = jest.fn();
const mockFindWordsInWordGrid = jest.fn().mockReturnValue('anything');
const mockBuildOutputCoordString = jest.fn();

jest.mock('../helperClasses/wordSearch', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getWordSearchData: mockGetWordSearchData,
            findWordsInWordGrid: mockFindWordsInWordGrid,
            buildOutputCoordString: mockBuildOutputCoordString,
        };
        // Now we can track calls to playSoundFile
    });
});

describe('commandLineSearch' , () => {
   beforeEach(() => {
       WordSearch.mockClear();
       mockGetWordSearchData.mockClear();
       mockFindWordsInWordGrid.mockClear();
       mockBuildOutputCoordString.mockClear();
   });
   describe('searchForWords', () => {
       it('should not crash if invalid data fed in', () => {
           searchForWords('holy toledo');
           searchForWords(123);
           searchForWords({});
           //expect(searchForWords()).toBe(undefined);
       });
       it('should call functions from WordSearch in correct order', () => {
           searchForWords('word,are\nf,u,n\nn,s,u\nc,h,!');
           expect(WordSearch).toHaveBeenCalledTimes(1);
           expect(mockGetWordSearchData).toHaveBeenCalledTimes(1);
           expect(mockFindWordsInWordGrid).toHaveBeenCalledTimes(1);
           expect(mockBuildOutputCoordString).toHaveBeenCalledTimes(1);
       });
       it('should call functions from WordSearch in correct order', () => {
           mockFindWordsInWordGrid.mockReturnValue(false);
           searchForWords('word,are\nf,u,n\nn,s,u\nc,h,!');
           expect(WordSearch).toHaveBeenCalledTimes(1);
           expect(mockGetWordSearchData).toHaveBeenCalledTimes(1);
           expect(mockFindWordsInWordGrid).toHaveBeenCalledTimes(1);
           expect(mockBuildOutputCoordString).toHaveBeenCalledTimes(0);
           mockFindWordsInWordGrid.mockReturnValue('anything');
       });
   })
});