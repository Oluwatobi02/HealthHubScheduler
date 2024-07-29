import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const Authorize = () => {
  const [value, setValue] = useState<string>("patient");
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if(sessionStorage.length > 1) {
      console.log(sessionStorage.length)
      sessionStorage.getItem('role') === 'patient' ? window.location.href = "/dashboard" : window.location.href = "/logout"
    }
  },[isLoading])
  const handleNext = async () => {
    window.location.href = "/dashboard";
    
    const res = await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: user?.email, name: user?.name, picture: user?.picture, role: value})
    })
    const data = await res.json();
    if (data.success) {
      sessionStorage.setItem("role", value);
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("userId", data.id)
      sessionStorage.setItem('name', data.name)
      sessionStorage.setItem('email', data.email)
      sessionStorage.setItem('picture', data.picture)
      window.location.href = "/dashboard";
    }
    else {
      window.location.href = `/register?role=${value}`;
    }
  };
  return (
    <>
      {isAuthenticated && !isLoading && (
        <Modal isOpen={true} placement="top-center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Select Role
            </ModalHeader>
            <ModalBody>
              <RadioGroup
                defaultValue={value}
                onChange={(e) => setValue(e.target.value)}
                size="lg"
                orientation="horizontal"
              >
                <div className="flex gap-16">
                  <Radio value="patient">Patient</Radio>
                  <Radio value="professional">Staff</Radio>
                </div>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleNext}>
                Next
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Authorize;
