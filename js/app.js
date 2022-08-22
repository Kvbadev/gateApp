import { Menu } from './menu.js';
document.ondragstart = function () { return false; };
const Selectors = {
    board: document.querySelector(".board"),
    diod: document.querySelector(".diod-menu"),
    not: document.querySelector(".gate-not-menu"),
    and: document.querySelector(".gate-and-menu"),
    or: document.querySelector(".gate-or-menu"),
    nand: document.querySelector(".gate-nand-menu"),
};
// document.addEventListener('mousemove', ev => {console.log(ev.x, ev.y)});
const menu = new Menu(Selectors.diod, Selectors.not, Selectors.and, Selectors.or, Selectors.nand, Selectors.board, { x: 50, y: 50 });
