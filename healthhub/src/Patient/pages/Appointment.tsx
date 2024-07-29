import { Card, Icon, Button, Divider, Grid, Header, List} from 'semantic-ui-react';
import { FaUserMd, FaCalendarDay, FaMapMarkerAlt, FaNotesMedical, FaFilePrescription } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
interface AppointmentProps {
  appointment: {
    id: number;
    date: string;
    time: string;
    location: string;
    reason: string;
    doctor: {
      name: string;
      specialty: string;
      contact: string;
    };
    patient: {
      name: string;
      age: number;
      contact: string;
    };
    prescriptions: {
      name: string;
      details: string;
    }[];
  };
}
const Appointment = ({ appointment }: AppointmentProps) => {
  const navigate = useNavigate();

  if (!appointment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header as='h1' className="text-4xl font-bold text-gray-900 mb-8">
        Appointment Details
      </Header>

      <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200 mb-8">
        <Card.Content>
          <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
            <FaCalendarDay className="text-gray-600 mr-4" />
            {appointment.date} at {appointment.time}
          </Card.Header>
          <Divider />
          <Grid columns={2} divided>
            <Grid.Column>
              <Header as='h3' className="text-xl font-semibold text-gray-700 mb-4">
                <FaUserMd className="text-gray-600 mr-2" />
                Doctor Details
              </Header>
              <List>
                <List.Item>
                  <strong>Name:</strong> {appointment.doctor.name}
                </List.Item>
                <List.Item>
                  <strong>Specialty:</strong> {appointment.doctor.specialty}
                </List.Item>
                <List.Item>
                  <strong>Contact:</strong> {appointment.doctor.contact}
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' className="text-xl font-semibold text-gray-700 mb-4">
                <FaUserMd className="text-gray-600 mr-2" />
                Patient Details
              </Header>
              <List>
                <List.Item>
                  <strong>Name:</strong> {appointment.patient.name}
                </List.Item>
                <List.Item>
                  <strong>Age:</strong> {appointment.patient.age}
                </List.Item>
                <List.Item>
                  <strong>Contact:</strong> {appointment.patient.contact}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>

      <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200 mb-8">
        <Card.Content>
          <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
            <FaNotesMedical className="text-gray-600 mr-4" />
            Appointment Reason
          </Card.Header>
          <Divider />
          <Card.Description className="text-gray-700">
            {appointment.reason}
          </Card.Description>
        </Card.Content>
      </Card>

      <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200 mb-8">
        <Card.Content>
          <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
            <FaFilePrescription className="text-gray-600 mr-4" />
            Prescriptions
          </Card.Header>
          <Divider />
          <List>
            {appointment.prescriptions.length > 0 ? (
              appointment.prescriptions.map((prescription, index) => (
                <List.Item key={index} className="mb-4">
                  <strong>{prescription.name}:</strong> {prescription.details}
                </List.Item>
              ))
            ) : (
              <List.Item>No prescriptions provided.</List.Item>
            )}
          </List>
        </Card.Content>
      </Card>

      <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200 mb-8">
        <Card.Content>
          <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
            <FaMapMarkerAlt className="text-gray-600 mr-4" />
            Appointment Location
          </Card.Header>
          <Divider />
          <Card.Description className="text-gray-700">
            {appointment.location}
          </Card.Description>
        </Card.Content>
      </Card>

      <Button
        color='blue'
        size='large'
        onClick={() => navigate('/appointments')}
        className="flex items-center"
      >
        <Icon name='arrow left' className="mr-2" />
        Back to Appointments
      </Button>
    </div>
  );
};

export default Appointment;
