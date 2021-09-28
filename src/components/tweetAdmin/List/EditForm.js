import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'

const { TextArea } = Input
const { Option } = Select
function EditForm({ question, form }) {


    const [show_content, set_show_content] = useState(true)

    const type_changed = (value) => {
        if (value === "content") {
            set_show_content(false)
            form.setFieldsValue({ options: [] })
        } else {
            set_show_content(true)
        }
    }
    useEffect(() => {
        let { id, text, question_type, options } = question
        let types = ['radio', 'checkbox', "content"]
        if (question.addnew) {
            form.resetFields()
        } else {
            form.setFieldsValue({ id, text, type: types[question_type], options: options.map(d => d.text) })
        }
    }, [question, form, question.addnew])


    return (

        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
        >

            {question.addnew ? ""
                : <Form.Item label="id" key="id" name="id" rules={[{ required: true }]} >
                    <Input disabled />
                </Form.Item>}


            <Form.Item label="Text" name="text" key="text" rules={[{ required: true }]}>
                <TextArea />
            </Form.Item>


            <Form.Item label="active" key="active" name="active" rules={[{ required: true }]} >
                <Select>
                    <Option key="false" value="false" > false </Option>
                    <Option key="true" value="true" > true </Option>
                </Select>
            </Form.Item>

            {/*  */}
            <Form.Item label="Type" name="type" key="type" rules={[{ required: true }]}>
                <Select onChange={type_changed} >
                    <Option key="radio" value="radio" > Radio Question</Option>
                    <Option key="checkbox" value="checkbox" > Checkbox Question</Option>
                    <Option key="content" value="content" > Text Question</Option>
                </Select>
            </Form.Item>



            {show_content ? <Form.Item label="Options" name="options" key="options" rules={[{ required: true }]}>
                <Select
                    mode="tags"
                    placeholder="Please select"
                    style={{ width: '100%' }}
                >
                    {question?.options?.map(d => {
                        return <Option key={d.text} value={d.text} > {d.text} </Option>
                    })}
                </Select>
            </Form.Item> : ""}



        </Form>

    )
}

export default EditForm
