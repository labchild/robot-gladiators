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

// Game states
// "WIN" – player robot has defeated all enemy robots
//      * fight all enemy robots
//      * defeat each enemy robot
// "LOSE" – player robot's health is zero or less

// the fight begins function
var fight = function (enemyName) {
    // Alert players that they are starting the round
    // window.alert("Welcome to Robot Gladiators!");
    // repeat and execute as long as the enemy robot is alive
    while (enemyHealth > 0) {
        // Enter fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);
        //if a player chooses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight") {
            // Subtract value of 'playerAttack' from the value of 'enemyHealth' and log to console
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left!")
            }

            //subtract the value of 'enemyAttack' from the value of 'playerHealth' and log to console
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            }
            else {
                window.alert(playerName + " has " + playerHealth + " health left!")
            }
            //if player chooses to skip
        } else if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            var confirmSkip = window.confirm(playerName + " has chosen to skip the fight! Are you sure you want to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract moeny for skipping
                playerMoney = playerMoney - 2;
            }
            //if no (false), ask question again by running fight() again
            else {
                fight();
            }
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}