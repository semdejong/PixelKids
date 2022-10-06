import axios from "axios";
import handleResponse from "./responseHandler";

const Objects = {
  create: async (objectTypeId, data) => {
    const preparedData = {
      objectTypeId,
      data: data,
    };
    const response = await axios
      .post(`/api/object`, preparedData)
      .catch((err) => {
        return err.response;
      });

    handleResponse(response);

    return response;
  },
  amount: async (objectTypeId) => {
    const response = await axios
      .get(`/api/object/amount/${objectTypeId}`)
      .catch((err) => {
        return err.response;
      });

    handleResponse(response);

    return response;
  },
  get: async (objectTypeId, page, limit) => {
    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    if (!objectTypeId) {
      return { data: [] };
    }

    const response = await axios
      .get(`/api/object?objectType=${objectTypeId}&page=${page}&limit=${limit}`)
      .catch((err) => {
        return err.response;
      });

    handleResponse(response);

    return response;
  },
  delete: async (objectId) => {
    const response = await axios
      .delete(`/api/object/${objectId}`)
      .catch((err) => {
        return err.response;
      });

    handleResponse(response);

    return response;
  },
  update: async (objectId, data) => {
    const preparedData = {
      data: data,
    };
    const response = await axios
      .patch(`/api/object/${objectId}`, preparedData)
      .catch((err) => {
        return err.response;
      });

    handleResponse(response);

    return response;
  },
};

export default Objects;
