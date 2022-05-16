import { addDragMethod } from "./drag.js";

export class Gate {
    type: "NOT" | "OR" | "AND";
    outcome: boolean;
    element: HTMLDivElement;
    inputs: Array<HTMLDivElement>;
    output: HTMLDivElement;
    id: Number;

    constructor(type: "NOT"|"OR"|"AND",el_id: Number) {
        this.type = type;
        this.id = el_id;
        this.element = this.createElement();
    }
    createElement() {
        const newElem = document.createElement("div");
        newElem.id = `gate${this.type}-`+this.id;
        newElem.classList.add("gate-board");
        // newElem.draggable = false;
        newElem.innerHTML = `
        <img src="css/gate${this.type}board.png" draggable="false" class="gate-img">
        `;
        addDragMethod(newElem, () => console.log("kd"));

        return newElem;
    }
}

export type gateType = "NOT" | "OR" | "AND";