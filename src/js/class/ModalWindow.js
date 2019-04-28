import * as x from "../function/global/functions.js";


/**
 * Modal Window
 * */
export class ModalWindow {

    /**
     * Constructor
     *
     * @param {HTMLElement} parentNode - The node in which to append.
     * @param {string} title - The window title.
     * @param {array} contentArray - The content.
     * @param {array} buttonArray - An array of button elements.
     * @param {boolean} addCloseButton - Whether the modal shall have a close button.
     * */
    constructor(parentNode,title,contentArray,buttonArray,addCloseButton){

        this._parentNode = parentNode;
        this._title = title;
        this._contentArray = contentArray;
        this._buttonArray = (buttonArray.length > 0) ? buttonArray : null;
        this._addCloseButton = addCloseButton;

        this.build(() => {
            this.render();
        });
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
    build(callback){

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

        for (let i=0; i<this._contentArray.length; i++){
            this._div_modalContent.append(this._contentArray[0]);
        }


        // * Append nodes:
        this._div_modalBox.append(
            this._div_modalTitle,
            this._div_modalContent
        );

        // Add buttons.
        if (this._buttonArray !== null){
            for (let i=0; i<this._buttonArray.length; i++){
                this._div_modalBox.append(this._buttonArray[i]);
            }
        }

        // ? If close button is enabled.
        if (this._addCloseButton){
            this._div_modalBox.append(
                ModalWindow.element(this).button.close()
            );
        }

        // Overwrite connected callback.
        this._modalWindow.connectedCallback = function () {
            if (this.isConnected){
                x.componentLoadedMessage(this);
            }
        };

        // Append nodes.
        this._modalWindow.append(this._div_modalBox);

        callback();

    }




    /**
     * Render
     * */
    render(){
        this._parentNode.append(this._modalWindow);
    }




    /**
     * Element
     * */
    static element(object){
        return {
            button: {
                close: () => {
                    const elem = x.makeElement('button', 'Lukk');
                    elem.setAttribute('class', 'btn btn-clay fx-3d-clay');
                    elem.addEventListener(
                        ModalWindow.ev(object).button.close.click().type,
                        ModalWindow.ev(object).button.close.click().listener
                    );
                    return elem;
                }
            }
        }
    }




    /**
     * EventListener
     * */
    static ev(object){
        return {
            button: {
                close: {
                    click: () => {
                        return {
                            type: 'click',
                            listener: event => {
                                x.deleteElement(object);
                            }
                        }
                    }
                }
            }
        }
    }




    /**
     * Get Element
     * @return {HTMLElement}
     * */
    get getElement(){
        return this._modalWindow;
    }

}