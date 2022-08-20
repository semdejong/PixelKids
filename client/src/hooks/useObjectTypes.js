import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import notification from "../Components/Notification";

import {
  getObjectTypes,
  addObjectType as addObjectTypeAPI,
} from "../API/Factory";

export default function useObjectTypes() {
  const [objectTypes, setObjectTypes] = useState([]);

  const objectTypesQuery = useQuery(["objectTypes"], () => getObjectTypes());

  const queryClient = useQueryClient();

  useEffect(() => {
    setObjectTypes(objectTypesQuery.data);
  }, [objectTypesQuery.data]);

  const addObjectType = async (name, description, fields, permissions) => {
    const response = await addObjectTypeAPI(
      name,
      description,
      fields,
      permissions
    );

    if (response.status === 200) {
      queryClient.invalidateQueries(["objectTypes"]);
      objectTypesQuery.refetch();

      notification(
        "ObjectType added successfully",
        `the ObjectType ${name} has been added successfully`,
        "success"
      );
    }

    return response;
  };

  return {
    objectTypes,
    loading: objectTypesQuery.isLoading,
    addObjectType,
  };
}
