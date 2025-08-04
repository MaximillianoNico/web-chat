import { useNavigate } from "react-router-dom"
import socket from "../../services/socket";
import RoomService from "../../services/room";
import MessageService from "../../services/message";
import { useCookies } from "react-cookie";
import { LegacyRef, useEffect, useRef, useState } from "react";

interface IMessage {
  createdAt: string
  roomId: string
  roomIdName: string
  text: string
  username: string
}

interface IRoomAction {
  onRetrieve: () => void
}

export const useAction = (props: IRoomAction) => {
  const bottomRef = useRef<LegacyRef<HTMLDivElement> | undefined>();
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState<IMessage[]>([])
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasInit, setHasInit] = useState(false);
  const navigate = useNavigate();

  const [cookies,,removeCookie] = useCookies(['tkn', 'roomId', 'username']);

  useEffect(() => {
    const GetMessageList = async () => {
      const [err, data] = await MessageService.GetMessage(cookies.roomId);

      if (!err && data) {
        console.log('DATA: ', data);
        setMessage(data?.data);
      }

      setHasInit(true)
    }

    if (cookies.roomId) GetMessageList();
  }, [cookies.roomId])

  useEffect(() => {
    if (hasInit) {
      const onConnect = () => {
        console.log('[LOG] connect');
        setIsConnected(true);
      }

      const onDisconnect = () => {
        console.log('[LOG] disconnect');
        setIsConnected(false);
      }

      const onRetrieveMessage = (value: IMessage) => {
        setMessage(prev => {
          return [...prev, value]
        })
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on(`send-message:${cookies.roomId}`, onRetrieveMessage);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off(`send-message:${cookies.roomId}`, onRetrieveMessage);
      };
    }
  }, [hasInit])

  useEffect(() => {
    if (message) props.onRetrieve();
  }, [message]);

  const onExit = async () => {
    const [err, response] = await RoomService.ExitRoom();

    if (err) {
      alert(err);
      return
    }

    if (response) {
      removeCookie('tkn');
      removeCookie('roomId');
      removeCookie('username');

      setTimeout(() => {
        navigate("/");
      }, 1500)
    }
  }

  const onChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  }

  const onSend = async () => {
    const [err] =await MessageService.SendMessage(
      cookies.username,
      currentMessage
    )

    if (!err) setCurrentMessage("");
  }

  const isOwnChat = (sender: string) => {
    return sender === cookies.username
  }

  return {
    roomId: cookies.roomId,
    bottomRef,
    message,
    isConnected,
    currentMessage,
    onExit,
    onSend,
    onChange,
    isOwnChat
  }
}
