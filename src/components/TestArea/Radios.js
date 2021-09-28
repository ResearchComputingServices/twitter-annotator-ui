import React from 'react'
import { Radio, Typography, Form } from "antd";
const { Title } = Typography;
function Radios({ name, options }) {
    return (
        <div className="checkbox">
            <Title level={4}>{name}</Title>
            <Form.Item name={name}>
                <Radio.Group style={{display:"grid", gridTemplateColumns: "100%"}}>
                    {options.map((d, i) => {
                        return <Radio value={d.text} key={'key' + i}  >{d.text}</Radio>
                    })}
                </Radio.Group>
            </Form.Item>
        </div>
    )
}

export default Radios
