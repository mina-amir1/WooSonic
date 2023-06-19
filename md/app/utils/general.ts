import { API_ENDPOINT } from "~/config";

const sendRequest = async (endpoint: string, requestData: any) => {
  try {
    const apiUrl = `${API_ENDPOINT}/${endpoint}`;
    const requestBody = {
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

const fetchGovs = async () => {
  return sendRequest("shipping/getGovs.php", {});
};

const fetchAreas = async (govId: string) => {
  const requestData = { gov_id: govId };
  return sendRequest("shipping/getAreas.php", requestData);
};

export { fetchGovs, fetchAreas };
