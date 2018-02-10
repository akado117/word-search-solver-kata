import program from 'commander';
import WordSearch from '../helperClasses/wordSearch';


export function searchForWords(inputString) {
    const wordSearch = new WordSearch(inputString);

    const wordObjects = wordSearch.findWordsInWordGrid(wordSearch.getWordSearchData());
    if (!wordObjects) return console.warn('Please format your string as follows csv,words\ng,r,\ni,d ');
    wordSearch.buildOutputCoordString(wordObjects);
}
