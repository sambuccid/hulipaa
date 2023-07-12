import EL from '../EL.js'
import { clearDiv } from '../ui-helpers.js';

export const CLASS_NAME = "hulipaa_paginations_buttons"

export function addElements(searchDiv,{ hidden }) {
    const buttonsDiv = EL.div({
        className: CLASS_NAME
    });

    if (!hidden)
        showContainer(buttonsDiv)
    else
        hideContainer(buttonsDiv)

    searchDiv.appendChild(buttonsDiv)
    return { element: buttonsDiv }
}

export function showContainer(paginateButtonsContainer) {
    paginateButtonsContainer.style.display = 'revert'
}

export function hideContainer(paginateButtonsContainer) {
    paginateButtonsContainer.style.display = 'none'
}

export function clear(paginateButtonsContainer) {
    clearDiv(paginateButtonsContainer)
}