export class Diod {
    readonly source: Element;
    link?: string;
    state: boolean;

    constructor(src: Element){
        this.source = src;
        this.state = false;
        this.link = null;
        this.addDiodEventListeners();
    }
    changeDiodState(diod: Diod){
        return () => {
            !diod.state;
            diod.source.classList.toggle("diod-on");
        }
    }
    moveDiod(diod: Diod, event: Event){

    }
    addDiodEventListeners(){
        this.source.addEventListener('click', this.changeDiodState(this));
        this.source.addEventListener('dragstart', (e : DragEvent) => {
            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.setData("text/plain", `.${this.source.classList}`);
        })
    }
}