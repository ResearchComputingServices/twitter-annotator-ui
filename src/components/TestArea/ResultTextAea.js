import React from 'react'

import { Input, Typography } from "antd";

const { Title } = Typography;
const { TextArea } = Input;
function ResultTextAea({ selected_text, selected_id, set_selected_text }) {
    const handelChange = (e) => {
        console.log(selected_text);
        set_selected_text([e.target.value])
        console.log(e.target.value);
    }
    return (
        <div className="textbox">
            <Title level={4} className="test_title">Result</Title>
            <TextArea placeholder="Enter Here" style={{ height: "150px" }}
                value={`${selected_text ?? ""}`} onChange={handelChange} />
        </div>
    )
}

export default ResultTextAea
