import * as tb from "../function/global/functions.js";

export class TabContainer extends HTMLElement {

    constructor(){
        super();
        this.dataCheck();
        this.populate();
    }




    // ** Static attribute names **
    static attr(){
        return {
            name: 'data-tab-names',
            target: 'data-tab-targets'
        }
    }




    static css(){
        return{
            class: 'tab-btn',
            borderRadius: {
                topLeft: 'tab-btn-br-tl',
                topRight: 'tab-btn-br-tr',
            }
        }
    }




    // ** Attribute check **
    dataCheck(){

        // ? If name attribute is defined.
        if (TabContainer.attrDefined(this, TabContainer.attr().name))
            this.name = this.getAttribute(TabContainer.attr().name).split(';');

        // ? If target attribute is defined.
        if (TabContainer.attrDefined(this, TabContainer.attr().target))
            this.target = this.getAttribute(TabContainer.attr().target).split(';');

    }




    /**
     * Populate.
     *
     * @description This function will populate child nodes.
     * */
    populate(){

        // ? If name and target attributes are defined.
        if (this.name != null && this.target != null && this.name.length === this.target.length){

            // Loop through children.
            for (let i=0; i<this.name.length; i++){

                // Create element.
                let elem = document.createElement('div');

                // Init. inner text.
                elem.innerText = this.name[i];

                // Set target attribute.
                elem.setAttribute(TabContainer.attr().target, this.target[i]);

                // Add CSS classes:
                elem.classList.add(TabContainer.css().class);
                if (i === 1)
                    elem.classList.add(TabContainer.css().borderRadius.topLeft);

                // Add event listeners.
                //elem.addEventListener('mouseenter', this.btn_onMouseEnter);
                //elem.addEventListener('mouseleave', this.btn_onMouseLeave);
                elem.addEventListener('click', this.btn_onClick);

                // Append node.
                this.appendChild(elem);
            }

            // Set active state attribute.
            TabContainer.setActive(this.firstElementChild, true);

        }

    }




    // ** Event listener function: On click **
    btn_onClick(){

        TabContainer.flushState(this.parentNode);
        TabContainer.flushClass(this.parentNode);
        TabContainer.setActive(this, true);

        if (TabContainer.hasPrevSibling(this))
            TabContainer.addClass(this.previousElementSibling, TabContainer.css().borderRadius.topRight);

        if (TabContainer.hasNextSibling(this))
            TabContainer.addClass(this.nextElementSibling, TabContainer.css().borderRadius.topLeft);

        let page = document.getElementById(TabContainer.getTarget(this));
        let pages = document.getElementsByTagName('tab-page');

        for (let i=0; i<pages.length; i++){
            tb.showNode(pages[i], false);
        }

        tb.showNode(page, true);

    }




    // ** Check if attribute is defined **
    static attrDefined(node, attr){

        if (node.hasAttribute(attr))
            return node.getAttribute(attr).length > 0;
        else return false;

    }

    static flushState(parentNode) {
        let children = parentNode.children;
        for (let i = 0; i < children.length; i++)
            children[i].removeAttribute('data-state');
    }

    static setActive(node, boolean){
        if (typeof boolean === 'boolean'){
            if (boolean)
                node.setAttribute('data-state', 'active');
        }
    }

    static getTarget(node){
        if (TabContainer.attrDefined(node, TabContainer.attr().target))
            return node.getAttribute(TabContainer.attr().target);
    }

    static isActive(node){
        if (node.hasAttribute('data-state'))
            return node.getAttribute('data-state') === 'active';
        else return false;
    }

    static nodeExist(node){
        return node != null;
    }

    static resetClass(node){
        node.removeAttribute('class');
        node.setAttribute('class','tab-btn');
    }

    static addClass(node, className){
        node.classList.add(className);
    }

    static flushClass(parentNode){
        if (parentNode.childElementCount > 0){
            for (let i=0; i<parentNode.childElementCount; i++){
                TabContainer.resetClass(parentNode.children[i]);
            }
        }
    }

    static hasPrevSibling(node){
        return node.previousElementSibling != null;
    }

    static hasNextSibling(node){
        return node.nextElementSibling != null;
    }

}