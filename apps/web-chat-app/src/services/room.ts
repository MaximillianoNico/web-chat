import { BASE_URL } from "./constant"
import Axios from 'axios';
import { Cookies } from 'react-cookie';

const instance  = Axios.create({
  baseURL: BASE_URL
})

const JoinRoom = async (username: string, roomId: string) => {
  try {
    const response = await instance(
      `${BASE_URL}/rooms/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        data: { username, roomId }
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

const ExitRoom = async () => {
  const cookie = new Cookies().get('tkn');

  try {
    const response = await instance(
      `${BASE_URL}/rooms/exit`,
      {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${cookie}`
        },
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
  JoinRoom,
  ExitRoom
}
