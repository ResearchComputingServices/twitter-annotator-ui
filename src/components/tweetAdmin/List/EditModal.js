import React from 'react'
import { Modal, Form, message } from 'antd'
import EditForm from './EditForm';
import Axios from 'axios'
function EditModal({ setIsModalVisible, isModalVisible, question, set_update_table }) {
    const [form] = Form.useForm();

    const handleOk = () => {

        form.validateFields().then(values => {
            // send back data
            if (values.id) {
                // modify
                Axios.put('/api/update_single_question_option', values).then(res => {
                    if (res.data === "success") {
                        message.success('Saved Successfully!')
                        set_update_table(pre => pre + 1)
                    } else {
                        message.error('Save Failed!')
                    }
                })
            } else {
                // add new data
                Axios.post('/api/create_single_question_option', values).then(res => {
                    if (res.data === "success") {
                        message.success('Saved Successfully!')
                        set_update_table(pre => pre + 1)
                    } else {
                        message.error('Save Failed!')
                    }
                })
            }
        })
        setIsModalVisible(false);


    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <Modal title="Question" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <EditForm question={question} form={form} />
        </Modal>
    )
}

export default EditModal
