import {events} from '../js.events/events';
import * as dom from '../js.dom/dom';
/**
* @class Collapse
* @classdesc JS collapsable panels
* accordion, expand, and hover panels sd
* @global
*/
class Collapse {
    /**
     * @constructor
     */
    constructor(strEvent, containers) {
        this.eventAction = strEvent;
        this.containers = containers || document.querySelectorAll('.collapse');
        this.elms = [];
        this.activeElms = [];

        for (var i = 0, il = this.containers.length; i<il; i++){
            let container = this.containers[i];
            let type = container.dataset.collapse;
            dom.addClass(container,type);
    
            switch (type){
                case 'collapse--hover':
                    break;
                case 'collapse--expand':
                    this.expand(container,i);
                    break;
                case 'collapse--accordion':
                    this.accordion(container,i);
                    break;
            }
        }
    }
    /**
     * Expand handler
     * @memberOf Collapse
     * @param {object} container Parent .collapse DOM element
     * @param {number} i Index of parent
     */
    expand(container, i) {
        let elms = container.querySelectorAll('.collapse_heading');
        this.elms.push(elms);

        for (var i = 0, il = elms.length; i<il; i++){
            var elm = elms[i];

            events.on(elm,this.eventAction,function() {
                dom.toggleClass(this,'active');
            });
        }
    }
    /**
     * Accordion handler
     * @memberOf Collapse
     * @param {object} container Parent .collapse DOM element
     * @param {number} i Index of parent
     */
    accordion(container, i) {
        let elms = container.querySelectorAll('.collapse_heading');
        this.elms[i] = elms;
        this.activeElms[i] = [];

        for (var n = 0, nl = elms.length; n<nl; n++){
            var elm = elms[n];
            if (dom.hasClass(elm,'active')) {
                this.activeElms[i][n] = elm;
            }
            var _this = this;

            var clicked = function(ii,nn,elem) {
                return function() { 
                    delete _this.activeElms[ii][nn];
                    _this.activeElms[ii].forEach(el => dom.removeClass(el,'active'))
                    dom.toggleClass(elem,'active')
                    _this.activeElms[ii][nn] = elem;
                }
            }(i,n,elm)

            events.on(elm,this.eventAction,clicked);
        }
    }
}

export { Collapse };
