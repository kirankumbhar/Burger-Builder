import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const  withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount () {
            axios.interceptors.response.use(null, request => {
                this.setState({error: null});
            });

            axios.interceptors.response.use(null, response => response, error => {
                this.setState({error: error});
                console.log(this.state.error);
                
            });
        }

        errorConfirmedHandler = ()=> {
            this.setState({errpr: null});
        }
        render (prps) {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErrorHandler;