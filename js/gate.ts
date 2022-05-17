import { addDragMethod } from "./drag.js";

export class Gate {
    type: "NOT" | "OR" | "AND";
    outcome: boolean;
    element: HTMLDivElement;
    inputs: Array<any>;
    output: HTMLDivElement;
    id: Number;

    constructor(type: "NOT"|"OR"|"AND",el_id: Number) {
        this.type = type;
        this.id = el_id;
        this.element = this.createElement();
        this.setInputsInfo();
    }
    createElement() {
        const newDiv = document.createElement("div");
        newDiv.id = `gate${this.type}-`+this.id;
        newDiv.classList.add("gate-board");
        const divImg = document.createElement("img");
        divImg.classList.add("gate-img");
        divImg.draggable = false;
        divImg.src = `css/gate${this.type}board.png`;
        newDiv.append(divImg);
        
        addDragMethod(newDiv, (ev: MouseEvent, gate: Gate) => {
            let cord = gate.getInputsCords(gate);
            console.log(cord);
            console.log(ev.x, ev.y);
            
            if(ev.pageX === cord.x && ev.pageY === cord.y){
                console.log('x');
            }
            
        }, this);
        
        return newDiv;
    }
    getInputsCords(gate: Gate){  //gate arg because of problems with 'this' in objects
        if(gate.type === "NOT"){
            
            return {x : gate.element.offsetLeft + gate.inputs[0].inpCenter.imgOffsetX, y: gate.element.offsetTop + gate.inputs[0].inpCenter.imgOffsetY};
        }
    }
    setInputsInfo(){  
        if(this.type = "NOT"){
            this.inputs = [
                {
                    src: null,
                    inpCenter: {
                        imgOffsetX: 10,
                        imgOffsetY: 25
                    }
                }
            ]
        }
    }
}

export type gateType = "NOT" | "OR" | "AND";