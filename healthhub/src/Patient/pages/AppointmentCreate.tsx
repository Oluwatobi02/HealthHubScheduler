import { useEffect, useState } from 'react';
import { Button, Card, DateValue } from '@nextui-org/react';
import { DatePicker } from '@nextui-org/react';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Input as SemanticInput, Dropdown } from 'semantic-ui-react';
import { Appointment, HealthCareProfessional } from '../../types/types';
import { useAppContext } from '../../Context/customHook';

const CreateAppointment = () => {
  const {token} = useAppContext()
  const [professionals, setProfessionals] = useState<HealthCareProfessional[]>()
  const [appointment, setAppointment] = useState<Appointment>({patient_id: '66a2ef8b07eae60ee8993d51' , health_care_professional_id:'66bc31816c28157232150188' })
  const [date, setDate] = useState<DateValue>();
  const [time, setTime] = useState('');
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const navigate = useNavigate();

  const getHcp = async () => {
    const res = await fetch('http://localhost:5000/healthcareprofessionals/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      })
      const data = await res.json()
      setProfessionals(data)

  }
const makeAppointment = async () => {
  const res = await fetch('http://localhost:5000/appointments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointment),
  });
  const data = await res.json();
  console.log(data)
  if (data.success) {
    // alert(data.message);
    navigate('/dashboard');
  }
  else {
    setDisableButton(true)
    alert(data.message)
  }
}

useEffect(() => {
  getHcp()
}, [])

const validateAppointment = () => {
  if (!date || !time || !appointment?.health_care_professional_id || !appointment?.reason) return false
  const datePicked = new Date(date.year, date.month-1, date?.day, Number(time.split(':')[0]), Number(time.split(':')[1]))
  const valid = Date.now() < datePicked.getTime()
  if (valid) {
    setAppointment({...appointment, date: datePicked.toISOString()})
    setDisableButton(false)
    return true
  }
  return false
}

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
              onChange={(e,data) => setAppointment({...appointment, health_care_professional_id: String(data.value)})}
              options={professionals?.map((prof, index) => ({
                key: index,
                value: prof.id,
                text: (
                  <div className="flex items-center">
                    <img
                      src='https://via.placeholder.com/50'
                      alt={prof.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="font-semibold">{prof.name}</div>
                      <div className="text-sm text-gray-600">{prof.specialization}</div>
                    </div>
                  </div>
                )
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
              onChange={(e) => setAppointment({...appointment, reason: e.target.value})}
            />
          </div>
        </div>
        <Button color='default' size='lg' className='w-full' onClick={validateAppointment}>
          Validate
        </Button>
        {!disableButton && <Button
          color="primary"
          size="lg"
          className="w-full"
          disabled={disableButton}
          onClick={() => {
            const valid = validateAppointment()
            if (!valid) return
            console.log(appointment)
            makeAppointment()
          }}
        >
          Create Appointment
        </Button>}
      </Card>
    </div>
  );
};

export default CreateAppointment;
