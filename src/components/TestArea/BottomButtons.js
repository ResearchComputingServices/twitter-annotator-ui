import React from 'react'
import { Button, message } from 'antd'
import Axios from 'axios'
import UserService from "../services/UserService";
import "./styles.css";
function BottomButtons({ selected_text, content, form, set_content, set_selected_text, tweetId, setTweetId, TweetsIdList, setTweetsIdList }) {

    const clear_text = () => {
        form.resetFields()
    }
    const clear_all = () => {
        //set_content({ content: "", id: "" })
        //set_selected_text([])
        form.resetFields()

    }
    const save = () => {

        form.validateFields().then(values => {
            const username = UserService.getUsername()
            //if (content?.id) {
            if (values) {
                //Axios.post('/api/highlight', { id: content.id, selected_text, values }).then(data => {
                  //  message.success(data.statusText)
                //})
                console.log(values)
                
                Axios.post('/api/highlight', {"values": values, "tweet_id":tweetId, "username":username}).then(res => {
                    if (res.data === "success") {
                        message.success('Saved Successfully!')
                        Axios.put('/api/update_single_assignation', {"username": username, "tweet_id":tweetId}).then(res => {
                            if (res.data === "success") {
                                window.location.reload(false);
                                //index_to_remove = TweetsIdList.indexOf(tweetId)
                                //TweetsIdList_new = TweetsIdList.splice(index_to_remove,1)
                                //setTweetsIdList(TweetsIdList_new)
                            }
                        })
                        
                    } else {
                        message.error('Save Failed!')
                    }
                    //message.success(data.statusText)
                })

            } else {
                message.error("Please select text")
            }
        })
    }
    return (
        <div className='margin'>
            <Button type="primary" block onClick={save}>Save</Button>
        </div>
    )
}

export default BottomButtons
