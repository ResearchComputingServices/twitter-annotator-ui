import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Space, Button, message } from 'antd'
import EditModal from './EditModal';
import Axios from 'axios'
function CreateBackButton({ question, del_data_by_id, set_update_table }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showEdit = ({ addnew }) => {
        question.addnew = addnew
        setIsModalVisible(true);
    }
    const history = useHistory()

    const handel_delete = () => {
        if (question?.id) {
            del_data_by_id(question?.id)
            Axios.delete('/api/delete_single_question_option', { data: question }).then(res => {
                if (res.data === 'success') {
                    message.success('Record has been deleted!')
                    set_update_table(pre => pre + 1)
                } else {
                    message.error('Delete  Failed!')
                }
            })
        }



    }
    return (
        <div>
            <Space>
                <Button onClick={() => showEdit({ addnew: true })} >Select</Button>
                <Button onClick={() => showEdit({ addnew: false })} disabled={question?.id ? false : true}>Edit</Button>
                <Button onClick={handel_delete} disabled={question?.id ? false : true}>Assign</Button>
                <Button onClick={() => history.push('/')}  >Back</Button>
            </Space>

            <EditModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} question={question} set_update_table={set_update_table} />

        </div>
    )
}

export default CreateBackButton
