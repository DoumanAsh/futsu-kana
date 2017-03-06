"use strict";

import {look_up_parent_until} from './utils.js';

/**
 * @returns {Function} Callback for 'hashchange' event to initiate Start page.
 * @param {Object} question Object with references to Start form.
 * @param {Object} kana Object with references to kana tables.
 */
export function init_start(question, kana) {
    const question_kanas = [];

    //Adds kanas from column if input is checked.
    const add_column_if = (column) => {
        if (!column.children[0].children[0].checked) return;

        for (let idx = 1; idx < column.children.length; idx += 1) {
            const element = column.children[idx];

            if (/\w+/.test(element.title)) {
                question_kanas.push({
                    kana: element.innerHTML,
                    romaji: element.title
                });
            }
        }
    };

    const init_kanas = () => {
        //Both supposed to have equal length
        const hiragana_columns = kana.hiragana.children;
        const katakana_columns = kana.katakana.children;

        for (let idx = 0; idx < hiragana_columns.length; idx += 1) {
            add_column_if(hiragana_columns[idx]);
            add_column_if(katakana_columns[idx]);
        }
    };

    const random_kana = () => {
        return question_kanas[Math.floor(Math.random() * question_kanas.length)];
    };

    const next_kana = () => {
        let q_kana = random_kana();

        if (q_kana === undefined) return false;

        while (q_kana.romaji === question.answer.innerHTML) q_kana = random_kana();

        question.answer.style.visibility = 'hidden';
        question.answer.innerHTML = q_kana.romaji;
        question.question.innerHTML = q_kana.kana;

        return true;
    };

    const input_on_change = (event) => {
        const expected_text = question.answer.textContent.toLowerCase();
        const value = event.target.value.toLowerCase();

        if (value === expected_text) {
            next_kana();
            event.target.value = '';
            event.target.className = event.target.className.replace(" wrong", "");
        }
        else if (value.length >= expected_text.length) {
            event.target.className += " wrong";
        }
        else {
            event.target.className = event.target.className.replace(" wrong", "");
        }
    };

    const question_hover = () => {
        question.answer.style.visibility = '';
    };

    return function() {
        if (location.hash === "#Start") {
            init_kanas();
            if (!next_kana()) {
                return;
            }

            question.input.disabled = false;
            question.input.addEventListener('input', input_on_change);
            question.question.addEventListener('mouseover', question_hover);
        }
        else {
            question_kanas.length = 0;
            question.input.disabled = true;

            question.answer.innerHTML = '　';
            question.question.innerHTML = '　';
            question.answer.style.visibility = 'hidden';

            question.input.removeEventListener('input', input_on_change);
            question.question.removeEventListener('mouseover', question_hover);
        }
    };
}

/**
 * @returns {Function} Callback for 'hashchange' event.
 * @param {Object} site_nav HTML element with links as its children.
 */
export function hash_change(site_nav) {
    return function() {
        const hash_re = new RegExp( `${(location.hash ? location.hash : '#')}$`);
        const nav_len = site_nav.children.length;
        const nav_children = site_nav.children;

        for (let idx = 0; idx < nav_len; idx += 1) {
            nav_children[idx].className = nav_children[idx].className.replace(' selected', '');
        }

        for (let idx = 0; idx < nav_len; idx += 1) {
            const link = nav_children[idx];

            if (hash_re.test(link.href)) {
                link.className += ' selected';
                break;
            }
        }
    };
}

/**
 * Click event handler for section.table.
 *
 * Section.table is supposed to consist of div.column
 * Once event is received div.column is being looked up.
 * Input element is first in div.column and it is being toggled.
 *
 * @param {Object} event Browser event.
 * @returns {void}
 */
export function table_click(event) {
    if (/input/i.test(event.target.tagName)) return;
    else if (/table/.test(event.target.className)) return;

    const column = look_up_parent_until(event.target, 'div', 'column');
    const column_check = column.children[0].children[0];

    column_check.checked = !column_check.checked;
}
