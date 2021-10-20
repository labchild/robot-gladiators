console.log("Welcome, Robots!");

//generate a random numerica value 40-60
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

//console.log(enemy.name);
//console.log(enemyInfo.length);

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

// fight or skip function
var fightOrSkip = function () {
    //ask player if they'd like to fight or skip using fightOrSkip()
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter \"FIGHT\" or \"SKIP\" to continue.");

    // Use conditional recursive function here
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
    // if player skip, then confirm and stop the loop
    if (promptFight === "skip") {
        // confirm skip
        var confirmSkip = window.confirm(playerInfo.name + " has chosen to skip the fight! Are you sure you want to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money for skipping
            playerInfo.Money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    } return false;
}
// the fight function begins (with parameter for enemy's name)
var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    
    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        //if it is the player-robot's turn
        if (isPlayerTurn) {
            // prompt the fight skip request
            if (fightOrSkip()) {
                // if true (skip), leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove damage from enemy robot health
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " +
                enemy.name + " now has " + enemy.health + " health remaining."
            );

            //check if enemy robot has enough health to continue fighting
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        // player gets attacked first    
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

             // remove damage from player robots health
             playerInfo.health = Math.max(0, playerInfo.health - damage);
             console.log(
                 enemy.name + " attacked " + playerInfo.name + ". " +
                 playerInfo.name + " now has " + playerInfo.health + " health remaining."
             );

             // check if player robot has enough health to continue fighting
             if (playerInfo.health <= 0) {
                 window.alert(playerInfo.name + " has died!");
                 //leave while loop since player is dead
                 break;
             } else {
                 window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.");
             }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

//function to start a new game
var startGame = function () {
    //reset player stats
    playerInfo.reset();

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in (arrays start at 0, so be sure to +1 for rounds with each robot)
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            debugger;
            //pick new enemy to fight based on the index of the enemy array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting a new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array, option to shop
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                // ask if player wants to use shop before next round
                var storeConfirm = window.confirm("The fight is over. Visit the shop before the next round?");

                //if yes, call shop()
                if (storeConfirm) {
                    shop();
                }
            }
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
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    //if player is still alive, player win
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
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

// shop function defined
var shop = function () {
    // ask player what they want to do in the store
    var shopOptionPrompt = window.prompt(
        "Would you like to: 1 – refill your health; 2 – upgrade your attack; or 3 – leave the shop?"
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch statement to go shopping
    switch (shopOptionPrompt) {    
        // REFILL option
        case 1:
            playerInfo.refillHealth();
            break;

        // UPGRADE option
        case 2:
            playerInfo.upgradeAttack();
            break;

        //leave option
        case 3:
            window.alert("Leaving the store.");
            //do nothing, end function
            break;

        //invalid entry
        default:
            window.alert("You did not pick a valid option. Try again");
            //call shop() again to force player to choose valid option
            shop();
            break;
    }
};

//function to set playr name
var getPlayerName = function () {
    var name = "";

    // add loop to ask for name until valid option is entered (no blank/null)
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    };

    console.log("Your robot's name is " + name);
    return name;
};

//end of game functions

// global variables defined
// initial player stats
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// initial enemy stats
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);
//global variables end

//start game when the page loads
startGame();