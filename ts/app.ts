import {Menu} from './menu.js';

const Selectors = {
    board: document.querySelector(".board"),
    diod: document.querySelector(".diod-menu"),
    not: document.querySelector(".gate-not-menu"),
    and: document.querySelector(".gate-and-menu"),
    or: document.querySelector(".gate-or-menu"),
}
// document.addEventListener('mousemove', ev => {console.log(ev.x, ev.y)});

const menu = new Menu(Selectors.diod as HTMLDivElement, Selectors.not as HTMLDivElement, Selectors.and as HTMLDivElement, Selectors.or as HTMLDivElement, Selectors.board, {x:50 ,y:50});