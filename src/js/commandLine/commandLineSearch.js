import WordSearch from '../helperClasses/wordSearch';


export function searchForWords(inputString) {
    const wordSearch = new WordSearch(inputString);
    const wordObjects = wordSearch.findWordsInWordGrid(wordSearch.getWordSearchData());
    if (!wordObjects) return console.warn('Please format your file as follows:\ncsv,words,list\ns,q,u\na,r,e\ng,r,d');
    const formattedWordOutput = wordSearch.buildOutputCoordString(wordObjects);
    if (formattedWordOutput) console.log(formattedWordOutput);
}