import {Diod} from './diod.js';
import {Menu} from './menu.js';

const board = document.querySelector(".board");
const menuSelectors = {
    diod: document.querySelector(".diod-menu"),
    not: document.querySelector(".gate-not-menu"),
    and: document.querySelector(".gate-and-menu"),
    or: document.querySelector(".gate-or-menu"),
}
const menu = new Menu(menuSelectors.diod, menuSelectors.not, menuSelectors.and, menuSelectors.or, board, {x:50 ,y:50});
