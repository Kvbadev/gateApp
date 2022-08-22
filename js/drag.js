import { deleteElement } from "./customEvents.js";
export function addDragMethod(element, onClickFunc, ...onClickFuncArgs) {
    let clickTime;
    element.addEventListener('mousedown', (ev) => {
        element.style.zIndex = "1000";
        clickTime = new Date().getTime(); //to prevent changing state when dragging
        const allowedClasses = ["board", "gate-board", "diod-element", "gate-img", "gate-color", "bin", "fa-solid"];
        let shiftX = ev.clientX - element.getBoundingClientRect().left;
        let shiftY = ev.clientY - element.getBoundingClientRect().top;
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
        function isAllowed(elBelow, tab) {
            for (const el of tab) {
                if (elBelow.classList.contains(el)) {
                    return true;
                }
            }
            return false;
        }
        let elementBelow;
        const onMouseMove = (ev) => {
            moveAt(ev.x, ev.y);
            element.hidden = true; //because item is always element below cursor
            elementBelow = document.elementFromPoint(ev.clientX, ev.clientY);
            element.hidden = false;
            const wrongPos = (x, y, fire = true) => {
                if (fire) {
                    element.dispatchEvent(new Event("mouseup"));
                }
                moveAt(x, y);
            };
            if (!elementBelow) {
                wrongPos(ev.x + 5, ev.y + 5);
            }
            else if (!isAllowed(elementBelow, allowedClasses)) {
                wrongPos(ev.x - 15, ev.y, true);
            }
        };
        document.addEventListener('mousemove', onMouseMove);
        element.onmouseup = (ev) => {
            if (elementBelow && elementBelow.classList.contains("fa-dumpster")) {
                element.dispatchEvent(deleteElement());
            }
            else {
                element.style.zIndex = "0";
                document.removeEventListener('mousemove', onMouseMove);
                document.oncontextmenu = null;
                document.onscroll = null;
                element.onmouseup = null;
            }
        };
        document.oncontextmenu = (ev) => {
            moveAt(ev.x, ev.y);
            element.dispatchEvent(new Event('mouseup'));
        };
        document.onscroll = (ev) => {
            moveAt(ev.x, ev.y);
            element.dispatchEvent(new Event('mouseup'));
        };
    });
    element.onclick = (ev) => {
        if (new Date().getTime() - clickTime < 250) {
            if (!document.querySelector(".select-mode-reminder")) { //to prevent normal behavior when waiting for a new input
                onClickFunc(ev, ...onClickFuncArgs); //first argument of passed function always has to be a MouseEvent even when the function doesn't use it
            }
        }
    };
}
;
