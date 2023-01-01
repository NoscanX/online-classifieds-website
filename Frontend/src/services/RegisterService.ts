import axios from "axios";
import { RegistrationTypes } from "../types/AuthorizationTypes";

const RegisterService = {
  saveUser: async (user: RegistrationTypes) => {
    console.log("WTF");
    return axios({
      method: "POST",
      url: `user/register`,
      data: user,
      headers: {},
    });
  },

  // getAllUsers: async () => {
  //     const response = await axios.get(`${URL}/user/getAllUsers`)
  //     return response.data;
  // },
};
export default RegisterService;
