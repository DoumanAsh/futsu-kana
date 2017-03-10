"use strict";

import test from 'ava';
import jsdom from 'jsdom';

import './helpers/babel_init.js';
import {look_up_parent_until} from '../app/js/utils.js';

//const url = "file:///../public/index.html"
test('look_up_parent_until some', async t => {
    jsdom.env('<body></body>', (error, window) => {
        const document = window.document;

        const first = document.createElement('top');
        first.className = "first";
        const second = document.createElement('middle');
        second.className = "second";
        const third = document.createElement('low');
        third.className = "third";

        second.appendChild(third);
        first.appendChild(second);
        document.body.appendChild(first);

        let result = look_up_parent_until(third, 'top', 'first');
        t.not(result, null);
        t.is(result, first);

        result = look_up_parent_until(third, 'top');
        t.not(result, null);
        t.is(result, first);

        result = look_up_parent_until(third, undefined, 'first');
        t.not(result, null);
        t.is(result, first);

        result = look_up_parent_until(third, undefined, 'bad');
        t.is(result, null);

        window.close();
    });
});
