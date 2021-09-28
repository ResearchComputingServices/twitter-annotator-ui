import Axios from "axios";
import { message } from "antd";
function fetchData(url,params) {
  return new Promise((resolve, reject) => {
    Axios.post(url,params).then((res) => {
      if (res.data.Success) {
        resolve(res.data.data);
      } else {
        message.error("Fetch Data Failed");
        reject(res.data.err);
      }
    });
  });
}

export default fetchData;
