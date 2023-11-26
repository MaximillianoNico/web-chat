import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import RoomService from "../services/room";

interface ICredentials {
  username?: string
  roomId?: string
}

export const useAction = () => {
  const [errors, setErrors] = useState("");
  const [credentials, setCredentials] = useState<ICredentials>({
    username: "",
    roomId: ""
  });

  const navigate = useNavigate();
  const [, setCookie] = useCookies(['tkn']);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCredentials(
    prev => ({
      ...prev,
      [e.target.name]: e.target.value
    })
  );

  const onSubmit = async () => {
    console.log('exec');
    if (!credentials.roomId || !credentials.username) {
      setErrors("Username or Room Id is required")
      return;
    };

    const [err, response] = await RoomService.JoinRoom(
      credentials.username ?? "",
      credentials.roomId ?? ""
    )


    if (response?.error) {
      setErrors(response?.error);

      return;
    }

    if (!err && response.data?.token) {
      setCookie('tkn', response?.data?.token ?? "");
      setErrors("")
      navigate('/room');
    }
  }

  return {
    errors,
    credentials,
    onChange,
    onSubmit
  }
}
