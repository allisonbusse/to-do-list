import Component from '../Component.js';

class ListItem extends Component {
    
    onRender(dom) {
        const item = this.props.item;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const completeButton = dom.querySelector('.done');
        completeButton.addEventListener('click', () => {
            item.complete = !item.complete;
            onUpdate(item);
        });

        const deleteButton = dom.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to delete "${item.name}"?`)) {
                onRemove(item);
            }
        });
    }
    
    renderHTML() {
        const item = this.props.item;

        return /*html*/`
            <div class="list-item">
                <button class="done">DONE</button>
                <li><span class="${item.complete ? 'complete' : ''}">${item.name}</span></li>
                <button class="delete">🗑 Delete</button>
            </div>
        `;
    }
}

export default ListItem;