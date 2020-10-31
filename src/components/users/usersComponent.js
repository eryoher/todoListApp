import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../actions';
import { Container, Row, Col } from "reactstrap";
import UserForm from './userForm';
import UsersTable from "./usersTable";
import NotificationMessage from "../common/notificationMessage";

class UsersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userForm: {
                ID: null,
                Name: null,
                LastName: null
            },
            notifications: {
                showNotification: false,
                message: '',
                title: 'Success'
            },
            pagintionTable:{
                page:1,
                pageSize:10
            }
        }
    }

    componentDidMount = () => {
        this.props.getAllUsers(this.state.pagintionTable);
    }

    componentDidUpdate(prevProps) {
        const { newUser, userUpdated, userDeleted } = this.props;
        if (prevProps.newUser !== newUser && newUser) {
            this.setState({ notifications: { showNotification: true, message: 'User created successfully', title: 'Success' } })
            this.props.getAllUsers(this.state.pagintionTable);

        }

        if (prevProps.userUpdated !== userUpdated && userUpdated) {
            this.setState({ notifications: { showNotification: true, message: 'user updated successfully ', title: 'Success' } })
        }

        if (prevProps.userDeleted !== userDeleted && userDeleted) {
            this.setState({ notifications: { showNotification: true, message: 'user removed successfully', title: 'Success' } })
            this.props.getAllUsers(this.state.pagintionTable);
        }

    }

    setUser = (user) => {
        this.setState({ userForm: user })
    }

    handleCloseNotification = () => {
        this.setState({ notifications: { show: false } })
    }

    handlePagination = (pagination) => {
        this.setState({ pagintionTable : pagination })
        this.props.getAllUsers(pagination);
    }

    render() {
        const { listUsers } = this.props;

        return (
            <Container>
                <Row>
                    <Col className={'pt-5'}>
                        {
                            this.state.notifications.showNotification &&
                            <NotificationMessage
                                {...this.state.notifications}
                                handleClose={this.handleCloseNotification}
                            />
                        }
                    </Col>
                    <Col sm={12} className={'m2'}>
                        <UserForm
                            handleCreateUser={this.props.createUser}
                            handleUpdateUser={this.props.updateUser}
                            dataFormUser={this.state.userForm}
                            handleSetUser={this.setUser}
                        />
                    </Col>
                    <Col sm={12} className={'m2'}>
                        <UsersTable
                            itemsTable={listUsers}
                            handleSetUser={this.setUser}
                            handleDeleteUser={this.props.deleteUser}
                            handlePagination={this.handlePagination}
                            updateUsersList={this.props.updateUsersList}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}


const mapStateToProps = ({ users }) => {
    const { listUsers, newUser, userUpdated, userDeleted, updateUsersList } = users;
    return { listUsers, newUser, userUpdated, userDeleted, updateUsersList };
};

export default connect(mapStateToProps, { getAllUsers, createUser, updateUser, deleteUser })(UsersComponent);

