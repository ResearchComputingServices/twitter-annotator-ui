import React from 'react';
import Filter from './ObtainTweets/Filter';
import Assign from './UploadTweets/Assign';
import Annotations from './ObtainAnnotations/Annotations';
import { Checkbox } from 'antd';
function index() {
    return (
        <div>
            <h1>Tweet Admin Panel</h1>
            <Filter />
            <Assign />
            <Annotations />
        </div>
    )
}

export default index
