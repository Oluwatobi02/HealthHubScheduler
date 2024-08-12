import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
    Input,
  } from "@nextui-org/react";
  import { useAppContext } from "../Context/customHook";
  import React from "react";
  import { Link } from "react-router-dom";
  
  interface LoginFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  const LoginForm = ({ isOpen, onOpenChange }: LoginFormProps) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isStaff, setIsStaff] = React.useState(false);
    const { login, message } = useAppContext();
  
    const validate = () => {
      if (email === "" || password === "") {
        return false;
      }
      return true;
    };
  
    const handleSignIn = () => {
      if (validate()) {
        login(email, password, isStaff);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  // value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(e.target.value, 'email');
                  }}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  // value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(e.target.value, 'password');
                  }}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isSelected={isStaff}
                    onChange={(e) => {
                      setIsStaff(e.target.checked);
                      console.log(e.target.checked, 'isStaff');
                    }}
                  >
                    Are you a staff member?
                  </Checkbox>
                  <Link color="primary" to="#">
                    Forgot password?
                  </Link>
                </div>
                <div
                  className={`text-${
                    message.success ? "green" : "red"
                  }-500 text-sm`}
                >
                  {message.message}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => onClose()}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSignIn}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default LoginForm;
  