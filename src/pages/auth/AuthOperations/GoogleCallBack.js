import axios from "axios";
import { useEffect } from "react";
import { baseURL, Google_Call_Back } from "../../../api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  // States
  const cookie = Cookie();
  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        let res = await axios.get(
          `${baseURL}/${Google_Call_Back}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (error) {
        console.log(error);
      }
    }
    GoogleCall();
  }, []);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
