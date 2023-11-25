import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface ICredentials {
  username?: string
  roomId?: string
}

export const useAction = () => {
  const [credentials, setCredentials] = useState<ICredentials>({
    username: "",
    roomId: ""
  });
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCredentials({
    [e.target.name]: e.target.value
  });

  const onSubmit = () => {
    console.log('credentials: ', credentials);
    navigate('/room');
  }

  return {
    credentials,
    onChange,
    onSubmit
  }
}
