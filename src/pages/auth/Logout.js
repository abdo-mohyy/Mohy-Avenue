import { logoutAPI } from "../../api/Api";
import { Axios } from "../../api/axios";

export default function Logout() {
  async function handleLogout() {
    try {
      await Axios.get(`/${logoutAPI}`);
    } catch (error) {
      console.log(error);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
