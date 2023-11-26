import { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie";

const pageProtected = ['/room'];

export default (Component: () => JSX.Element | React.ReactNode) => {
  const WrapperComponent = () => {
    const location = useLocation();
    const [cookies] = useCookies(["tkn"]);

    useEffect(() => {
      if (!cookies.tkn && pageProtected.includes(location.pathname)) {
        window.location.href = "/"
      }

      if (cookies.tkn && !pageProtected.includes(location.pathname)) {
        window.location.href = "/room"
      }
    }, [cookies.tkn, location.pathname]);

    return <Component />;
  }

  return WrapperComponent;
}
