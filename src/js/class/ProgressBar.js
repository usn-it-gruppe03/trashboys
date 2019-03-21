export class ProgressBar extends HTMLElement {

    constructor(){
        super();
        this.check();
        this.populate();
    }

    static attr(){
        return {
            percent: 'data-percent',
            days: 'data-text',
        };
    }

    check(){

        // * Check if attributes are defined:
        let percentDefined = (this.attrDefined(ProgressBar.attr().percent));
        let daysDefined = (this.attrDefined(ProgressBar.attr().days));

        // * Set object attributes:
        this.percent = percentDefined ? this.getAttribute(ProgressBar.attr().percent) : 0;
        this.text = daysDefined ? this.getAttribute(ProgressBar.attr().days) : 0;
    }

    populate(){

        // * Init. elements:
        let bar = document.createElement('div');
        let text = document.createElement('p');

        // * Init. the inner text:
        text.innerText = this.text;

        // * Set the progress bar's width.
        bar.style.width = (this.percent * 100) + '%';

        // * Append nodes to main this object.
        this.append(bar, text);
    }

    attrDefined(attr){
        if (this.hasAttribute(attr))
            return this.getAttribute(attr).length > 0;
        else return false;
    }

}