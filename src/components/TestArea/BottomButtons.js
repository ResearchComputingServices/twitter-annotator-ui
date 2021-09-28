import React from 'react'
import { Button, message } from 'antd'
import Axios from 'axios'
function BottomButtons({ selected_text, content, form, set_content, set_selected_text }) {

    const clear_text = () => {
        form.resetFields()
    }
    const clear_all = () => {
        set_content({ content: "", id: "" })
        set_selected_text([])
        form.resetFields()

    }
    const save = () => {

        form.validateFields().then(values => {

            console.log(values);
            console.log(content)
            //if (content?.id) {
            if (values) {
                //Axios.post('/api/highlight', { id: content.id, selected_text, values }).then(data => {
                  //  message.success(data.statusText)
                //})

                 Axios.post('/api/highlight', { values }).then(data => {
                    message.success(data.statusText)
                })

            } else {
                message.error("Please select text")
            }
        })
    }
    return (
        <div className="buttons">
            <Button onClick={clear_text}>Clear Question</Button>
            
            <Button onClick={clear_all}>Clear All</Button>

            <Button onClick={save}>Save</Button>
        </div>
    )
}

export default BottomButtons
