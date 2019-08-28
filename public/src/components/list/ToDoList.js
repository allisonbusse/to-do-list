import Component from '../Component.js';
import ListItem from './ListItem.js';
import store from '../../services/store.js';

class ToDoList extends Component {
    
    onRender(list) {
        const items = this.props.items;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
    
        items.forEach(item => {
            const listItem = new ListItem({ item, onUpdate, onRemove });
            list.appendChild(listItem.renderDOM());
        });

        
    }
    
    renderHTML() {
        return /*html*/`
            <section id="list-container">
            </section>
        `;
    }
}

export default ToDoList;