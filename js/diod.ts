import { linkInputStateSend } from "./customEvents.js";
import { addDragMethod } from "./drag.js";
export class Diod {
    links?: Array<Element>;
    state: boolean;
    element: HTMLDivElement;
    id: number

    constructor(id: number){
        this.state = false;
        this.links = [];
        this.id = id;
        this.element = this.createElement();
        this.addDiodEventListeners();
    }
    changeDiodState(ths: HTMLDivElement){ //ths instead of this to prevent some bugs
        if(!document.querySelector(".input-choose")){ //to prevent clicking when selected as input
            ths.classList.toggle("diod-on");
            this.state = !this.state;
            if(this.links){
                for(const inp of this.links){ 
                    this.stateSend(inp);
                }
            }
        }

        // ths.dataset.state = (( 'false' === this.element.dataset.state)).toString();
    }
    stateSend(inpToSendTo: Element){
        inpToSendTo.dispatchEvent(linkInputStateSend(this.state));
    }
    addDiodEventListeners(){
        addDragMethod(this.element, (ev: MouseEvent, ths: HTMLDivElement) => {
            this.changeDiodState(ths);

        }, this.element); //arg that points to this
        this.element.addEventListener('linkInput', (ev: any) => {
            if(ev.detail){
                this.links[this.links.length] = ev.detail;
                this.stateSend(ev.detail);
                console.log('sent state (list): ',this.state);
                
            }
        })
    }
    private createElement(){
        const el = document.createElement("div");
        el.classList.add("diod-element");
        el.id = "diod-" + this.id;
        el.dataset.state = this.state.toString();
        this.element = el;
        return el;
    }
}