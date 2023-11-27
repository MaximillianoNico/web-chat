import { BASE_URL } from "./constant"
import Axios from 'axios';
import { Cookies } from 'react-cookie';

const instance  = Axios.create({
  baseURL: BASE_URL
})

const GetMessage = async (roomId: string) => {
  try {
    const cookies = new Cookies();
    const response = await instance(
      `${BASE_URL}/message?roomId=${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${cookies.get('tkn')}`
        }
      }
    );

    if (!response.data) {
      throw new Error(response.statusText);
    }

    return [null, response.data];
  } catch (err) {
    return [err, null];
  }
}

const SendMessage = async (username: string, message: string) => {
  try {
    const cookies = new Cookies();
    const response = await instance(
      `${BASE_URL}/message/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${cookies.get('tkn')}`
        },
        data: {
          username,
          message
        }
      }
    );

    if (!response.data) {
      throw new Error(response.statusText);
    }

    return [null, response.data];
  } catch (err) {
    return [err, null];
  }
}

export default {
  GetMessage,
  SendMessage
}
