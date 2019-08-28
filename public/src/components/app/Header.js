import Component from '../Component.js';
import store from '../../services/store.js';

class Header extends Component {

    onRender(dom) {
        const logoutButton = dom.querySelector('#log-out');

        if(window.pathname === 'auth.html') {
            logoutButton.classList.add('hidden');
        }


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