require('es6-promise').polyfill(); // починил слайдер в m.edge 
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modals from './modules/modals';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer ), 50000, );
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimer);
    timer('.timer', '2021-05-01');
    cards();
    calc();
    forms('form', modalTimer);
    slider({
        container:'.offer__slider',
        nextArrow:'.offer__slider-next',
        prewArrow:'.offer__slider-prev',
        slide:'.offer__slide',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner'

    });
}); 