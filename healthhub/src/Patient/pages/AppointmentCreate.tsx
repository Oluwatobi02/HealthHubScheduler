import { useState } from 'react';
import { Button, Card, DateValue } from '@nextui-org/react';
import { DatePicker } from '@nextui-org/react';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Input as SemanticInput, Dropdown } from 'semantic-ui-react';

const professionals = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', photo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
];
const CreateAppointment = () => {

  const [date, setDate] = useState<DateValue | null>(null);
  const [time, setTime] = useState('');
  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Card className="shadow-lg rounded-lg p-6 max-w-lg w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Appointment</h2>

        <div className="space-y-6">
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Date</p>
            <DatePicker
              aria-label="Date"
              value={date}
              onChange={(e) => setDate(e)}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Time</p>
            <SemanticInput
              aria-label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Select Time"
              className="border border-gray-300 rounded-lg p-2 w-full"
              icon={<FaClock />}
            />
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Professional</p>
            <Dropdown
              selection
              options={professionals.map((prof, index) => ({
                key: index,
                value: prof.id,
                text: (
                  <div className="flex items-center">
                    <img
                      src={prof.photo}
                      alt={prof.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-semibold">{prof.name}</div>
                      <div className="text-sm text-gray-600">{prof.specialty}</div>
                    </div>
                  </div>
                ),
              }))}
              className="w-full"
              placeholder="Select Professional"
            />
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Reason for Appointment</p>
            <SemanticInput
              aria-label="Reason"
              placeholder="Enter Reason for Appointment"
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate('/appointments')}
        >
          Create Appointment
        </Button>
      </Card>
    </div>
  );
};

export default CreateAppointment;
