console.log("Welcome, Robots!");

// global variables defined
// initial player stats
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// initial enemy stats
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
//global variables end

console.log(enemyNames);
console.log(enemyNames.length);

// Game states
// "WIN" – player robot has defeated all enemy robots
//      * fight all enemy robots
//      * defeat each enemy robot
// "LOSE" – player robot's health is zero or less

// wrap game logic in a startGame() function
// when the player is defeated or there are no more enemies, create an endGame() function that:
//      * alerts player's total stats
//      * asks player if they want to play again
//      * if yes, call startGame() to restart game
// after player skips or defeats an enemy (and there are still enemies remaining)
//      * ask if they want to "shop"
//      * if no, continue as normal with fight
//      * if yes, call shop() function
//      * shop() function should ask player if they wan to refill health, upgrade attack or leave shop
//      * "refill" will subtract money from player and increase health
//      * "upgrade" will subtract money and increase attack
//      * "leave" will alert goodbye and exit function
//      * invalid option will call shop() again

// the fight function begins (with parameter for enemy's name)
var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        // ask player if they want to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player skip, then confirm and stop the loop
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            // confirm skip
            var confirmSkip = window.confirm(playerName + " has chosen to skip the fight! Are you sure you want to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // if player FIGHT, enter fight
        if (promptFight === "fight" || promptFight === "Fight" || promptFight === "FIGHT") {

            // remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            //check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                //award money to player for winning
                playerMoney = playerMoney + 20;

                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + ' still has ' + enemyHealth + ' health remaining.');
            }

            //remove player's health by subtracting the amount set in enemy health variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
            );

            //check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + ' has died!');
                //leave while() loop if player is dead
                break;
            } else {
                window.alert(playerName + ' still has ' + playerHealth + ' health remaining.');
            }
        } else {
            window.alert("Please enter a valid response, skip or fight.");
        }
    }
};

//function to start a new game
var startGame = function () {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) {
        // if player is still alive, keep fighting
        if (playerHealth > 0) {
            // let player know what round they are in (arrays start at 0, so be sure to +1 for rounds with each robot)
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before starting a new fight
            enemyHealth = 50;

            //use debugger to pause script from running and check what's going on
            // debugger

            //pass the pickedEnemyName variable's value into the fight function
            // it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        }
        // if player isn't alive, stop the game
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // play again?
    endGame();
};

//function to end the game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //if player is still alive, player win
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("Yo've lost your robot in battle.");
    }
    //ask if player wants to go again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon. 🤖");
    }
};

//start game when the page loads
startGame();