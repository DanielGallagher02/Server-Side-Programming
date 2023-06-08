
import * as fs from 'fs';
import chalk from 'chalk';
import figlet from 'figlet';

// Top Five Scores
//- writes and stores the name and score in a json file #
//- Displays a list of the top 5 player scores from json file #

// - Writes and stores the name and score in a file
function writeNameAndScores(NameIn, SavingScoreIn) {
    //Take in already existing elements of scores.json and then parse them
    //into the list
    let rawjson = fs.readFileSync('./scores.json')
    let scoreList = JSON.parse(rawjson);

    //test name and score, edit this to use readfile sync eariler or something
    let savingName = NameIn;
    let SavingScore = SavingScoreIn;

    //construct new score object
    let newScore = {
        name: savingName,
        score: SavingScore
    };

    //add new object into score list
    scoreList.push(newScore);

    //strigify score list into a new one
    let newScoreList = JSON.stringify(scoreList, null, '\t');

    //rewrite everything into score list
    fs.writeFileSync('./scores.json', newScoreList);
}

//- Displays a list of the top 5 player scores from json file
function displayTop5scores(key) {
    return function (a, b) {
        if (a[key] > b[key]) {
            return -1;
        }
        else if (a[key] < b[key]) {
            return 1;
        }
    }
}

//- Displays a list of the top 5 player scores from json file
function displayTop5() {
    let rawjson = fs.readFileSync('./scores.json');
    let scoreList = JSON.parse(rawjson);

    //use displayTop5scores by "score" and then reverse to show the highest at the top
    scoreList.sort(displayTop5scores("score"));

    //display scoreList elements
    console.log(chalk.green(figlet.textSync('Top 5 Scores', {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted',
        width: 120,
        whitespaceBreak: true
    })));
    for (let i = 0; i < 5; i++) {
        console.log(scoreList[i]);
    }
}


export { writeNameAndScores, displayTop5}