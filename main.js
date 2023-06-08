// Daniel Gallagher
// L00158616
// 02/11/2022

import readLineSync from 'readline-sync';
import chalk from 'chalk';
import figlet from 'figlet';

import { gameMenu} from './gameMenu.js'
import { gameAdmin} from './gameAdmin.js'
import { displayTop5} from './top5.js'

let index = -1;
console.log(chalk.yellow(figlet.textSync('Welcome', {
    horizontalLayout: 'fitted',
    verticalLayout: 'fitted',
    width: 80,
    whitespaceBreak: true
})));
while (index != 0) {
    let opts = ['Play Pontaire Game', 'Game Admin', 'Top Five scores'];
    index = readLineSync.keyInSelect(opts, 'Select an option ?');
    index ++;
    switch (index) {
        case 1:
            gameMenu();
            break;
        case 2:
            gameAdmin();
            break;
        case 3:
            displayTop5();
            break;   
        default:
            break;        
    }
   
}

