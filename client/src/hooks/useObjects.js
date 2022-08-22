import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import Objects from "../API/Objects";
import useLoading from "./useLoading";

import notification from "../Components/Notification";

export default function useObjects(objectTypeIdDefault) {
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [objectTypeId, setObjectTypeId] = useState(objectTypeIdDefault);

  const { startLoading, stopLoading } = useLoading();

  const objectsQuery = useQuery(["objects", objectTypeId, page, limit], () =>
    Objects.get(objectTypeId, page, limit)
  );

  const queryClient = useQueryClient();

  const changePagination = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    objectsQuery.refetch();
  };

  const changeObjectType = async (objectTypeId) => {
    setObjectTypeId(objectTypeId);
    setLoading(true);
    await objectsQuery.refetch();
    setLoading(false);
  };

  useEffect(() => {
    setObjects(objectsQuery.data);
  }, [objectsQuery.data]);

  const createObject = async (objectTypeId, data) => {
    setLoading(true);
    const response = await Objects.create(objectTypeId, data);
    setLoading(false);
    if (response.status === 200) {
      notification("Success", "Object created successfully", "success");
      return true;
    } else {
      notification("Error", response.data.message, "error");
      return false;
    }
  };

  const amountOfObjects = async (objectTypeId) => {
    setLoading(true);
    const response = await Objects.amount(objectTypeId);
    setLoading(false);
    if (response.status === 200) {
      return response.data.amount;
    } else {
      return 0;
    }
  };

  return { objects, createObject, amountOfObjects, changeObjectType, loading };
}
