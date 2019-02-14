import * as tb from "../function/global/functions.js";

export class TabContainer extends HTMLElement {

    constructor(){
        super();
        this.dataCheck();
        this.populate();
    }




    /**
     * Standard attributes.
     *
     * @description This static function holds all standard
     * attributes used in this element.
     * */
    static attr(){
        return {
            name: 'data-tab-names',
            target: 'data-tab-targets'
        }
    }




    /**
     * CSS classes.
     *
     * @description This static function holds all standard
     * CSS classes used in this element.
     * */
    static css(){
        return{
            main: 'tab-btn',
            borderRadius: {
                topLeft: 'tab-btn-br-tl',
                topRight: 'tab-btn-br-tr',
            }
        }
    }




    /**
     * Data check.
     *
     * @description This function checks whether data attributes
     * have been properly defined.
     * */
    dataCheck(){

        // ? If name attribute is defined.
        if (tb.attrDefined(this, TabContainer.attr().name))
            this.name = this.getAttribute(TabContainer.attr().name).split(';');

        // ? If target attribute is defined.
        if (tb.attrDefined(this, TabContainer.attr().target))
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
                elem.classList.add(TabContainer.css().main);
                if (i === 1)
                    elem.classList.add(TabContainer.css().borderRadius.topLeft);

                // Add event listener.
                elem.addEventListener('click', this.btn_onClick);

                // Append node.
                this.appendChild(elem);
            }

            // Set active state attribute.
            TabContainer.setActive(this.firstElementChild, true);

        }

    }




    /**
     * Event listener function: On click.
     *
     * @description This function will manipulate elements
     * when clicked.
     * */
    btn_onClick(){

        // Flush data state attributes of all siblings.
        TabContainer.flushState(this.parentNode);

        // Flush CSS classes of all siblings.
        TabContainer.flushClass(this.parentNode);

        // Set this button as active.
        TabContainer.setActive(this, true);

        // ? If this node has previous siblings.
        if (tb.hasPrevSibling(this))
            TabContainer.addClass(this.previousElementSibling, TabContainer.css().borderRadius.topRight);

        // ? If this node has next siblings.
        if (tb.hasNextSibling(this))
            TabContainer.addClass(this.nextElementSibling, TabContainer.css().borderRadius.topLeft);

        // Get tab page corresponding with this node's id.
        let page = document.getElementById(TabContainer.getTarget(this));

        // Fetch all tab pages.
        let pages = document.getElementsByTagName('tab-page');

        // Loop through all tab pages.
        for (let i=0; i<pages.length; i++){

            // Hide current element.
            tb.showNode(pages[i], false);
        }

        // Show clicked page.
        tb.showNode(page, true);

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
        if (tb.attrDefined(node, TabContainer.attr().target))
            return node.getAttribute(TabContainer.attr().target);
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

}