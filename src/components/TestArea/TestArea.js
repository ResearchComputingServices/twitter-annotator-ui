import React from 'react'
import Mark from 'mark.js'
import { Typography, message } from "antd";

const { Title } = Typography;
function TestArea({ content, selected_text, set_selected_text, highlight_status }) {
    const highlight = () => {

        let sel_text = window.getSelection().toString()
        if (sel_text.length === 0) return
        set_selected_text(pre => [...pre, sel_text])
        let sel_texts = [...selected_text, sel_text]
        message.info(sel_texts)

        var context = document.querySelector(".markcontext");
        var instance = new Mark(context);

        instance.unmark({
            done: () => {
                sel_texts?.forEach(d => instance.mark(d))
            }
        });
        console.log(instance, context);

    }
    return (
        <div className="textbox">
            <Title level={4} className="test_title" >Content</Title>
            {highlight_status ? <div className="markcontext" onMouseUp={highlight}>
                {content}
            </div> : <div className="markcontext" >
                {content}
            </div>

            }

        </div>
    )
}

export default TestArea
