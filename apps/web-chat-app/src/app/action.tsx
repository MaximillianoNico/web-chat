import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import RoomService from "../services/room";

interface ICredentials {
  username?: string;
  roomId?: string;
}

interface Room {
  _id: string;
  description: string;
  roomId: string;
  participant: string[];
  createdAt: string;
  __v: number;
}

interface ApiResponse {
  uptime: number;
  message: string;
  data: Room[];
  date: string;
}

interface UseRoomsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  uptime?: number;
  lastUpdated?: string;
}

export const useAction = () => {
  const [errors, setErrors] = useState("");
  const [credentials, setCredentials] = useState<ICredentials>({
    username: "",
    roomId: "",
  });

  const navigate = useNavigate();
  const [, setCookie] = useCookies(["tkn", "roomId", "username"]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (roomId: string, username: string) => {
    if (!roomId || !username) {
      setErrors("Username or Room Id is required");
      return;
    }

    const [err, response] = await RoomService.JoinRoom(
      username ?? "",
      roomId ?? ""
    );

    if (response?.error ?? err?.response?.data?.error) {
      setErrors(response?.error ?? err.response?.data?.error);

      return;
    }

    if (!err && response.data?.token) {
      setCookie("tkn", response?.data?.token ?? "");
      setCookie("roomId", roomId);
      setCookie("username", username);

      setErrors("");
      navigate(`/room/${roomId}`);
    }
  };

  return {
    errors,
    credentials,
    onChange,
    onSubmit,
  };
};

export const useRooms = (): UseRoomsReturn => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uptime, setUptime] = useState<number>();
  const [lastUpdated, setLastUpdated] = useState<string>();

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse = await response.json();

      if (apiResponse.message === "Ok" && apiResponse.data) {
        setRooms(apiResponse.data);
        setUptime(apiResponse.uptime);
        setLastUpdated(apiResponse.date);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch rooms";
      setError(errorMessage);
      console.error("Error fetching rooms:", err);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    refetch,
    uptime,
    lastUpdated,
  };
};
