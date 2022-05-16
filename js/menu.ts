import {Diod} from "./diod.js";

export class Menu{
    elements: Array<Element>;
    diodField: Element;
    notField: Element;
    andField: Element;
    orField: Element;
    board: Element;
    elementsSpawnpoint: {x: number, y: number};

    constructor(diodBTN: Element, notBTN: Element, andBTN: Element, orBTN: Element, board: Element, spawnPoint: {x: number, y: number}){
        this.diodField = diodBTN;
        this.notField = notBTN;
        this.andField = andBTN;
        this.orField = orBTN;
        this.board = board;
        this.elementsSpawnpoint = spawnPoint;
        this.elements = [this.diodField,this.notField, this.andField, this.orField];
        this.elements.forEach(element => {
            let count = 0;
            element.addEventListener('click', (ev : MouseEvent) => {
                if(element.classList.contains("diod-menu")){
                    const newElem = (new Diod(count++)).element;
                    newElem.style.left = this.elementsSpawnpoint.x + 'px';
                    newElem.style.top = this.elementsSpawnpoint.y + 'px';
                    document.body.appendChild(newElem)
                    console.log(newElem);
                    
                } else {
                    const newElem = document.createElement("div");
                    newElem.innerHTML = element.innerHTML;
                    newElem.id = `${element.classList[0].slice(0, element.classList[0].lastIndexOf("menu"))}board-${count++}"`;
                    //TODO: dragging in js instead of html
                    //TODO: class for logic gate instead of hardcoded element
                    newElem.style.left = this.elementsSpawnpoint.x + 'px';
                    newElem.style.top = this.elementsSpawnpoint.y + 'px';
                    newElem.classList.add("gate-board");
                    console.log(newElem);
                    newElem.addEventListener('click', (ev: MouseEvent) => {
                    //TODO: selecting specific part of image to activate linking
                    // console.log(ev.x, ':',newElem.style.left, ev.y,':', newElem.style.left);
                    // if(ev.y-24+'px' == newElem.style.top && ev.x-2+'px' == newElem.style.top){
                    //     console.log('x');
                    // }
                        
                    })
                    document.body.appendChild(newElem);
                }
            })
        });
    }
}