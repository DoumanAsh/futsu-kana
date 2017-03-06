"use strict";

import * as ui from './js/UI.js';

//File is auto-required
window.addEventListener("load", function() {
    const site_nav = document.body.children[0];

    const question_section = document.getElementById('Start').children[2];
    const question = {
        wrapper: question_section,
        question: question_section.children[0],
        answer: question_section.children[1],
        input: question_section.children[2]
    };

    const kana = {
        hiragana: document.getElementById("Hiragana").children[1],
        katakana: document.getElementById("Katakana").children[1]
    };

    kana.hiragana.addEventListener('click', ui.table_click);
    kana.katakana.addEventListener('click', ui.table_click);

    const on_hash_change = ui.hash_change(site_nav);
    const on_hash_start_page = ui.init_start(question, kana);

    on_hash_change();
    on_hash_start_page();
    window.addEventListener("hashchange", on_hash_change);
    window.addEventListener("hashchange", on_hash_start_page);
});
