import { useNavigate } from "react-router-dom"
import RoomService from "../../services/room";
import { useCookies } from "react-cookie";

export const useAction = () => {
  const navigate = useNavigate();
  const [,,removeCookie] = useCookies(['tkn']);

  const onExit = async () => {
    const [err, response] = await RoomService.ExitRoom();

    if (err) {
      alert(err);
      return
    }

    if (response) {
      removeCookie('tkn');
      navigate(-1);
    }
  }

  return {
    onExit
  }
}
