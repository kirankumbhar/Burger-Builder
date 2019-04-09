import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const  withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
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
                <Auxiliary>
                    <Modal show={this.state.error} modalClicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    } 
}

export default withErrorHandler;