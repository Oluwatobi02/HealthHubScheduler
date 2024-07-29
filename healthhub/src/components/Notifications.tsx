import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface Notification {
  id: string;
  message: string;
}

interface NotificationsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  notis: Notification[];
}
interface NotificationItemProps {
    notification: Notification;
    }
const NotificationItem = ({ notification } : NotificationItemProps) => {
  return (
    <div className={`p-4 border-b bg-white"}`}>
      <div className="flex justify-between items-center">
        <h5
          className="cursor-pointer text-lg font-medium"
        >
          Notification Title
        </h5>
        
          <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">Unread</span>
      
      </div>
      <p className="mt-2 text-sm">{notification.message}</p>
    </div>
  );
};

const Notifications = ({ isOpen, onOpenChange, notis }: NotificationsProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="lg" scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Notifications</ModalHeader>
            <ModalBody>
              {notis.map((notification,index) => (
                <NotificationItem
                  key={index}
                  notification={notification}
                />
              ))}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Notifications;
