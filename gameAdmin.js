import figlet from 'figlet';
import chalk  from 'chalk';
import readlineSync from 'readline-sync';
import * as fs from 'fs';

// Game Admin
//- Add a Question #
//- Delete a Question #
//- View all Questions + answers #
//- Edit Questions

let index = -1;

//add a question with 4 content and 1 correct for json file
function addQ() {
    let rawjson = fs.readFileSync('./questions.json')
    let questionList = JSON.parse(rawjson);

    //console.log("Adding a Question");
    let questionIn = readlineSync.question("Enter your Question that you want to add: ");
    let answerAIn = readlineSync.question("Enter your Answer for option[A]: ");
    let answerBIn = readlineSync.question("Enter your Answer for option[B]: ");
    let answerCIn = readlineSync.question("Enter your Answer for option[C]: ");
    let answerDIn = readlineSync.question("Enter your Answer for option[D]: ");
    let correctIn = readlineSync.question("Enter the correct answer option[A-D]: ");

    //construct new question object
    let newQuestion = {
        question: questionIn,
        content: [
            answerAIn,
            answerBIn,
            answerCIn,
            answerDIn
        ],
        correct: correctIn
    };

    //add new object into questionList
    questionList.push(newQuestion);

    //strigify questionList into a new one
    let newQuestionList = JSON.stringify(questionList, null, '\t');

    //rewrite everything into newQuestionList
    fs.writeFileSync('./questions.json', newQuestionList);
    console.log("");
    console.log(chalk.greenBright("*** Succesfully added your Question ***"))
}

//delete a question with an id of some sort
function deleteQ() {
    var jsonfile = fs.readFileSync('questions.json');
    var questionList = JSON.parse(jsonfile);

    console.log("Deleting a Question");
    let questionIndex = readlineSync.question("Enter the index of the question you want to delete[0-50]: ");
    questionIndex = parseInt(questionIndex);

    // remove one element starting at quesitonIndex
    questionList.splice(questionIndex, 1);

    let newQuestionList = JSON.stringify(questionList, null, 4)
    fs.writeFileSync('./questions.json', newQuestionList, (err) => {
        if (err) throw err;
    });

    console.log("");
    console.log(chalk.redBright("*** Succesfully Deleted Selected Question ***"))

}

//View any Question and answers
function viewQuestions() {
    var jsonfile = fs.readFileSync('questions.json');
    var questions = JSON.parse(jsonfile);

    let questionIndexView = readlineSync.question("Enter the index of the question you want to view[0-50]: ");
     console.log(chalk.blueBright("Question: " + questions[questionIndexView].question));
     console.log(chalk.redBright("Answer a: " + questions[questionIndexView].content[0]));
     console.log(chalk.redBright("Answer b: " + questions[questionIndexView].content[1]));
     console.log(chalk.redBright("Answer c: " + questions[questionIndexView].content[2]));
     console.log(chalk.redBright("Answer d: " + questions[questionIndexView].content[3]));
     console.log(chalk.greenBright("Correct Answer: " + questions[questionIndexView].correct));

}

//Edit Questions
function editQ() {
    console.log("Edit Questions");

}


function gameAdmin() {
    console.log(chalk.red(figlet.textSync('Admin Menu', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));

    while (index != 0) {
        let opts = ['Add a Question', 'Delete a Question', 'View Questions', 'Edit Questions'];
        index = readlineSync.keyInSelect(opts, 'Select an option ?');
        index ++;
        switch (index) {
            case 1:
                //Add a Question
                addQ();
                break;
            case 2:
                //Delete a Question
                deleteQ();
                break;
            case 3:
                //View a Question
                viewQuestions();
                break; 
            case 4:
                //Edit a Question
                break;      
            default:
                break;        
        }
       
    }


}

export {gameAdmin}