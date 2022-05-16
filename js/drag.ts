export function addDragMethod(element: HTMLDivElement, onClickFunc: Function, ...onClickFuncArgs: any){
    let clickTime;
    element.addEventListener('mousedown', (ev: MouseEvent) => {
        element.style.zIndex = "1000";
        
        clickTime = new Date().getTime(); //to prevent changing state when dragging
        const allowedClasses = ["board", "gate-board", "diod-element", "gate-img"];
        
        function moveAt(pageX, pageY){
            element.style.left = pageX - element.offsetWidth / 2 + 'px';
            element.style.top = pageY - element.offsetHeight / 2 + 'px';
        }

            
        function isAllowed(elBelow: Element, tab: Array<any>){
            for(const el of tab){
                if(elBelow.classList.contains(el)){ 
                    return true;
                }
            }
            return false;
        }

        const onMouseMove = (ev: MouseEvent) => {
            moveAt.call(this, ev.x, ev.y);
            
            element.hidden = true; //because item is always element below cursor
            let elementBelow = document.elementFromPoint(ev.clientX,ev.clientY);
            element.hidden = false;

            const wrongPos = (x:number, y:number, fire = true) => {
                if(fire){
                    element.dispatchEvent(new Event("mouseup"));
                }
                moveAt.call(this, x, y);
            }
            
            if(!elementBelow){ 
                wrongPos(ev.x+5, ev.y+5);
            }
            else if(!isAllowed(elementBelow, allowedClasses)){
                wrongPos(ev.x-15, ev.y);
            }
            
        }

        document.addEventListener('mousemove', onMouseMove);

        element.onmouseup = (ev: MouseEvent) => {
            element.style.zIndex = "0";
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        }
    })
    element.addEventListener('click', () => {
        if(new Date().getTime()-clickTime < 250){
            onClickFunc(...onClickFuncArgs);
        }
});

};