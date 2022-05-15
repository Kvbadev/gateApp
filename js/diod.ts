export class Diod {
    link?: string;
    state: boolean;
    element: HTMLDivElement;
    id: number

    constructor(id: number){
        this.state = false;
        this.link = null;
        this.id = id;
        this.element = this.createElement();
        this.addDiodEventListeners();
    }
    changeDiodState(diod: Diod){
        return () => {
            !diod.state;
            diod.element.classList.toggle("diod-on");
            this.element.dataset.state = (( 'false' === this.element.dataset.state)).toString();
            console.log(this.element.dataset.state);
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
    private createElement(){
        const el = document.createElement("div");
        el.classList.add("diod-element");
        el.id = this.id.toString();
        el.setAttribute('draggable', 'true');
        el.dataset.state = this.state.toString();
        this.element = el;
        return el;
    }
}