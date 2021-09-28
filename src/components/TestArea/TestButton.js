import React from 'react'

import { Button, message } from 'antd'
import Axios from 'axios'
function TestButton({ set_content, set_selected_text, selected_text, highlight_status, set_highlight_status }) {


    const get_content = () => {
        Axios.get('/api/load_data').then(data => {
            if (data.statusText === "OK") {
                set_content(data.data)
            } else {
                message.error("cannot get data!")
                set_content({ content: "" })
            }

        })

    }



    return (
        <div className="buttons">
            <Button onClick={get_content}>Load Data</Button>
            <Button onClick={() => set_highlight_status(() => !highlight_status)} type={highlight_status ? "danger" : ""}>Highlight</Button>
     
        </div>
    )
}

export default TestButton
