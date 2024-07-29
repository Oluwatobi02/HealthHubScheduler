import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authorize from "./auth/Authorize";
import Register from "./auth/Register";
import Layout from "./layout/Layout";
import LandingPage from "./layout/landingPage";
import Dashboard from "./Patient/pages/Dashboard";
import Appointments from "./Patient/pages/Appointments";
import Appointment from "./Patient/pages/Appointment";
import CreateAppointment from "./Patient/pages/AppointmentCreate";
import ProfessionalsPage from "./Patient/pages/Professionals";
import HealthcareAndResources from "./Patient/pages/HealthCareResources";
import ProfilePage from "./Patient/pages/Profile";
import Settings from "./Patient/pages/Settings";
import FAQPage from "./Patient/pages/faq";
import { UserProvider } from "../Context/userContext";
import DetailedResource from "./Patient/pages/Resources";
import HCPLayout from "./layout/hcpLayout";
import HCPProfile from "./hcp/pages/hcpProfile";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import HCPAppointments from "./hcp/pages/hcpAppointments";
import HCPAppointmentDetailsPage from "./hcp/pages/hcpAppointmentDetails";

const mockAppointment = {
  id: 1,
  date: "2024-08-01",
  time: "10:00 AM",
  location: "Room 301, Health Hub Clinic",
  reason: "Routine Check-up and Blood Pressure Monitoring",
  doctor: {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    contact: "+1-234-567-8900",
    photo: "https://via.placeholder.com/100",
  },
  patient: {
    name: "Jane Smith",
    age: 29,
    contact: "+1-987-654-3210",
    photo: "https://via.placeholder.com/100",
  },
  prescriptions: [
    { name: "Aspirin", details: "Take 1 tablet daily with food." },
    { name: "Lisinopril", details: "Take 10 mg once a day." },
  ],
  remarks:
    "Patient showed good improvement in blood pressure. Continue with the current medication and schedule a follow-up in 3 months.",
};

const PatientLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route
          path="/appointments/:id"
          element={<Appointment appointment={mockAppointment} />}
        />
        <Route path="/resources/:id" element={<DetailedResource />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
        <Route path="/professionals" element={<ProfessionalsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/resources" element={<HealthcareAndResources />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authorize" element={<Authorize />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hcp/*" element={<HCP />} />
            <Route path="/*" element={<PatientLayout />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}
export default App;

const HCP = () => {
  const theme = extendTheme({
    fonts: {
      heading: "Helvetica, Arial, sans-serif",
      body: "Helvetica, Arial, sans-serif",
    },
  });
  return (
    <>
      <ChakraProvider theme={theme}>
        <HCPLayout>
          <Routes>
            <Route path="/dashboard" element={<>Hello</>} />
            <Route path="/appointments" element={<HCPAppointments />} />
            <Route
              path="/appointments/:id"
              element={<HCPAppointmentDetailsPage />}
            />
            <Route path="/profile" element={<HCPProfile />} />
          </Routes>
        </HCPLayout>
      </ChakraProvider>
    </>
  );
};