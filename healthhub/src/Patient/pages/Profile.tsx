import { Card, Button } from '@nextui-org/react';
import { FaEdit } from 'react-icons/fa';
import { useAppContext } from '../../../Context/customHook';

const ProfilePage = () => {
     
  const {user} = useAppContext()
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="shadow-lg rounded-lg p-6 max-w-4xl mx-auto bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Patient Profile</h2>

        <div className="space-y-6">
          {/* Patient Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span>{user?.medical_record.basic_info.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{user?.medical_record.basic_info.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{user?.medical_record.basic_info.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{user?.medical_record.basic_info.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Home Number:</span>
                <span>{user?.medical_record.basic_info.home_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Work Number:</span>
                <span>{user?.medical_record.basic_info.work_number}</span>
              </div>
            </div>
            <Button className="mt-4" color="primary" startContent={<FaEdit />}>
              Edit
            </Button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{user?.medical_record.emergency_contact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span>{user?.medical_record.emergency_contact.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{user?.medical_record.emergency_contact.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Home Number:</span>
                <span>{user?.medical_record.emergency_contact.home_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Work Number:</span>
                <span>{user?.medical_record.emergency_contact.work_number}</span>
              </div>
            </div>
            <Button className="mt-4" color="primary" startContent={<FaEdit />}>
              Edit
            </Button>
          </div>

          {/* Medical History */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Medical History</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Allergies:</span>
                <span>{user?.medical_record.medical_history.allergies}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Medical Problems:</span>
                <span>{user?.medical_record.medical_history.medical_problems}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Medications:</span>
                <span>{user?.medical_record.medical_history.medications}</span>
              </div>
            </div>
            <Button className="mt-4" color="primary" startContent={<FaEdit />}>
              Edit
            </Button>
          </div>

          {/* Appointments */}
          {/* <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {user?.appointments.map((appt) => (
                <div key={appt.id} className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                  <div>
                    <div className="font-semibold">{appt.date}</div>
                    <div className="text-sm text-gray-600">{appt.time}</div>
                  </div>
                  <div className="text-sm text-gray-800">{appt.doctor}</div>
                </div>
              ))}
              {patient.appointments.length === 0 && (
                <p className="text-gray-500">No upcoming appointments</p>
              )}
            </div>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
