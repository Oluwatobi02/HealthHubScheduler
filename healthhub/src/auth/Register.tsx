import { useAuth0 } from "@auth0/auth0-react";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const Register = () => {
  const query = new URLSearchParams(useLocation().search);
  const role = query.get("role");
  const {user, isAuthenticated, isLoading } = useAuth0();


  const handleRegister = async () => {
    const res = await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: user?.email, name:user?.name, picture: user?.picture})
    })
    const data = await res.json();
    if (data.success && role) {
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("userId", data.id)
      sessionStorage.setItem('name', data.name)
      sessionStorage.setItem('email', data.email)
      sessionStorage.setItem('picture', data.picture)
      window.location.href = '/dashboard'
    }
    else {
      window.location.href = '/logout'
    }
  };
  return (
    <>
      {isAuthenticated && !isLoading && (
        <Modal isOpen={true} placement="top-center">
          <ModalContent>
            <ModalBody>
              <Button
                onClick={() => {
                  isAuthenticated && !isLoading && handleRegister();
                }}
              >
                Create Account
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Register;
