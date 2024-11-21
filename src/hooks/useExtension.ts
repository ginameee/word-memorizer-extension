import { useEffect, useRef, useState } from "react";
import { events } from "../constants/extension";

const useExtension = () => {
  const [extensionId, setExtensionId] = useState<string>("");

  const eventQueueRef = useRef<
    {
      id: number;
      resolve: (value: any) => void;
      reject: (reason?: any) => void;
    }[]
  >([]);

  const sendMessage = (
    event: (typeof events)[keyof typeof events],
    data?: any
  ) => {
    const id = new Date().getTime();

    const promise = new Promise((resolve, reject) => {
      eventQueueRef.current.push({ id, resolve, reject });
    });

    window.postMessage(
      {
        type: event,
        id,
        data,
      },
      "*"
    );

    return promise;
  };

  useEffect(() => {
    const responseEvents = Object.values(events).map(
      (event) => `${event}_RESPONSE`
    );

    const listener = (event: MessageEvent) => {
      if (Object.values(responseEvents).includes(event.data.type)) {
        const queueItem = eventQueueRef.current.find(
          (item) => item.id === event.data.id
        );

        if (queueItem) {
          queueItem.resolve(event.data.response);
          eventQueueRef.current = eventQueueRef.current.filter(
            (item) => item.id !== event.data.id
          );
        }
      }
    };

    window.addEventListener("message", listener);

    if (extensionId === "") {
      sendMessage(events.GET_EXTENSION_ID).then((response: any) => {
        setExtensionId((response.extensionId ?? "") as string);
      });
    }

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return {
    sendMessage,
    extensionId,
  };
};

export default useExtension;
