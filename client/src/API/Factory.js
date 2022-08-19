import axios from "axios";

export const getUsers = async (page, limit) => {
  const response = await axios
    .get(`/api/user?page=${page}&limit=${limit}`)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const updateUser = async (user) => {
  const response = await axios
    .patch(`/api/user/${user.id}`, user)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getRoles = async (page, limit) => {
  const response = await axios
    .get(`/api/role?page=${page}&limit=${limit}`)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const updateRole = async (role) => {
  const response = await axios
    .patch(`/api/role/${role.id}`, role)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const addRole = async (name, description) => {
  const response = await axios
    .post(`/api/role`, { name, description })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getObjectTypes = async () => {
  console.log("entered");
  const response = await axios.get(`/api/objecttype`).catch((err) => {
    return err.response;
  });

  console.log(response);

  return response;
};

export const addObjectType = async (name, description, fields, permissions) => {
  const response = await axios
    .post(`/api/objectType`, { name, description, fields, permissions })
    .catch((err) => {
      return err.response;
    });

  return response;
};
