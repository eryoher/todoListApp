import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Col, Row } from "react-bootstrap";
import ConfirmModal from "../common/confirmModal";
import { TiEdit } from 'react-icons/ti';
import Task from '../tasks/tasks';
import paginationFactory from 'react-bootstrap-table2-paginator';

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                dataField: 'id',
                text: 'Id',
                align: 'center',
                headerAlign: 'center',
                sort: true,
                headerStyle: { width: '10%', 'textAlign': 'center' },
            },
            {
                dataField: 'name',
                text: 'Name',
                sort: true,
                align: 'center',
                headerAlign: 'center',
                headerStyle: { 'textAlign': 'center' },
            }, {
                dataField: 'lastname',
                text: 'Last Name',
                sort: true,
                align: 'center',
                headerAlign: 'center',
                headerStyle: { 'textAlign': 'center' },
            },
            {
                dataField: 'email',
                text: 'Email',
                sort: true,
                align: 'center',
                headerAlign: 'center',
                headerStyle: { 'textAlign': 'center' },
            },
            {
                dataField: 'actions',
                text: '',
                align: 'center',
                headerAlign: 'center',
                headerStyle: { width: '10%', 'textAlign': 'center' },
                formatter: ((cell, row, rowIndex, extraData) => {
                    return (
                        <Row>
                            <Col sm={4} >
                                <TiEdit onClick={() => this.handleEditRow(row)} style={{ cursor: 'pointer' }} />
                            </Col>
                            <Col sm={4}>
                                <ConfirmModal
                                    messageBody={`You are sure to delete the User ${row.name} ?`}
                                    onSubmitModal={() => this.handleRemoveUser(row)}
                                    modalTitle={'Delete User'}
                                />
                            </Col>
                            <Col md={4} >
                                <Task
                                    user={row}
                                />
                            </Col>
                        </Row>
                    )
                }),

            }
        ];
    }

    handleEditRow = (user) => {
        this.props.handleSetUser({ ...user })
    }

    handleRemoveUser = (user) => {
        this.props.handleDeleteUser({ id: user.id })
    }

    handleOnTableChange = (type, pagination) => {

        if (type === 'pagination') {
            this.props.handlePagination({ page: pagination.page, pageSize: pagination.sizePerPage })
        }
    }

    render() {
        const { itemsTable, updateUsersList } = this.props;       


        const options = (itemsTable) ? {
            page: itemsTable.page,
            sizePerPage: itemsTable.limit,
            totalSize: itemsTable.totalCount,
        } : {};

        const rowData = (itemsTable) ? itemsTable.data.map((user) => {
            let result = {};
            if (updateUsersList) {
                updateUsersList.data.forEach(update => {
                    if (update.id === user.id) {
                        result = {
                            ...update,
                        }
                    }
                });

            } else {
                result = {
                    ...user,
                }
            }

            return result;

        }) : []; 

        return (
            <BootstrapTable
                remote
                keyField={'id'}
                data={rowData}
                columns={this.columns}
                pagination={paginationFactory(options)}
                onTableChange={this.handleOnTableChange}
                headerClasses={'table-header'}
                classes={'table-striped'}
                
            />
        )
    }
}

export default UsersTable;