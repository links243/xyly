import {Message} from 'element-ui'

export default function({ $axios, redirect }) {
  $axios.onError(error => {
    console.log(error.response)
    // 1 获取失败后的返回值
    const { statusCode, message } = error.response.data;
    if (statusCode === 400) {
      // 密码错误
      Message.warning(message);
      // console.log(message);
    }
  });
}
