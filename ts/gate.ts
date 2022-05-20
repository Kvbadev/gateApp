import { addDragMethod } from "./drag.js";
import {linkInput} from "./customEvents.js";
import { Diod } from "./diod.js";

export class Gate {
    type: "NOT" | "OR" | "AND";
    outcome: 0|1|2;
    element: HTMLDivElement;
    inputs: Array<any>;
    output: HTMLDivElement;
    id: Number;
    color: any;

    constructor(type: "NOT"|"OR"|"AND",el_id: Number) {
        this.type = type;
        this.id = el_id;
        this.element = this.createElement();
        this.outcome = 2;
        this.color = 0;
        this.setInputsInfo();
    }

    createElement() {
        const newDiv = document.createElement("div");
        newDiv.id = `gate${this.type}-`+this.id;
        newDiv.classList.add("gate-board");
        newDiv.draggable = false;

        const divImg = document.createElement("img");
        divImg.classList.add("gate-img");
        divImg.draggable = false;
        divImg.src = `css/gate${this.type}board.png`;

        const divColor = document.createElement("div");
        divColor.classList.add("gate-color");
        (new Date).getTime();
        this.color = `hsla(${(Math.random()* (new Date).getTime()%361)}, 100%, 50%, 1)`;
        divColor.style.backgroundColor = this.color;
        divColor.draggable = false;

        newDiv.append(divImg, divColor);
        
        addDragMethod(newDiv, (ev: MouseEvent, gate: Gate) => { //(element to which drag method should be added, onclick function of that element)

            ev.stopPropagation();
            const inpNum = gate.whichInputClicked(ev.x, ev.y, gate);
            if(inpNum!==3){
                this.addInputElReminder();
                this.addInput(inpNum);
            } else {
                console.log(this.outcome);
            }
            
        }, this);
        
        return newDiv;
    }
    addInputElReminder(){
        const el = document.createElement("div");
        el.classList.add("input-choose");
        el.innerText = "input";
            document.body.append(el);
    }

    whichInputClicked(evX:Number, evY:Number, gate: Gate){ //returns index of input in which mouseEvent was fired or number 3
        for(const [i,input] of gate.inputs.entries()){
            
            const imgOffX = input.inpCenter.imgOffsetX;
            const imgOffY = input.inpCenter.imgOffsetY;
            const gateCenter = {x: gate.element.getBoundingClientRect().left+imgOffX, y: gate.element.getBoundingClientRect().top+imgOffY};
            const sLen = input.inpCenter.sideLen;

            if(evX >= gateCenter.x-sLen && evX <= gateCenter.x+sLen && evY >= gateCenter.y-sLen && evY <= gateCenter.y+sLen){
                return i;
            }
        }
        return 3;
    }

    addInput(inpNum: number){

        document.onclick = (ev: MouseEvent) => {
            ev.stopPropagation();
            
            const tmpTarget = ev.target as HTMLDivElement;

            if(tmpTarget.classList.contains("diod-element")){
                
                if(!this.inputs[0].inpSrc){
                    this.inputs[0].inpSrc = tmpTarget;

                    this.element.addEventListener('linkInputStateSend', (ev:any) => {
                        // console.log('received state: ', this.element.id,ev.detail.state);
                        this.inputs[0].inpState = ev.detail.state; //listening for event linkInputStateSend which is fired when diod's state is changing
                        this.calcOutput();
                    });
                }
                tmpTarget.dispatchEvent(linkInput(this.element, this.color));
            }
            document.body.removeChild(document.querySelector(".input-choose"));
            document.onclick = null;
        }
    }
    calcOutput(){
        if(this.type === "NOT"){
            this.outcome = !this.inputs[0].inpState as unknown as 0|1|2;
        }
    }
    setInputsInfo(){  
        if(this.type === "NOT"){
            this.inputs = [
                {
                    inpSrc: null,
                    inpCenter: {
                        imgOffsetX: 10,
                        imgOffsetY: 25,
                        sideLen: 9
                    },
                    inpState: null
                }
            ]
        }
    }
}

export type gateType = "NOT" | "OR" | "AND";