import { API_ENDPOINT } from "~/config";

const fetchUserInfo = async (user_id: number) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/get-user-info.php`;
    const requestData = {
      user_id: user_id,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
      // mode: "cors",
      // credentials: "include"
    });

    if (response.ok) {
      console.log("OK");
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Failed to fetch user information");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

const fetchUserOrders = async (user_id: number) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/get-user-orders.php`;
    const requestData = {
      user_id: user_id,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
      // mode: "cors",
    });

    if (response.ok) {
      const responseData = await response.json();
      const userOrders = responseData.map((orderData) => ({
        order_id: orderData.order_id,
        order_date: orderData.order_date,
        order_status: orderData.order_status,
        order_total: orderData.order_total,
      }));
      return userOrders;
    } else {
      console.log("Failed to fetch user orders");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

const updateProfile = async (userInfo: any, user_id: number) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/edit-profile.php`;
    const requestBody = {
      user_id: user_id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone: userInfo.phone,
      birth_day: userInfo.birth_day,
      birth_month: userInfo.birth_month,
      birth_year: userInfo.birth_year,
      gender: userInfo.gender,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      // mode: "cors",
      // credentials: "include"
    });

    if (response.ok) {
      console.log("Profile updated successfully");
      // Handle the successful profile update
    } else {
      console.log("Failed to update profile");
      // Handle the case when the API call fails
    }
  } catch (error) {
    console.log("An error occurred", error);
    // Handle any network or other errors
  }
};

const userLogin = async (formData: any) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/login.php`;
    const requestBody = {
      username: formData.username,
      password: formData.password,
      remember: formData.remember,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      console.log("Login successfully");
      const responseData = await response.json();
      return responseData; // Return the response data
    } else {
      console.log("Failed to Login");
      throw new Error("Login failed"); // Throw an error for failed login
    }
  } catch (error) {
    console.log("An error occurred", error);
    throw error; // Throw the error for further handling
  }
};

const forgotPassword = async (user_email: string) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/password/forgot-password.php`;
    const requestData = {
      user_email: user_email,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Failed forgot");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

const register = async ({ formData }: any) => {
  try {
    const apiUrl = `${API_ENDPOINT}/my-account/register.php`;
    const requestBody = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      birth_day: parseInt(formData.birth_day),
      birth_month: parseInt(formData.birth_month),
      birth_year: parseInt(formData.birth_year),
      gender: formData.gender,
    };
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Failed register");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

export {
  fetchUserInfo,
  fetchUserOrders,
  updateProfile,
  forgotPassword,
  register,
  userLogin,
};
