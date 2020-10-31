import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createTasks, updateTasks, getTasks } from '../../actions';

class TasksForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: (props.editTasks) ? props.editTasks.description : '',
            editTasks: (props.editTasks) ? props.editTasks.id : null,
            userTasks: (props.editTasks) ? props.editTasks.user_id : null,
            filter: 'A'
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.tasksUpdated !== prevProps.tasksUpdated && this.props.tasksUpdated && this.props.handleCloseEdit) {
            this.props.handleCloseEdit();
        }
    }


    handleCreateTasks = (data) => {
        const { userId } = this.props;
        this.props.createTasks({ user_id: userId, description: data.description, state: 0 });
    }

    handleUpdateTasks = (data) => {
        this.props.updateTasks({ tasksId: data.editTasks, params: { description: data.description } });
    }

    handleChangeFilter = (filter) => {
        const { userId } = this.props
        this.setState({ filter })
        this.props.getTasks({ userId, filter })
    }

    render() {
        const { editTasks } = this.props;
        const labelButton = (editTasks) ? 'Update' : 'Add';
        return (
            <Formik
                onSubmit={(values, actions) => {
                    if (values.editTasks) {
                        this.handleUpdateTasks({ ...values })
                    } else {
                        this.handleCreateTasks({ ...values })
                    }

                    actions.resetForm();
                    this.setState({ description: '' })
                }}
                initialValues={{ ...this.state }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    description: Yup.string().required('The description is required'),
                })}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                        <Form onSubmit={handleSubmit} className="col-12 form">
                            <Row>
                                <Col sm={12}>
                                    <InputGroup className="mb-1">
                                        <FormControl
                                            type="text"
                                            name="description"
                                            placeholder={'Add tasks'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="primary" type={'submit'}> {labelButton} </Button>
                                            {!editTasks &&
                                                <select
                                                    name="filter"
                                                    className={'form-control'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.filter}
                                                    onChange={(e) => {
                                                        this.handleChangeFilter(e.target.value)
                                                    }}
                                                >
                                                    <option data-toggle="tooltip" title={'All'} value={'A'} defaultValue >{'All'}</option>
                                                    <option data-toggle="tooltip" title={'Done'} value={'D'} >{'Done'}</option>
                                                    <option data-toggle="tooltip" title={'To do'} value={'T'} >{'To do'}</option>
                                                </select>
                                            }

                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>

                            </Row>
                        </Form>
                    )}
            </Formik>
        );
    }
}


const mapStateToProps = ({ tasks }) => {
    const { tasksUpdated } = tasks;
    return { tasksUpdated };
};

export default connect(mapStateToProps, { createTasks, updateTasks, getTasks })(TasksForm);