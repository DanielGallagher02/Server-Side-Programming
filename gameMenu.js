import readlineSync from 'readline-sync';
import * as fs from 'fs';
import chalk from 'chalk';
import figlet from 'figlet';

import { writeNameAndScores} from './top5.js'

/* Play Pointaire Game
- Ask the player for their name #
- Ask the player questions #
- Player has 3 lifelines(50/50, dial a friend or ask the audience)
- Checks to see if the answers is correct or not #
*/

var min, max, r, n, p;

min = 1;
max = 50;
r = 15;     //how many numbers i want to extract between min and max 

function gameMenu() {
    let questionNo = 0;
    let currentScore = 0;
    let name = readlineSync.question("Enter your Player name: ");

    //get questions from json file
    var jsonfile = fs.readFileSync('questions.json');
    var questions = JSON.parse(jsonfile);

    //store  randomNums 
    let randomNums = [];

    //generating randomNums and put them into randomNums array
    for (let i = 0; i < r; i++) {
        do {
            n = Math.floor(Math.random() * (max - min + 1)) + min;
            p = randomNums.includes(n);
            if(!p) {
                randomNums.push(n);
            }
        }
        while(p)
    }
    
    //while loop to run the main game 
    while(questionNo < randomNums.length) {
        console.log(questions[randomNums[questionNo]].question);
        console.log("[a] " + questions[randomNums[questionNo]].content[0]);
        console.log("[b] " + questions[randomNums[questionNo]].content[1]);
        console.log("[c] " + questions[randomNums[questionNo]].content[2]);
        console.log("[d] " + questions[randomNums[questionNo]].content[3]);
        console.log("[H] HELPLINE ");
        console.log("");
        console.log(chalk.bgBlueBright("Player: " + name));
        console.log(chalk.bgRedBright("Score: " + currentScore));
        let userOpt = readlineSync.question("Select Option? (a-d or h for Help): ");
        console.log("");

        //if the player answers the question right
        if( userOpt == questions[randomNums[questionNo]].correct) {

            currentScore++;
            questionNo++;
            console.log(chalk.greenBright("You are correct, next question"));
            console.log("");
        }
        //if the player selects the helpline option
        else if (userOpt == 'H' || userOpt == 'h') {
            console.log("The Helpline");
        }
        //else the player loses the game and saves score
        else {
            console.log(chalk.blue(figlet.textSync('Game Over', {
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted',
                width: 80,
                whitespaceBreak: true
            })));
            console.log(chalk.bgGreenBright("Saving score..."));
            writeNameAndScores(name, currentScore);
            break;
        }
    }



}

export { gameMenu}