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
        
        addDragMethod(newDiv, (ev: MouseEvent, gate: Gate) => { //(element to which drag method should be added, onclick function of that element)

            console.log(gate.whichInputClicked(ev.x, ev.y, gate));
            
        }, this);
        
        return newDiv;
    }

    whichInputClicked(evX:Number, evY:Number, gate: Gate){ //returns index of input in which mouseEvent was fired or number 3
        for(const [i,input] of gate.inputs.entries()){
            console.log(gate, input);
            
            const imgOffX = input.inpCenter.imgOffsetX;
            const imgOffY = input.inpCenter.imgOffsetY;
            const gateCenter = {x: gate.element.offsetLeft+imgOffX, y: gate.element.offsetTop+imgOffY};
            const sLen = input.inpCenter.sideLen;

            if(evX >= gateCenter.x-sLen && evX <= gateCenter.x+sLen && evY >= gateCenter.y-sLen && evY <= gateCenter.y+sLen){
                return i;
            }
        }
        return 3;
    }
    setInputsInfo(){  
        if(this.type === "NOT"){
            this.inputs = [
                {
                    src: null,
                    inpCenter: {
                        imgOffsetX: 10,
                        imgOffsetY: 25,
                        sideLen: 9
                    }
                }
            ]
        }
    }
}

export type gateType = "NOT" | "OR" | "AND";