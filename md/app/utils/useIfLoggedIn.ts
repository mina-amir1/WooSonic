import Cookies from "js-cookie";

function useIfLoggedIn() {
  const user_id = Cookies.get("user_id");
  const token = Cookies.get("token");

  if (!user_id || !token) {
    console.log("Please log in");
    return false;
  }

  return true;
}

export default useIfLoggedIn;
