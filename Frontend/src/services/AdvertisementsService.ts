import axios from "axios";

export type AdverisementsDTO = {};

const AdvertisementsService = {
  getAllAdverisements: async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/advertisement/getAllAdvertisements"
    );
    return response.data;
  },
};
export default AdvertisementsService;
