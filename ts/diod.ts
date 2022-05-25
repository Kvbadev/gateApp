import { linkInputStateSend } from "./customEvents.js";
import { addDragMethod } from "./drag.js";
export class Diod {
    links?: Array<any>;
    state: boolean;
    element: HTMLDivElement;
    id: number;
    immutable: boolean;

    constructor(id: number){
        this.state = false;
        this.links = [];
        this.id = id;
        this.element = this.createElement();
        this.immutable = false;
        this.addDiodEventListeners();
    }
    changeDiodState(state?: boolean){ //ths instead of this to prevent some bugs
        const oldState = this.state;
        if(state!=undefined){ //to change state directly, usually when diod is output element
            this.state = state;
            this.state ? this.element.classList.add("diod-on") : this.element.classList.remove("diod-on");
        } else {
            if(!this.immutable){ //if diod is not an output element
                this.element.classList.toggle("diod-on");
                this.state = !this.state;
            } else {
                console.log(this.state);
            }
        }
        for(const inp of this.links){ 
            if(!inp.isOutput){
                this.stateSend(inp.src);
            }
        }
    }
    stateSend(inpToSendTo: Element){
        inpToSendTo.dispatchEvent(linkInputStateSend(this.state, this.element.id));
    }
    addDiodEventListeners(){
        addDragMethod(this.element, (ev: MouseEvent) => {
            this.changeDiodState(); //onclick
        });

        this.element.addEventListener('linkDiod', (ev: any) => {
            if(ev.detail){
                if(ev.detail.isOutput && !this.immutable){
                    this.immutable = true;
                    this.links.push(ev.detail);
                    this.changeDiodState(false);
                    this.setBackgroundColor();
                } else if(!ev.detail.isOutput){
                    this.links.push(ev.detail);
                    this.stateSend(ev.detail.src);
                    this.setBackgroundColor();
                }
                else{
                    console.log("This diod is already linked as an output!");
                }
            }
            
        })
        this.element.addEventListener('sendOutcomeToDiod', (ev: any) => {
            
            if(this.isConnected(ev.detail.id)){
                
                if(ev.detail.outcome!==2){
                    if(ev.detail.outcome !== this.state){
                        this.changeDiodState(ev.detail.outcome)
                    }
                }
            }
        })
        this.element.addEventListener('unlinkDiod', (ev: any) => {

            if(this.isConnected(ev.detail.id)){
                this.links = this.links.filter((link) => {
                    return link.src.id !== ev.detail.id;
                });

                this.links.length ? this.setBackgroundColor() : this.element.style.background = "";
                if(ev.detail.isOutput){
                    this.immutable = false;
                    console.log('output unlinked');
                }
            }
        
        })
    }
    isConnected(id: string){
        for(const link of this.links){
            if(link.src.id === id) return true;
        }
        return false;
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
    setBackgroundColor(){
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