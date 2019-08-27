import Component from '../Component.js';

class ItemForm extends Component {
    
    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[id=form-input]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const listItem = {
                name: input.value
            };

            error.textContent = '';

            onAdd(listItem)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });
    }
    
    renderHTML() {
        return /*html*/`
        <div id="form-box">
            <form class="item-form">
                <input type="text" id="form-input">
                <button id="add-item">Add</button>
            </form>
            <p class="error"></p>
        </div>
        `;
    }
}

export default ItemForm;