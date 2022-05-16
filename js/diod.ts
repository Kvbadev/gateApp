import { addDragMethod } from "./drag.js";
export class Diod {
    link?: string;
    state: boolean;
    element: HTMLDivElement;
    id: number

    constructor(id: number){
        this.state = false;
        this.link = null;
        this.id = id;
        this.element = this.createElement();
        this.addDiodEventListeners();
    }
    changeDiodState(ths: HTMLDivElement){ //ths instead of this to prevent some bugs
        ths.classList.toggle("diod-on");
        ths.dataset.state = (( 'false' === this.element.dataset.state)).toString();
    }
    addDiodEventListeners(){
        addDragMethod(this.element, (ths: HTMLDivElement) => {
            this.changeDiodState(ths);
        }, this.element); //arg that points to this
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