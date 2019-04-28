import * as x from "../../function/global/functions.js";
import {AddressSearch} from "../../class/AddressSearch.js";
import {AppPage} from "../../class/AppPage.js";
import {CollectionGrid} from "../../class/CollectionGrid.js";
import {ModalWindow} from "../../class/ModalWindow.js";

window.onload = () => {

    // * Define custom elements:
    customElements.define('address-search', AddressSearch);
    customElements.define('collection-grid', CollectionGrid);
    customElements.define('app-page', AppPage);




    // * Fetch essential elements:
    const addressSearch = document.querySelector('address-search');
    const collectionGrid = document.querySelector('collection-grid');




    // * Set up a Mutation Observer:

    // Init. mutation configuration object.
    const mutationConfig = {attributes: true, childList: false, subtree: false};

    // Init. mutation callback function.
    function mutationCallback(mutations, observer) {

        // Iterate through each mutation.
        for (const mutation of mutations) {

            // ? If the mutation is of a 'childList' type.
            if (mutation.type === 'childList'){

                x.cout('Mutation: A child node has been added or removed.');

            }

            // ? If the mutation is of an 'attribute' type.
            else if (mutation.type === 'attributes'){

                x.cout('Mutation: The ' + mutation.attributeName + ' attribute has been modified.');

                collectionGrid.setAttribute(
                    CollectionGrid.rsc().attribute.addressID,
                    x.getSelectedValue(addressSearch)
                );

            }
        }
    }

    // Instantiate a new Mutation Observer object.
    const observer = new MutationObserver(mutationCallback);

    // Observe desired object.
    observer.observe(addressSearch, mutationConfig);

};