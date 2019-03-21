import * as x from "../../function/global/functions.js";


/**
 * Secure Password Event Listener
 *
 * @author Isak K. Hauge
 * */
window.addEventListener('load', function () {


    // * Debug message:
    console.log('Secure Password Listener: Started.');




    // * Init. Regular Expression Patterns:
    const REGEX_CHAR = new RegExp('\\S{8,}');
    const REGEX_NUM = new RegExp('\\d+');
    const REGEX_SPECIAL = new RegExp('[§!#$%&/()=?`+^@*_.,:;]');




    // * Get essential elements:
    const BULLET_CHAR = document.getElementById('char');
    const BULLET_NUM = document.getElementById('num');
    const BULLET_SPECIAL = document.getElementById('special');
    const BULLET_MATCH = document.createElement('i');
    const INPUT_PASS = document.getElementById('pass');
    const INPUT_PASS_REPEAT = document.getElementById('pass-confirm');




    // * Init. standard bullet styles.
    const BG = {success: 'bullet-success', warning: 'bullet-warning', error: 'bullet-danger'};




    // * Add the password match bullet to DOM:
    BULLET_MATCH.classList.add('bullet');
    x.showNode(BULLET_MATCH, false);
    INPUT_PASS_REPEAT.parentElement.append(BULLET_MATCH);




    // * Event Listener Functions:
    // Password (onInput):
    function passOnInput() {

        // Treat all bullets in accordance to the regex patterns.
        function treatBullets(bullets, patterns) {
            // Loop through array.
            for (let i=0; i<bullets.length; i++){
                // ? If the value is no empty.
                if (INPUT_PASS.value.length >= 1){
                    // ? If the value matches the pattern.
                    if (INPUT_PASS.value.match(patterns[i])){
                        bullets[i].classList.add(BG.success);
                        bullets[i].classList.remove(BG.warning);
                    } else {
                        bullets[i].classList.remove(BG.success);
                        bullets[i].classList.add(BG.warning);
                    }
                } else {
                    bullets[i].classList.remove(BG.warning, BG.success);
                }
            }
        }

        // Treat the bullets.
        treatBullets(
            [BULLET_CHAR, BULLET_NUM, BULLET_SPECIAL],
            [REGEX_CHAR, REGEX_NUM, REGEX_SPECIAL]
        );

    }


    // Confirmation password (onInput):
    function passRepeatOnInput() {

        // Create boolean values:
        let passEmpty = INPUT_PASS.value.length < 1;
        let repeatEmpty = INPUT_PASS_REPEAT.value.length < 1;
        let passMatch = INPUT_PASS.value === INPUT_PASS_REPEAT.value;

        // ? If both password input elements is not empty.
        if (!passEmpty && !repeatEmpty){
            // ? If passwords match.
            if (passMatch){
                BULLET_MATCH.innerText = 'Passorda samsvarar';
                BULLET_MATCH.classList.add(BG.success);
                BULLET_MATCH.classList.remove(BG.error);
            } else {
                BULLET_MATCH.innerText = 'Passorda samsvarar ikkje';
                BULLET_MATCH.classList.add(BG.error);
                BULLET_MATCH.classList.remove(BG.success);
            }
        }

        // Show or hide the bullet:
        x.showNode(BULLET_MATCH, (!repeatEmpty && !passEmpty));

    }




    // * Initialize Event Listeners:
    INPUT_PASS.addEventListener('input', passOnInput);
    INPUT_PASS_REPEAT.addEventListener('input', passRepeatOnInput);

});