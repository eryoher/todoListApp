import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, updateTasks } from '../../actions';
import { Container, Row } from 'react-bootstrap';
import TasksItem from './tasksItem';

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idEditTasks: null
        }
    }

    componentDidMount = () => {
        const { userId } = this.props;
        if (userId) {
            this.props.getTasks({ userId })
        }
    }

    handleCloseTasks = ({ tasksId, state }) => {
        this.props.updateTasks({ tasksId, params: { state } })
    }

    hadleSetEditTasks = (tasksId) => {
        this.setState({ idEditTasks: tasksId });
    }

    renderTasks = (listTasks) => {
        const { newTasks } = this.props;
        const rows = [];
        const { idEditTasks } = this.state;


        if (newTasks) {
            listTasks.push(newTasks) //add new Tasks
        }
        listTasks.forEach(tasks => {
            const editTasks = (idEditTasks === tasks.id) ? true : false;

            rows.push(
                <TasksItem
                    tasks={tasks}
                    key={tasks.id}
                    handleCloseTasks={this.handleCloseTasks}
                    hadleSetEditTasks={this.hadleSetEditTasks}
                    editTasks={editTasks}
                />
            );
        });

        return rows;

    }

    render() {
        const { updateTasksList, listTasks } = this.props
        const tasksList = (updateTasksList) ? updateTasksList : (listTasks) ? listTasks : [];
        return (
            <Container className={'mt-3'}>
                <Row>
                    {this.renderTasks(tasksList)}
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = ({ tasks }) => {
    const { listTasks, newTasks, updateTasksList } = tasks;
    return { listTasks, newTasks, updateTasksList };
};

export default connect(mapStateToProps, { getTasks, updateTasks })(TaskList);