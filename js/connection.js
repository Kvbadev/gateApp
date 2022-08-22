// export class Connection{
//     f: any;
//     s: any;
//     constructor(elem1, elem2) {
//         this.f = elem1;
//         this.s = elem2; 
//     }
export function start() {
    document.onmousemove = (ev) => {
        console.log(ev.x, ev.y);
    };
}
export function finish() {
    document.onmousemove = null;
}
// }
