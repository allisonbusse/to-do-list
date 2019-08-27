import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <h1>To-Do List</h1>
            <p>Keep track of your stuff!</p>
        </header>
        `;
    }
}

export default Header;