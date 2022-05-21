import { linkInputStateSend } from "./customEvents.js";
import { addDragMethod } from "./drag.js";
export class Diod {
    links?: Array<any>;
    state: boolean;
    element: HTMLDivElement;
    id: number;

    constructor(id: number){
        this.state = false;
        this.links = [];
        this.id = id;
        this.element = this.createElement();
        this.addDiodEventListeners();
    }
    changeDiodState(ths: HTMLDivElement){ //ths instead of this to prevent some bugs
            ths.classList.toggle("diod-on");
            this.state = !this.state;
            if(this.links){
                for(const inp of this.links){ 
                    this.stateSend(inp.src);
                }
            }

        // ths.dataset.state = (( 'false' === this.element.dataset.state)).toString();
    }
    stateSend(inpToSendTo: Element){
        inpToSendTo.dispatchEvent(linkInputStateSend(this.state));
    }
    addDiodEventListeners(){
        addDragMethod(this.element, (ev: MouseEvent, ths: HTMLDivElement) => {
        // if(!document.querySelector(".input-choose")){ //to prevent clicking when selected as input
            this.changeDiodState(ths);
        // }
        }, this.element); //arg that points to this

        this.element.addEventListener('linkInput', (ev: any) => {
            if(ev.detail){
                this.links.push(ev.detail);
                this.setBorderColor();
                this.stateSend(ev.detail.src);
                // console.log('sent state (list): ',this.state);
            }
        })
        this.element.addEventListener('unlinkInput', (ev: any) => {
            this.links = this.links.filter((link) => {
                return link.src.id !== ev.detail.id;
            });
            
            this.links.length ? this.setBorderColor() : this.element.style.background = "";
        })
    }
    private createElement(){
        const el = document.createElement("div");
        el.classList.add("diod-element");
        el.id = "diod-" + this.id;
        el.style.zIndex = '1';
        el.dataset.state = this.state.toString();
        this.element = el;
        return el;
    }
    setBorderColor(){
        const colorSpace = Math.ceil(100 / this.links.length);
        let finalColor = `linear-gradient(to bottom, `;
        for(const [i, link] of this.links.entries()){
            
            finalColor += `${link.color} ${colorSpace*(i)}%, ${link.color} ${colorSpace*(i+1)}%, `;
        }
        finalColor = finalColor.slice(0,-2);
        this.links.length===1 ? finalColor += `, rgb(255,255,255) 0%)`: finalColor += ')';
        
        this.element.style.background = finalColor;
    }
    
}