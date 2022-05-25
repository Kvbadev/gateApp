import { addDragMethod } from "./drag.js";
import {linkDiod, sendOutcomeToDiod, unlinkDiod} from "./customEvents.js";
import { getGateInfo } from "./gatesInfo.js";

export class Gate {
    type: "NOT" | "OR" | "AND" | "NAND";
    outcome: 0|1|2;
    element: HTMLDivElement;
    inputs: Array<any>;
    output: any;
    id: Number;
    color: any;

    constructor(type: "NOT"|"OR"|"AND"|"NAND",el_id: Number) {
        this.type = type;
        this.id = el_id;
        this.element = this.createElement();
        this.outcome = 2;
        this.setInputsOutputsInfo();
    }

    createElement() { //creates newDiv (which is div that stores color and image elements) and two above-mentioned elements, it also adds event listeners and returns prepared element
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
        this.color = `rgb(${(new Date).getTime()*Math.random()& 255}, ${(new Date).getTime()*Math.random() & 255}, ${(new Date).getTime()*Math.random() & 255})`;
        
        divColor.style.backgroundColor = this.color;
        divColor.draggable = false;

        newDiv.append(divImg, divColor);
        
        addDragMethod(newDiv, (ev: MouseEvent, gate: Gate) => { //(element to which drag method should be added, onclick function of that element)

            ev.stopPropagation(); //to prevent event chain
            const IOnum = gate.wasIOclicked(ev.x, ev.y, gate);
            if(IOnum!==3){

                if(IOnum===2){ //2 means output point

                    if(this.output.outSrc){
                        this.output.outSrc.dispatchEvent(unlinkDiod(this.element.id, true)); //true because we unlink output diod
                        this.output.outSrc = null;
                    }
                    this.addSelectElementReminder();
                    this.addOutput();

                }
                else {
                    if(this.inputs[IOnum].inpSrc){
                        this.inputs[IOnum].inpSrc.dispatchEvent(unlinkDiod(this.element.id));
                        this.inputs[IOnum].inpSrc = null;
                        this.inputs[IOnum].inpState = 2;
                        this.calcOutcome();
                    }
                    this.addSelectElementReminder();
                    this.addInput(IOnum);
                }

            } else {
                console.log(this.outcome);
            }
        }, this);

        newDiv.addEventListener('linkInputStateSend', (ev:any) => {
            
            if(this.inputs[0].inpSrc!=null && this.inputs[0].inpSrc.id === ev.detail.id){
                this.inputs[0].inpState = ev.detail.state;  //if inp[0] does not exist or has other id, then latter one has to be event dispatcher
            } else {
                this.inputs[1].inpState = ev.detail.state;
            }
            this.calcOutcome();
            
            if(this.output.outSrc){
                this.output.outSrc.dispatchEvent(sendOutcomeToDiod(this.element.id, this.outcome));
            }
        });
        newDiv.addEventListener('deleteElement', () => {
            this.inputs.forEach( (input, i) => {
                if(input.inpSrc){
                    input.inpSrc.dispatchEvent(unlinkDiod(newDiv.id));
                }
            })
            if(this.output.outSrc){
                this.output.outSrc.dispatchEvent(unlinkDiod(newDiv.id, true));
            }
            newDiv.remove();
        })
        newDiv.addEventListener('diodRemoved', (ev: any) => {
            console.log(this.output, this.inputs);
            this.inputs.forEach( (input, i) => {
                if(input.inpSrc){
                    console.log(ev.detail.id, input.inpSrc.id);
                    if(input.inpSrc.id === ev.detail.id){
                        input.inpSrc = null;
                        input.inpState = 2;
                    }
                }
            })
            this.calcOutcome();
            if(this.output.outSrc!==null){
                this.output.outSrc.dispatchEvent(sendOutcomeToDiod(this.element.id, this.outcome));
                
                if(this.output.outSrc.id === ev.detail.id){
                    this.output.outSrc = null;
                }
            }
        })
        
        return newDiv;
    }
    addSelectElementReminder(){ //appends little label 'input' to the document's body
        const el = document.createElement("div");
        el.classList.add("select-mode-reminder");
        el.innerText = "select";
        document.body.append(el);
    }

