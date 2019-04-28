import * as x from "../function/global/functions.js";


/**
 * Modal Window
 * */
export class ModalWindow {

    /**
     * Constructor
     *
     * @param {string} title - The window title.
     * @param {HTMLElement} content - The content.
     * @param {array} buttons - An array of button elements.
     * */
    constructor(title,content,buttons){
        this._title = title;
        this._content = content;
        this._buttons = buttons;
    }




    /**
     * Resource
     * */
    static rsc(){
        return {
            id: {},
            class: {
                div: {
                    modalBox: 'modal-box',
                    modalTitle: 'modal-title',
                    modalContent: 'modal-content',
                }
            },
        }
    }




    /**
     * Build
     * */
    build(){

        // * Create elements:
        this._modalWindow = x.makeElement('modal-window');
        this._div_modalBox = x.makeElement('div');
        this._div_modalTitle = x.makeElement('div');
        this._div_modalContent = x.makeElement('div');


        // * Add CSS classes:
        this._div_modalBox.setAttribute('class', ModalWindow.rsc().class.div.modalBox);
        this._div_modalTitle.setAttribute('class', ModalWindow.rsc().class.div.modalTitle);
        this._div_modalContent.setAttribute('class', ModalWindow.rsc().class.div.modalContent);


        // * Add content:
        this._div_modalTitle.innerText = this._title;
        this._div_modalContent.append(this._content);


        // * Append nodes:
        this._div_modalBox.append(
            this._div_modalTitle,
            this._div_modalContent
        );

        // Add buttons.
        for (let i=0; i<this._buttons.length; i++){
            this._div_modalBox.append(this._buttons[i]);
        }

        // Overwrite connected callback.
        this._modalWindow.connectedCallback = function () {
            if (this.isConnected){
                x.componentLoadedMessage(this);
            }
        };

        this._modalWindow.append(this._div_modalBox);

    }




    /**
     * Render
     * */
    render(){
        const body = document.querySelector('body');
        body.append(this._modalWindow);
    }

}