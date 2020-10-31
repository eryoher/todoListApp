import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { ImRadioUnchecked, ImRadioChecked2 } from 'react-icons/im';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { TiEdit } from 'react-icons/ti';
import TasksForm from './tasksForm';

export default class TasksItem extends Component {
    render() {
        const { tasks, editTasks } = this.props;
        const customClass = (tasks.state) ? 'complete' : '';
        
        return (
            <Col md={12} >
                { !editTasks &&
                    <Row className={`todo-row ${customClass}`}>
                        <Col md={8} >
                            {tasks.description}
                        </Col>
                        <Col md={1}>
                            {
                                tasks.state === 1 &&
                                <ImRadioChecked2 className={'incomplete-icon'} onClick={() => this.props.handleCloseTasks({ tasksId: tasks.id, state: !tasks.state })} />
                            }
                            {tasks.state === 0 &&
                                <ImRadioUnchecked className={'complete-icon'} onClick={() => this.props.handleCloseTasks({ tasksId: tasks.id, state: !tasks.state })} />
                            }

                        </Col>
                        {
                            tasks.state === 0 &&
                            <Col md={1}>
                                <TiEdit className={'edit-icon'} onClick={() => this.props.hadleSetEditTasks(tasks.id)} />
                            </Col>
                        }
                    </Row>
                }
                {
                    editTasks &&
                    <Row className={`todo-row ${customClass}`}>
                        <Col md={8} >
                            <TasksForm
                                editTasks={tasks}
                                handleCloseEdit={ this.props.hadleSetEditTasks }
                            />
                        </Col>
                        <Col md={{ span: 2, offset: 1 }}>
                            <AiOutlineCloseCircle className={'edit-icon'} onClick={() => this.props.hadleSetEditTasks(null)} />
                        </Col>
                    </Row>

                }

            </Col>
        )
    }
}
