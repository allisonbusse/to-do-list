import Component from '../Component.js';

class SignUp extends Component {
    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
        });
    }
    
    renderHTML() {
        return /*html*/`
        <form class="sign-up-form">
            <p>Name: <input type="text" id="name" name="name" required></p>
            <p>Email: <input type="text" id="email" name="email" required></p>
            <p>Password: <input type="password" id="password" name="password" required></p>
            <p><button>Sign Up</button></p>
        </form>
        `;
    }
}

export default SignUp;