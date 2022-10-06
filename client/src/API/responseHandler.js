import notification from "../Components/Notification";

export default async function handleResponse(
  response,
  customSucces,
  customError
) {
  if (response.status - 200 >= 0 && response.status - 300 < 0) {
    if (customSucces) {
      notification(customSucces.title, customSucces.message, "success");
    }
  } else if (response.status !== 401) {
    if (customError) {
      notification(customError.title, customError.message, "error");
    }
    // } else {
    //   notification("Error", response.data.message, "error");
    // }

    if (
      response.data.message.includes("you are not a user within this tenant")
    ) {
      localStorage.removeItem("MYAcurrentTenant");
      window.location.reload();
    }
  } else {
    notification(
      "Expired Session",
      "Your session has expired. Please log in again.",
      "error"
    );
    document.cookie =
      "isAuth" +
      "=" +
      ";path=" +
      "/" +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie =
      "isAuth" +
      "=" +
      ";path=" +
      "/Auth" +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    window.location.replace("/auth/login");
    notification("Logout succesfull", "You have been logged out!", "success");
  }

  return response;
}
