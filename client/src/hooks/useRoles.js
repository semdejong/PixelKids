import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import {
  getRoles as getRolesAPI,
  updateRole as updateRoleAPI,
  addRole as addRoleAPI,
} from "../API/Factory";

import notification from "../Components/Notification";

export default function useUsers() {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const rolesQuery = useQuery(["roles", page, limit], () =>
    getRolesAPI(page, limit)
  );

  const queryClient = useQueryClient();

  const changePagination = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    rolesQuery.refetch();
  };

  useEffect(() => {
    setRoles(rolesQuery.data);
  }, [rolesQuery.data]);

  const addRole = async (name, description) => {
    const response = await addRoleAPI(name, description);

    if (response.status === 200) {
      queryClient.invalidateQueries(["roles"]);
      rolesQuery.refetch();

      notification(
        "Role added successfully",
        `the role ${name} has been added successfully`,
        "success"
      );
    }

    return response;
  };

  const updateRole = async (id, updateProperty, updatedValue) => {
    const response = await updateRoleAPI({
      id: id,
      [updateProperty]: updatedValue,
    });

    if (response.status === 200) {
      queryClient.invalidateQueries(["roles"]);
      rolesQuery.refetch();

      notification(
        "Role has been updated",
        `Role ${id}'s ${updateProperty} has been set to ${response.data[updateProperty]}`,
        "success"
      );
    }
    return response;
  };

  const deleteRole = async (id) => {
    const response = await updateRoleAPI({
      id: id,
      isArchived: true,
    });

    if (response.status === 200) {
      queryClient.invalidateQueries(["roles"]);
      rolesQuery.refetch();

      notification(
        "Role has been deleted",
        `Role ${id} has been deleted`,
        "success"
      );
    }
    return response;
  };

  return {
    roles,
    loading: rolesQuery.isLoading,
    updateRole,
    deleteRole,
    changePagination,
    addRole,
    page,
    limit,
    setPage,
    setLimit,
  };
}
