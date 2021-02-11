import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, product, {
    headers: {
      authtoken,
    },
  });