    wasIOclicked(evX:Number, evY:Number, gate: Gate){ //returns index of input in which mouseEvent was fired or number 3
        //TODO: if input is in use, detach previous input and remove it and then add new input
        let sLen = gate.output.outCenter.sideLen;
        let pointOffsetX = gate.output.outCenter.outOffsetX;
        let pointOffsetY = gate.output.outCenter.outOffsetY;
        let gatePointCenter = {x: gate.element.getBoundingClientRect().left+pointOffsetX, y: gate.element.getBoundingClientRect().top+pointOffsetY};

        if(evX >= gatePointCenter.x-sLen && evX <= gatePointCenter.x+sLen && evY >= gatePointCenter.y-sLen && evY <= gatePointCenter.y+sLen){
            return 2;
        }

        for(const [i,input] of gate.inputs.entries()){
            
            pointOffsetX = input.inpCenter.inpOffsetX;
            pointOffsetY = input.inpCenter.inpOffsetY;
            gatePointCenter = {x: gate.element.getBoundingClientRect().left+pointOffsetX, y: gate.element.getBoundingClientRect().top+pointOffsetY};
            sLen = input.inpCenter.sideLen;
            
            if(evX >= gatePointCenter.x-sLen && evX <= gatePointCenter.x+sLen && evY >= gatePointCenter.y-sLen && evY <= gatePointCenter.y+sLen){
                return i;
            }
        }
        return 3;
    }

    addInput(inpNum: number){ //append new diod to this.inputs

        document.onclick = (ev: MouseEvent) => {
            
            const tmpTarget = ev.target as HTMLDivElement;
            if(this.isAlreadyListed(tmpTarget.id)){
                console.log("Element already selected by either input or output!");

            } else {

                if(tmpTarget.classList.contains("diod-element")){
                    
                    this.inputs[inpNum].inpSrc = tmpTarget;

                    tmpTarget.dispatchEvent(linkDiod(this.element, this.color));
                }
            }
                
            document.body.removeChild(document.querySelector(".select-mode-reminder"));
            document.onclick = null;
        }
    }

    isAlreadyListed(id: string){
        if(this.output.outSrc){
            if(this.output.outSrc.id === id) return true;
        }
        for(const inp of this.inputs){
            if(inp.inpSrc){
                if(inp.inpSrc.id === id) return true;
            }
        }
        return false;
    }

    addOutput(){

        document.onclick = (ev: MouseEvent) => {

            const tmpTarget = ev.target as HTMLDivElement;
            if(this.isAlreadyListed(tmpTarget.id)){
                console.log("Element already selected by either input or output!");
                
            } else {
                if(tmpTarget.classList.contains("diod-element")){
                    
                    this.output.outSrc = tmpTarget;
                    tmpTarget.dispatchEvent(linkDiod(this.element, this.color, true));
                    tmpTarget.dispatchEvent(sendOutcomeToDiod(this.element.id, this.outcome));
                }
            }
            document.body.removeChild(document.querySelector(".select-mode-reminder"));
            document.onclick = null;
        }
    }

    calcOutcome(){ //checks if any input is connected and if so what is their state to calculate output depending on gate
        let out;
        if(this.type === "NOT"){
            out = (this.inputs[0].inpState == 1) ? 0:1;
            this.outcome = out;
        } else if(this.type === "OR"){
            out = (this.inputs[0].inpState == 1 || this.inputs[1].inpState == 1) ? 1 : 0;
            this.outcome = out;
        } else if(this.type === "AND"){
            out = (this.inputs[0].inpState == 1 && this.inputs[1].inpState == 1) ? 1 : 0;
            this.outcome = out;
        } else if(this.type === "NAND"){
            out = (this.inputs[0].inpState == 0 || this.inputs[1].inpState == 0) ? 1 : 0;
            this.outcome = out;
        }
    }
    setInputsOutputsInfo(){ //sets initial inputs info
        ([this.inputs,this.output] = getGateInfo(this.type));
    }
}

export type gateType = "NOT" | "OR" | "AND" | "NAND";