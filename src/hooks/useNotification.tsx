import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";

export const useNotification = (
  isSuccess: boolean,
  isError: boolean,
  status: QueryStatus,
  error?:
    | { data: { message: string }; status: number }
    | FetchBaseQueryError
    | SerializedError
    | undefined,
  endpointName?: string
) => {
  useEffect(() => {
    updateNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const toastId = useRef<string | number>();

  const initialNotification = () => {
    return (toastId.current = toast("Processing...", {
      position: "bottom-right",
      autoClose: false,
    }));
  };

  const updateNotification = () => {
    if (toastId.current) {
      if (isSuccess) {
        toast.update(toastId.current, {
          render:
            endpointName === "updateItem"
              ? "Item updated"
              : endpointName === "addItem"
              ? "New item added"
              : endpointName === "deleteItem"
              ? "Item deleted"
              : "Processing",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
        return;
      }
      if (isError) {
        if (
          error &&
          "status" in error &&
          status === "rejected" &&
          error?.status === "FETCH_ERROR"
        ) {
          toast.update(toastId.current, {
            render: () =>
              `There is a problem with our server. Details: ${
                "error" in error && error.error
              }`,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
          });
          return;
        }
        toast.update(toastId.current, {
          render: () =>
            `Something went wrong. ${
              error &&
              "data" in error &&
              error.data &&
              typeof error.data === "object" &&
              "message" in error.data &&
              error.data.message
            }`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    }
  };

  return { initialNotification };
};
