import ListItem from '../src/components/list/ListItem.js';
const test = QUnit.test;

QUnit.module('List Item');

test('renders', assert => {
    // arrange
    const item = {
        id: 4,
        name: 'Create tables',
        complete: false
    };

    const expected = /*html*/`
    <div class="list-item">
    <button class="done">DONE</button>
    <li><span class="${item.complete ? 'complete' : ''}">Create tables</span></li>
    <button class="delete">🗑 Delete</button>
    </div>
    `;

    // act
    const listItem = new ListItem({ item });
    const html = listItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});

test('renders', assert => {
    // arrange
    const item = {
        id: 1,
        name: 'test task',
        complete: true
    };

    const expected = /*html*/`
    <div class="list-item">
    <button class="done">DONE</button>
    <li><span class="${item.complete ? 'complete' : ''}">test task</span></li>
    <button class="delete">🗑 Delete</button>
    </div>
    `;

    // act
    const listItem = new ListItem({ item });
    const html = listItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});
