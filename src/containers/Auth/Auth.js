import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import styles from './Auth.module.css';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
        }
    }

    validityCheckHandler = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid
    }

    inputChangeHandler = (event, controlname) => {
        const updatedControls = {
            ...this.state.controls,
            [controlname]: {
                ...this.state.controls[controlname],
                value: event.target.value,
                valid: this.validityCheckHandler(event.target.value, this.state.controls[controlname].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);

    }

    render() {
        const formElementsArray = [];
        for (const key in this.state.controls) {
            if (this.state.controls.hasOwnProperty(key)) {
                const element = this.state.controls[key];
                formElementsArray.push({
                    id: key,
                    config: element
                });

            }
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        ));
        return (
            <div className={styles.Auth}>
                <form onSubmit={this.submithandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);