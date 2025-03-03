import Cookie from "cookie-universal";

export default async function HandleLogout() {
  const cookie = Cookie();
  cookie.remove("e-commerce");
  window.location.pathname = "/login";
}
