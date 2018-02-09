import { searchForWords } from './commandLineSearch';

describe('commandLineSearch' , () => {
   describe('searchForWords', () => {
       it('should not crash if invalid data fed in', () => {
           searchForWords('holy toledo');
           searchForWords(123);
           searchForWords({});
           expect(searchForWords()).toBe(undefined);
       })
   })
});