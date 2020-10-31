import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import * as Yup from 'yup';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email: '',
            userEdit: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataFormUser !== this.props.dataFormUser && this.props.dataFormUser.id) {
            const { dataFormUser } = this.props;

            this.setState({
                name: dataFormUser.name,
                lastname: dataFormUser.lastname,
                userEdit: dataFormUser.id,
                email: dataFormUser.email,
            })
        }
    }

    handleClearForm = () => {
        this.props.handleSetUser({ name: '', lastname: '', id: '', email:'' })
        this.setState({ name: '', lastname: '', userEdit: null, email:'' })
    }

    render() {
        return (
            <Formik
                onSubmit={(values, actions) => {
                    if (values.userEdit) {
                        this.props.handleUpdateUser({ ...values })
                    } else {
                        this.props.handleCreateUser({ ...values })
                    }
                    actions.resetForm();
                    this.handleClearForm();
                }}
                initialValues={{ ...this.state }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('The name is required'),
                    lastname: Yup.string().required('The lastname is required'),
                    email: Yup.string().required('The email is required').email('the email does not have the correct structure')
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
                                <Col sm={12} className={'text-center'}>
                                    <h2>Users</h2>
                                </Col>
                                <Col md={{ span: 8, offset: 2 }} className={'form-group'} >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={'Name'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className={'input-user'}
                                    />
                                    {errors.name && touched.name && <div className={"alert alert-danger error-message"}>{errors.name}</div>}
                                </Col>
                                <Col md={{ span: 8, offset: 2 }} className={'form-group'} >
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder={'Last Name'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                        className={'input-user'}
                                    />
                                    {errors.lastname && touched.lastname && <div className={"alert alert-danger error-message"}>{errors.lastname}</div>}
                                </Col>
                                <Col md={{ span: 8, offset: 2 }} className={'form-group'} >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={'Email'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={'input-user'}
                                    />
                                    {errors.email && touched.email && <div className={"alert alert-danger error-message"}>{errors.email}</div>}
                                </Col>
                                <Col sm={6} className={"text-right mb-3"}>
                                    <Button variant="primary" type={"submit"} className={'form-button'} >
                                        {'Save'}
                                    </Button>
                                </Col>
                                <Col sm={6} className={"text-left mb-3"}>
                                    <Button variant="primary" type={"button"} className={'form-button'} onClick={this.handleClearForm} >
                                        {'Clear'}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
            </Formik>
        );
    }
}

export default UserForm;