import axios from "axios";
import { Config } from "../config";

export const fetchData = async (url, config = null) => {
  let response;

  try {
    response = await axios.get(Config.BASE_URL + url, config);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
  return response;
};

export const fetchPostData = async (url, data, config=null)=>{
  let response;
  try {
    response = await axios.post(Config.BASE_URL + url,data,config);
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
  return response;
}