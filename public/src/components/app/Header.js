import Component from '../Component.js';
import store from '../../services/store.js';

class Header extends Component {

    onRender(dom) {
        const logoutButton = dom.querySelector('#log-out');

        logoutButton.addEventListener('click', () => {
            store.removeToken();
            window.location = 'auth.html';
        });
    }

    renderHTML() {
        return /*html*/`
        <header>
            <h1>To-Do List</h1>
            <button id="log-out">Logout</button>
        </header>
        `;
    }
}

export default Header;