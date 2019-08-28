import Component from '../Component.js';

class SignIn extends Component {
    onRender(form) {
        const onSignIn = this.props.onSignIn;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignIn(credentials);
        });
    }
    
    renderHTML() {
        return /*html*/`
        <form class="sign-up-form">
            <p>Email: <input type="text" id="signin-email" name="email" required></p>
            <p>Password: <input type="password" id="signin-password" name="password" required></p>
            <p><button class="sign-buttons">Sign In</button></p>
        </form>
        `;
    }
}

export default SignIn;