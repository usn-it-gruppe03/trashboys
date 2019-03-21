import * as x from "../../function/global/functions.js";

window.addEventListener('load', function () {

    // ! Debugging.
    console.log('Register Form Watch: Started.');




    // * Make easier functions:
    let get = (id) => { return document.getElementById(id); };
    let create = (tag) => { return document.createElement(tag) };




    // * Get HTML elements:
    const IN_FNAME = get('fname');
    const IN_LNAME = get('lname');
    const IN_EMAIL = get('email');
    const IN_PHONE = get('phone');




    // * Create Regular expressions:
    const REX = {
        name: new RegExp('([a-zæøåA-ZÆØÅ\\s-áéíóúÁÉÍÓÚ]+)'),
        email: new RegExp('([a-zA-Z0-9+.])+(@{1})(?!\\.)([a-zA-Z0-9])+(\\.[a-zA-Z0-9]+)+'),
        phone: new RegExp('\\d{8}'),
    };




    // * Create bullets:
    const BULLET_FNAME = create('i');
    const BULLET_LNAME = create('i');
    const BULLET_EMAIL = create('i');
    const BULLET_PHONE = create('i');




    // * Bullet error messages:
    const MSG = [
        'Ugyldig: Navn kan berre innehalde bokstavar og bindestrek',
        'Ugyldig: Navn kan berre innehalde bokstavar og bindestrek',
        'Ugyldig: Epost-adressa er ikkje gyldig',
        'Ugyldig: Telefonnummeret kan berre innehalde 8 tal.'
    ];




    // * Function: Automate population.
    let populate = (inputs, bullets) => {
        for (let i=0; i<inputs.length; i++) {
            bullets[i].innerText = MSG[i];
            bullets[i].classList.add('bullet', 'bullet-warning');
            inputs[i].addEventListener('input', onInput);
            x.showNode(bullets[i], false);
            inputs[i].parentElement.append(bullets[i]);
        }
    };




    // * Populate bullets.
    populate(
        [IN_FNAME, IN_LNAME, IN_EMAIL, IN_PHONE],
        [BULLET_FNAME, BULLET_LNAME, BULLET_EMAIL, BULLET_PHONE]
    );




    // * Better match algorithm.
    let fullMatch = (value, pattern) => {

        // Init. default values:
        let patternMatch = null;
        let fullMatch = false;

        // ? If the match returns a string.
        if (value.match(pattern) != null){

            // Get string.
            patternMatch = value.match(pattern);

            // See if value and pattern matches.
            return (value === patternMatch[0]);

        } else return fullMatch;
    };




    // * Event handler.
    function onInput() {

        // Init. reusable variables:
        let value = this.value;
        let empty = this.value.length < 1;
        let rex = null;
        let bullet = null;

        // Switch.
        switch (this) {

            // ? If this object is an input element for first name.
            case IN_FNAME:
                rex = REX.name;
                bullet = BULLET_FNAME;
                break;

            // ? If this object is an input element for last name.
            case IN_LNAME:
                rex = REX.name;
                bullet = BULLET_LNAME;
                break;

            // ? If this object is an input element for email.
            case IN_EMAIL:
                rex = REX.email;
                bullet = BULLET_EMAIL;
                break;

            // ? If this object is an input element for phone number.
            case IN_PHONE:
                rex = REX.phone;
                bullet = BULLET_PHONE;
                break;
        }

        // ? If the value is not empty and both rex and bullet has values.
        if (!empty && rex != null && bullet != null){

            // ? If there was a full match.
            if (fullMatch(value, rex))
                // Hide the bullet.
                x.showNode(bullet, false);

            // ? If there was not a full match.
            else if (!fullMatch(value, rex))
                // Show the bullet.
                x.showNode(bullet, true);

        } else {
            // Hide the bullet.
            x.showNode(bullet, false);
        }

    }



});