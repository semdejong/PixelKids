import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const Objects = {
  create: async (objectTypeId, data) => {
    const preparedData = {
      objectTypeId,
      data: data,
    };
    const response = await axios
      .post(REACT_APP_BASE_URL + `/api/object`, preparedData)
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  amount: async (objectTypeId) => {
    const response = await axios
      .get(REACT_APP_BASE_URL + `/api/object/amount/${objectTypeId}`)
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  get: async (objectTypeId, page, limit, dataFilter, metaDataFilter) => {
    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    if (!objectTypeId) {
      return { data: [] };
    }

    let dataFilterString = "";
    let metaDataFilterString = "";

    for (const key in dataFilter) {
      if (dataFilter[key] !== "") {
        dataFilterString += `&${key}=${dataFilter[key]}`;
      }
    }

    for (const key in metaDataFilter) {
      if (metaDataFilter[key] !== "") {
        metaDataFilterString += `&${key}=${metaDataFilter[key]}`;
      }
    }

    const response = await axios
      .get(
        REACT_APP_BASE_URL +
          `/api/object?objectType=${objectTypeId}&page=${page}&limit=${limit}&dataFilter=1` +
          dataFilterString +
          "&metaDataFilter=1" +
          metaDataFilterString
      )
      .catch((err) => {
        return err.response;
      });

    return response;
  },
  delete: async (objectId) => {
    const response = await axios
      .delete(`/api/object/${objectId}`)
      .catch((err) => {
        return err.response;
      });

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

    return response;
  },
};

export default Objects;
