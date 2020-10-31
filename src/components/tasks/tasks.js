import React, { Component, Fragment } from 'react'
import { BiTask } from 'react-icons/bi'
import { Modal, Button, Container } from 'react-bootstrap';
import TasksForm from './tasksForm';
import TaskList from './taskList';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    toggleModal = () => {
        this.setState(state => ({ showModal: !state.showModal }));
    }

    render() {
        const { user } = this.props;
        const { showModal } = this.state;
        return (
            <Fragment>
                <BiTask onClick={this.toggleModal} style={{ cursor: 'pointer' }} />
                <Modal
                    show={showModal}
                    onHide={this.toggleModal}
                    size={'lg'}
                    className={'todo-app'}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id={'ModalHeader'}>
                            <span> {`${user.name}'s Tasks`} </span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <TasksForm userId={user.id} />
                            <TaskList userId={user.id} />
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className={'text-center'}>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            {'Close'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}
