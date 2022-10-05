import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import notification from "../Components/Notification";

import {
  getObjectTypes,
  addObjectType as addObjectTypeAPI,
  deleteObjectType as deleteObjectTypeAPI,
} from "../API/Factory";

export default function useObjectTypes() {
  const [objectTypes, setObjectTypes] = useState([]);

  const objectTypesQuery = useQuery(["objectTypes"], () => getObjectTypes());

  const queryClient = useQueryClient();

  useEffect(() => {
    setObjectTypes(objectTypesQuery.data);
  }, [objectTypesQuery.data]);

  const addObjectType = async (
    name,
    description,
    fields,
    permissions,
    adminOnly,
    nonUser
  ) => {
    if (!name || name.trim() === "") {
      notification("Error", "Please enter a name for the object type", "error");
      return;
    }

    const response = await addObjectTypeAPI(
      name,
      description,
      fields,
      permissions,
      adminOnly,
      nonUser
    );

    if (response.status === 200) {
      queryClient.invalidateQueries(["objectTypes"]);
      objectTypesQuery.refetch();

      notification(
        "ObjectType added successfully",
        `the ObjectType ${name} has been added successfully`,
        "success"
      );
    } else {
      notification(
        "ObjectType not added",
        `reason: ${response.data.message}`,
        "error"
      );
    }

    return response;
  };

  const deleteObjectType = async (id) => {
    const response = await deleteObjectTypeAPI(id);

    if (response.status === 200) {
      queryClient.invalidateQueries(["objectTypes"]);
      objectTypesQuery.refetch();

      notification(
        "ObjectType deleted successfully",
        `the ObjectType ${id} has been deleted successfully`,
        "success"
      );
    }
  };
  return {
    objectTypes,
    loading: objectTypesQuery.isLoading,
    addObjectType,
    deleteObjectType,
  };
}
