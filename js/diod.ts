export class Diod {
    link?: string;
    state: boolean;
    element: HTMLDivElement;
    id: number

    constructor(id: number){
        this.state = false;
        this.link = null;
        this.id = id;
        this.element = this.getElement();
        this.addDiodEventListeners();
    }
    changeDiodState(diod: Diod){
        return () => {
            !diod.state;
            diod.element.classList.toggle("diod-on");
        }
    }
    // getDiodInfo(){
    //     return this;
    // }
    addDiodEventListeners(){
        this.element.addEventListener('click', this.changeDiodState(this));
        this.element.addEventListener('dragstart', (e : DragEvent) => {
            e.dataTransfer.setData("text/plain", `${this.id}`);
        })
    }
    private getElement(){
        const el = document.createElement("div");
        el.classList.add("diod-element");
        el.id = this.id.toString();
        el.setAttribute('draggable', 'true');
        this.element = el;
        return el;
    }
}