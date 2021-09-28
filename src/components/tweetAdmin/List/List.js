import React, { useEffect, useState } from 'react'
import CreateBackButton from './CreateBackButton';
import Filter from './Filter';
import { Table, message, Switch, Space } from 'antd'
import Axios from "axios";


const List =() =>{

    let types = ['Radio Question', 'Checkbox Question', 'Text Question']

    const col = [
    {
        dataIndex: "id",
        key: 'id',
        title: "id"
    },

    {
        dataIndex: "date",
        key: 'date',
        title: "date",
        align: 'center'
    },
    {
        dataIndex: "hashtags",
        key: 'hashtags',
        title: "hashtags"
    },
    {
        dataIndex: "name",
        key: 'name',
        title: "name"
    },
    {
        dataIndex: "tweet",
        key: 'tweet',
        title: "tweet",
        width: '10px',
    },
    {
        dataIndex: "user_id",
        key: 'user_id',
        title: "user_id"
    },
    {
        dataIndex: "annotated",
        key: 'annotated',
        title: "annotated"
    },

/*
    {
        dataIndex: 'question_type',
        key: 'type',
        title: "type",
        align: 'center',
        render: (question_type) => <span>{types[question_type]}</span>
    }
    
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
    const [api_checked, set_api_checked] = useState(false)

    useEffect(() => {
        Axios.get(api_checked ? '/api/get_all_tweets_annotated': '/api/get_all_tweets').then(res => {

            let { tweets } = res.data


            set_data(tweets)
            console.log(tweets);
        })
    }, [api_checked])

    const del_data_by_id = (id) => {
        set_data(data.filter(d => d.id !== +id))

    }

    const handle_change = (selectedRowKeys, selectedRows) => {
        set_selectedRowKeys(selectedRowKeys)
        Axios.get(`/api/get_single_tweet?id=${selectedRowKeys[0]}`).then((res) => {
            if (res.status === 200) {
                let { tweets } = res.data
                
                set_question(tweets);
                console.log(question);

            } else {
                message.error("Fetch Data Failed");
            }
        })
    }


    return (
        <div>
            <div style={{display:'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                <span>Unannotated Tweet</span>
                <Space>
                <Switch style = {{marginLeft:"5px", marginRight: "5px"}} size = "small" checked={api_checked} onChange={() => set_api_checked(!api_checked)} />
                </ Space>
                <span>Annotated Tweet</span>
            </div>
            <Filter />
            <div style={{marginBottom: "10px"}}>
            <CreateBackButton question={question} del_data_by_id={del_data_by_id} set_update_table={set_update_table} />
            </div>
            <Table
                dataSource={data}
                columns={col}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys,
                    onChange: handle_change

                }

                }
                rowKey={(row) => row.id}
            />



        </div>
    )
}

export default List
