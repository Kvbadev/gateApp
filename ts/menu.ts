import {Diod} from "./diod.js";
import {Gate, gateType} from './gate.js';

export class Menu{
    elements: Array<HTMLDivElement>;
    diodField: HTMLDivElement;
    notField: HTMLDivElement;
    andField: HTMLDivElement;
    orField: HTMLDivElement;
    nandField: HTMLDivElement;
    board: Element;
    elementsSpawnpoint: {x: number, y: number};

    constructor(diodBTN: HTMLDivElement, notBTN: HTMLDivElement, andBTN: HTMLDivElement, orBTN: HTMLDivElement, nandBTN: HTMLDivElement, board: Element, spawnPoint: {x: number, y: number}){
        this.diodField = diodBTN;
        this.notField = notBTN;
        this.andField = andBTN;
        this.orField = orBTN;
        this.nandField = nandBTN;
        this.board = board;
        this.elementsSpawnpoint = spawnPoint;
        this.elements = [this.diodField,this.notField, this.andField, this.orField, this.nandField];
        this.elements.forEach(element => {

            let count = 0;
            element.addEventListener('click', (ev : MouseEvent) => {
                if(!document.querySelector(".input-choose")){ //to prevent normal behavior when waiting for a new input
                    let newElem;
                    element.classList.contains("diod-menu") ? newElem = (new Diod(count++)).element : newElem = (new Gate(element.dataset.type as gateType, count++)).element;
                    newElem.style.left = this.elementsSpawnpoint.x + 'px';
                    newElem.style.top = this.elementsSpawnpoint.y + 'px';
                    document.body.appendChild(newElem)
                    // console.log(newElem);
                }
            })
        });
    }
}