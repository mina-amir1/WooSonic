import { API_ENDPOINT } from "~/config";
import Cookies from "js-cookie";

const sendAuthenticatedRequest = async (
  endpoint: string,
  requestData: any,
  performLoginCheck: boolean = true
) => {
  try {
    const user_id = Cookies.get("user_id");
    const token = Cookies.get("token");
    if (performLoginCheck) {

    if (!user_id || !token) {
      console.log("PLZ LOGIN");
      return null;
    }
  }
    const apiUrl = `${API_ENDPOINT}/${endpoint}`;
    const requestBody = {
      user_id: user_id,
      token: token,
      ...requestData,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      // console.log("Request successful");
      const responseData = await response.json();
      return responseData as unknown;
    } else {
      console.log("Request failed");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};

const fetchUserInfo = async () => {
  return sendAuthenticatedRequest("my-account/get-user-info.php", {});
};

const fetchUserOrders = async () => {
  return sendAuthenticatedRequest("my-account/get-user-orders.php", {});
};

const updateProfile = async (userInfo: any) => {
  return sendAuthenticatedRequest("my-account/edit-profile.php", userInfo);
};

const updatePassword = async (currentPassword: string, newPassword: string) => {
  return sendAuthenticatedRequest('my-account/password/change-password.php', {
    current_password: currentPassword,
    new_password: newPassword,
  });
};

const forgotPassword = async (user_email: string) => {
  return sendAuthenticatedRequest("my-account/password/forgot-password.php", {
    user_email: user_email,
  });
};

const userRegister = async (formData: any) => {
  return sendAuthenticatedRequest("my-account/register.php", formData, false);
};

const userLogin = async (formData: any) => {
  const apiUrl = `${API_ENDPOINT}/my-account/login.php`;
  const requestBody = {
    username: formData.username,
    password: formData.password,
    remember: formData.remember,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      console.log("Login successful");
      const responseData = await response.json();
      return responseData;
    } else {
      console.log("Login failed");
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};


const getAllAddresses = async () => {
  try {
    const responseData = await sendAuthenticatedRequest("my-account/addresses/get-all-addresses.php", {});

    if (responseData && Array.isArray(responseData)) {
      responseData.sort((a, b) => {
        if (a.status === "default") return -1;
        if (b.status === "default") return 1;
        return 0;
      });

      return responseData;
    } else {
      console.log("Invalid response data");
      return null;
    }
  } catch (error) {
    console.log("An error occurred", error);
    return null;
  }
};


const addAddress = async (addressData: any) => {
  return sendAuthenticatedRequest("my-account/addresses/add-address.php", addressData);
};

const editAddress = async (addressData: any) => {
  return sendAuthenticatedRequest("my-account/addresses/edit-address.php", addressData);
};

const makeAddressDefault = async (addressId: number) => {
  return sendAuthenticatedRequest("my-account/addresses/make-default.php", {
    address_id: addressId,
  });
};
const removeAddress = async (addressId: number) => {
  return sendAuthenticatedRequest("my-account/addresses/remove-address.php", {
    address_id: addressId,
  });
};
const getDefaultAddress = async () => {
  return sendAuthenticatedRequest('my-account/addresses/get-default.php', {});
};

const addWishAPI = async (product_id: number) => {
  return sendAuthenticatedRequest('my-account/wishlist/add-to-wishlist.php', {
    product_id: product_id
  });
};
const removeWishAPI = async (product_id: number) => {
  return sendAuthenticatedRequest('my-account/wishlist/remove-from-wishlist.php', {
    product_id: product_id
  });
};
const getWishAPI = async () => {
  return sendAuthenticatedRequest('my-account/wishlist/get-user-wishlist.php', {});
};
const addBulkWishAPI = async (bulkProducts: number[]) => {
  const payload = {
    products: bulkProducts,
  };

  return sendAuthenticatedRequest('my-account/wishlist/bulk-add-wishlist.php', payload);
};

export {
  fetchUserInfo,
  fetchUserOrders,
  updateProfile,
  forgotPassword,
  userRegister,
  userLogin,
  getAllAddresses,
  addAddress,
  updatePassword,
  editAddress,
  makeAddressDefault,
  removeAddress,
  getDefaultAddress,
  addWishAPI,
  removeWishAPI,
  getWishAPI,
  addBulkWishAPI,
};
