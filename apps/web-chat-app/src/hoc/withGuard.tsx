import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

const pageProtected = ['/room'];

export default (Component: () => JSX.Element | React.ReactNode) => {
  const WrapperComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies(["tkn", 'roomId']);

    useEffect(() => {
        if (!cookies.tkn && pageProtected.includes(location.pathname)) {
          navigate("/")

          return;
        }

      if (cookies.tkn && !pageProtected.includes(location.pathname)) {
        navigate("/room/"+cookies.roomId)

        return;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.roomId, cookies.tkn, location.pathname]);

    return <Component />;
  }

  return WrapperComponent;
}
