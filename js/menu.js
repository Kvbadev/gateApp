import { Diod } from "./diod.js";
import { Gate } from './gate.js';
export class Menu {
    constructor(diodBTN, notBTN, andBTN, orBTN, nandBTN, board, spawnPoint) {
        this.diodField = diodBTN;
        this.notField = notBTN;
        this.andField = andBTN;
        this.orField = orBTN;
        this.nandField = nandBTN;
        this.board = board;
        this.elementsSpawnpoint = spawnPoint;
        this.elements = [this.diodField, this.notField, this.andField, this.orField, this.nandField];
        this.elements.forEach(element => {
            let count = 0;
            element.addEventListener('click', (ev) => {
                if (!document.querySelector(".input-choose")) { //to prevent normal behavior when waiting for a new input
                    let newElem;
                    element.classList.contains("diod-menu") ? newElem = (new Diod(count++)).element : newElem = (new Gate(element.dataset.type, count++)).element;
                    newElem.style.left = this.elementsSpawnpoint.x + 'px';
                    newElem.style.top = this.elementsSpawnpoint.y + 'px';
                    document.body.appendChild(newElem);
                    // console.log(newElem);
                }
            });
        });
    }
}
