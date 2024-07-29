import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {useAppContext} from "../../../Context/customHook";

const ProfileIcon = () => {
  const {user, logout} = useAppContext()
  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            name={user?.name}
            size="md"
            
            
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profileIcon" className="h-14 gap-2" textValue="Sign in email">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem textValue="Account Profile" key="profile">
            <Link to={"/profile"} className="text-inherit">
              Account Profile
            </Link>
          </DropdownItem>
          <DropdownItem textValue="Settings" key="settings">
            <Link to={"/settings"} className="text-inherit">
              Settings
            </Link>
          </DropdownItem>
          <DropdownItem textValue="Help & Feedback" key="faq">
            <Link to={"/faq"} className="text-inherit">
              Help & Feedback
            </Link>
          </DropdownItem>
          <DropdownItem textValue="Log out" key="logout" color="danger" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
