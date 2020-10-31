import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsTrashFill } from "react-icons/bs";

export default class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true })
    }

    handleCloseModal = () => {
        this.setState({ showModal: false })
    }

    handleSubmit = () => {
        const { onSubmitModal } = this.props;
        onSubmitModal();
        this.handleCloseModal();
    }

    render() {
        const { labelCancelButtonModal, labelSubmitButton, modalTitle, messageBody, } = this.props;
        const { showModal } = this.state;
        const closeButton = (labelCancelButtonModal) ? labelCancelButtonModal : 'Cancel';
        const submitButton = (labelSubmitButton) ? labelSubmitButton : 'Accept';

        return (
            <Fragment>
                <BsTrashFill
                    onClick={this.handleOpenModal}
                    style={{ cursor: 'pointer' }}
                />
                <Modal
                    show={showModal}
                    onHide={this.handleCloseModal}                    
                >
                    <Modal.Header closeButton>
                        {modalTitle &&
                            <Modal.Title id={'ModalHeader'}>
                                {modalTitle}
                            </Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        {messageBody}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            {closeButton}
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            {submitButton}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        )
    }
}
