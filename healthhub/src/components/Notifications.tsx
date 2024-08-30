import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAppContext, useWebSocket } from "../Context/customHook";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  tag: string;
  created_at: string;
}

interface NotificationsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
}
interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <div className={`p-4 border-b bg-white"}`}>
      <div className="flex justify-between items-center">
        <h5 className="cursor-pointer text-lg font-medium">
          Notification Title
        </h5>

        <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
          Unread
        </span>
      </div>
      <p className="mt-2 text-sm">{notification.message}</p>
    </div>
  );
};

const Notifications = ({ isOpen, onOpenChange, onOpen }: NotificationsProps) => {
  const {registerEvent} = useWebSocket();
  const { token } = useAppContext();
  const [notis, setNotis] = useState<Notification[]>([]);
  const [notiDep, setNotiDep] = useState(true)

  useEffect(() => {
    registerEvent("notification", (data : boolean) => {
      console.log(data)
      setNotiDep((prev) => !prev)
    })
  },[registerEvent])
  const getNotifications = async () => {
    const res = await fetch("http://localhost:5000/patients/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setNotis(data);
  };
  useEffect(() => {
    getNotifications();
  }, [notiDep]);
  useEffect(() => {
    onOpen()
  },[notis])
  return (
    <>
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {notis.length}
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        size="2xl"
        scrollBehavior="inside"
        className="h-80"
        
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Notifications
              </ModalHeader>
              <ModalBody>
                {notis.map((notification, index) => (
                  <NotificationItem key={index} notification={notification} />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifications;
