import React, { useEffect, useState } from 'react'
import CreateBackButton from './CreateBackButton';
import { Table, message, Switch } from 'antd'
import Axios from "axios";


function List() {

    let types = ['Radio Question', 'Checkbox Question', 'Text Question']
    const col = [{
        dataIndex: "id",
        key: 'id',
        title: "id"
    },
    {
        dataIndex: "text",
        key: 'text',
        title: "text"
    },

    {
        dataIndex: 'active',
        key: 'active',
        title: "active",
        render: (active, row) => <Switch size="small" checked={active} onChange={(active) => {
            row.active = active
            Axios.put('/api/update_single_question_option_active_only', row).then(res => {
                //console.log("here");
                if (res.data === "success") {
                    message.success('Update Successful!')
                    set_update_table(pre => pre + 1)
                } else {
                    message.error('Update Failed!')
                }
            })
        }} />
    },

    {
        dataIndex: 'question_type',
        key: 'type',
        title: "type",
        render: (question_type) => <span>{types[question_type]}</span>
    }
    /*
        ,
    {
        dataIndex: "options",
        key: 'options',
        title: "options",
        render: (options) => options?.map(d => <span>{d.text}</span>)
    }
    */


    ]
    const [data, set_data] = useState([])
    const [question, set_question] = useState([])
    const [selectedRowKeys, set_selectedRowKeys] = useState([])
    const [update_table, set_update_table] = useState(1)
    useEffect(() => {
        Axios.get('/api/get_all_question_option').then(res => {


            let { options, questions } = res.data

            questions.forEach(d => {
                let values = options.filter(v => v.question_type === d.id)
                d.options = values
            })
            set_data(questions)
            console.log(questions, options);
        })
    }, [data.length, update_table])

    const del_data_by_id = (id) => {
        set_data(data.filter(d => d.id !== +id))

    }

    const handle_change = (selectedRowKeys, selectedRows) => {
        set_selectedRowKeys(selectedRowKeys)
        Axios.get(`/api/get_single_question_option?id=${selectedRowKeys[0]}`).then((res) => {
            if (res.status === 200) {
                let { options, question } = res.data
                question.options = options
                set_question(question);
                console.log(question);

            } else {
                message.error("Fetch Data Failed");
            }
        })
    }


    return (
        <div>
            <Table
                dataSource={data}
                columns={col}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
                rowSelection={{
                    type: "radio",
                    selectedRowKeys,
                    onChange: handle_change

                }

                }
                rowKey={(row) => row.id}
            />


            <CreateBackButton question={question} del_data_by_id={del_data_by_id} set_update_table={set_update_table} />
        </div>
    )
}

export default List
