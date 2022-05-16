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
    changeDiodState(){
        this.state = true;
        this.element.classList.toggle("diod-on");
        this.element.dataset.state = (( 'false' === this.element.dataset.state)).toString();
    }
    addDiodEventListeners(){

        let clickTime: any = 0;
        //dragging in js
        this.element.addEventListener('mousedown', (ev: MouseEvent) => {
            clickTime = new Date().getTime(); //to prevent changing state when dragging
            
            function moveAt(pageX, pageY){
                this.element.style.left = pageX - this.element.offsetWidth / 2 + 'px';
                this.element.style.top = pageY - this.element.offsetHeight / 2 + 'px';
            }

            const onMouseMove = (ev: MouseEvent) => {
                moveAt.call(this, ev.x, ev.y);
                console.log(ev.x, ev.y);
                
                const wrongPos = (x:number, y:number) => {
                    this.element.dispatchEvent(new Event("mouseup"));
                    moveAt.call(this, x, y);
                }

                this.element.hidden = true; //because item is always element below cursor
                let elementBelow = document.elementFromPoint(ev.clientX,ev.clientY);
                this.element.hidden = false;

                if(!elementBelow){ 
                    wrongPos(ev.x+5, ev.y+5);
                }

                else if(!(elementBelow.closest('.board'))){
                    wrongPos(ev.x-15, ev.y);
                }

            }

            document.addEventListener('mousemove', onMouseMove);

            this.element.onmouseup = (ev: MouseEvent) => {
                document.removeEventListener('mousemove', onMouseMove);
                this.element.onmouseup = null;
            }
        })

        this.element.addEventListener('click', (ev) => {
            if(new Date().getTime()-clickTime < 250){
                this.changeDiodState();
            }
        });
    }
    private createElement(){
        const el = document.createElement("div");
        el.classList.add("diod-element");
        el.id = this.id.toString();
        el.dataset.state = this.state.toString();
        this.element = el;
        return el;
    }
}