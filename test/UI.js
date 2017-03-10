"use strict";

import fs from 'fs';
import path from 'path';
import test from 'ava';
import jsdom from 'jsdom';

import './helpers/babel_init.js';
import * as ui from '../app/js/UI.js';
const index_html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'index.html'), "utf-8");

test('hash change', async t => {
    jsdom.env('<body></body>', (error, window) => {
        const location = window.location;
        global.location = location;
        const document = window.document;

        const nav = document.createElement('nav');

        const link1 = document.createElement('a');
        link1.href = "#First";
        nav.appendChild(link1);

        const link2 = document.createElement('a');
        link2.href = "#Second";
        nav.appendChild(link2);

        const link3 = document.createElement('a');
        link3.href = "#Third";
        nav.appendChild(link3);

        const link_default = document.createElement('a');
        link_default.href = "#";
        nav.appendChild(link_default);

        const nav_change = ui.hash_change(nav);

        nav_change();
        t.false(/selected/.test(link1.className));
        t.false(/selected/.test(link2.className));
        t.false(/selected/.test(link3.className));
        t.true(/selected/.test(link_default.className));

        location.hash = "#second";
        nav_change();
        t.false(/selected/.test(link1.className));
        t.true(/selected/.test(link2.className));
        t.false(/selected/.test(link3.className));
        t.false(/selected/.test(link_default.className));

        global.location = undefined;
    });
});

test('Kana tables', async t => {
    jsdom.env(index_html, (error, window) => {
        t.is(error, null);

        const document = window.document;

        const tabs = {
            hiragana: document.getElementById("Hiragana"),
            katakana: document.getElementById("Katakana"),
        };

        const kana = {
            hiragana: {
                tables: {
                    simple: tabs.hiragana.children[1].children[1].children[0],
                    double: tabs.hiragana.children[1].children[1].children[1]
                },
                left: tabs.hiragana.children[1].children[0],
                right: tabs.hiragana.children[1].children[2],
                select_all: tabs.hiragana.children[2].children[0],
                reset_all: tabs.hiragana.children[2].children[1],
            },
            katakana: {
                tables: {
                    simple: tabs.katakana.children[1].children[1].children[0],
                    double: tabs.katakana.children[1].children[1].children[1],
                    extra: tabs.katakana.children[1].children[1].children[2]
                },
                left: tabs.katakana.children[1].children[0],
                right: tabs.katakana.children[1].children[2],
                select_all: tabs.katakana.children[2].children[0],
                reset_all: tabs.katakana.children[2].children[1],
            }
        };

        ui.init_kana_tables(kana);

        const katakana = kana.katakana;
        const tables_keys = Object.keys(katakana.tables);

        //Test left/right navigation links.
        ['simple', 'extra', 'double', 'simple'].forEach((elem) => {
            t.is(katakana.tables[elem].style.display, '');

            tables_keys.filter((key) => key !== elem).forEach((key) => {
                t.is(katakana.tables[key].style.display, 'none');
            });

            katakana.left.click();
        });

        ['simple', 'double', 'extra', 'simple'].forEach((elem) => {
            t.is(katakana.tables[elem].style.display, '');

            tables_keys.filter((key) => key !== elem).forEach((key) => {
                t.is(katakana.tables[key].style.display, 'none');
            });

            katakana.right.click();
        });

        //Initially kanas should be unchecked
        const checker_columns_are = (value, exclude) => {
            let keys = exclude ? tables_keys.filter(exclude) : tables_keys;
            keys.forEach((key) => {
                for (let column of katakana.tables[key].children) {
                    t.is(column.children[0].children[0].tagName, 'INPUT');
                    t.is(column.children[0].children[0].checked, value);
                }
            });
        };

        checker_columns_are(false);

        katakana.select_all.click();
        checker_columns_are(true, elem => elem === "simple");
        checker_columns_are(false, elem => elem !== "simple");

        katakana.reset_all.click();
        checker_columns_are(false);

        katakana.right.click();
        katakana.select_all.click();
        checker_columns_are(true, elem => elem === "double");
        checker_columns_are(false, elem => elem !== "double");

        katakana.left.click();
        katakana.reset_all.click();
        checker_columns_are(true, elem => elem === "double");
        checker_columns_are(false, elem => elem !== "double");

        katakana.right.click();
        katakana.reset_all.click();
        checker_columns_are(false);

        katakana.left.click();

        //Table clicks
        katakana.tables.simple.children[1].click();
        t.false(katakana.tables.simple.children[0].children[0].children[0].checked);
        t.true(katakana.tables.simple.children[1].children[0].children[0].checked);
        t.false(katakana.tables.simple.children[2].children[0].children[0].checked);
        checker_columns_are(false, elem => elem !== "simple");

        katakana.tables.simple.children[1].click();
        checker_columns_are(false);

        katakana.tables.simple.children[1].children[1].click();
        t.false(katakana.tables.simple.children[0].children[0].children[0].checked);
        t.true(katakana.tables.simple.children[1].children[0].children[0].checked);
        t.false(katakana.tables.simple.children[2].children[0].children[0].checked);
        checker_columns_are(false, elem => elem !== "simple");
    });
});
