const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const { searchForWords } = require("../../../cmd/wordSearch");

const questions = [
    {
        type : 'input',
        name : 'fileName',
        message : 'Please enter path to file'
    }
];

program
    .version('0.0.43')
    .description('Word Search Solver');

program
    .command('searchFileForWords')
    .alias('s')
    .description('Search File For Words')
    .action(() => {
        prompt(questions).then((answers) => {
            try {
                const data = fs.readFileSync(answers.fileName, 'utf8').toString();
                searchForWords(data);
            } catch (err) {
                console.error(err);
            }
        })
    });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}
program.parse(process.argv)