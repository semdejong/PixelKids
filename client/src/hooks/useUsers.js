import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import {
  getUsers as getUsersAPI,
  updateUser as updateUserAPI,
} from "../API/Factory";

import notification from "../Components/Notification";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const userQuery = useQuery(["users", page, limit], () =>
    getUsersAPI(page, limit)
  );

  const queryClient = useQueryClient();

  const changePagination = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    userQuery.refetch();
  };

  useEffect(() => {
    setUsers(userQuery.data);
  }, [userQuery.data]);

  const updateUser = async (id, updateProperty, updatedValue) => {
    const response = await updateUserAPI({
      id: id,
      [updateProperty]: updatedValue,
    });

    if (response.status === 200) {
      queryClient.invalidateQueries(["users"]);
      userQuery.refetch();

      notification(
        "User has been updated",
        `User ${id}'s ${updateProperty} has been set to ${response.data[updateProperty]}`,
        "success"
      );
    }
    return response;
  };

  return {
    users,
    loading: userQuery.isLoading,
    updateUser,
    changePagination,
    page,
    limit,
    setPage,
    setLimit,
  };
}
