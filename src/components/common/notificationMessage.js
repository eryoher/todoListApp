import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import { Label } from 'reactstrap';


export default class NotificationMessage extends Component{
    render() {
        const { showNotification, handleClose, title, message, type } = this.props;
        const typeNoti = (type) ? type : 'success';

        return (
            <Alert show={showNotification} style={{ padding: '0.5rem 1rem' }} variant={typeNoti} onClose={handleClose} dismissible>
                <Alert.Heading>{title}</Alert.Heading>
                {
                    message
                }
            </Alert>
        )
    }
}