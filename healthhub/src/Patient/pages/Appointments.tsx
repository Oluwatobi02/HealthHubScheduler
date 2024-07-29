import React, { SyntheticEvent, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Button, Divider, List, Modal, Header, Loader, Input, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaSearch, FaCalendarDay, FaDownload, FaEllipsisH } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Calendar, } from '@nextui-org/react';
interface selectedAppointment {
  id: number;
  doctor: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
}
const mockData = {
  appointments: [
    { id: 1, doctor: 'Dr. John Doe', date: '2024-08-01', time: '10:00 AM', location: 'Room 301', type: 'Routine Check-up', status: 'upcoming' },
    { id: 2, doctor: 'Dr. Jane Smith', date: '2024-08-05', time: '02:00 PM', location: 'Room 204', type: 'Consultation', status: 'upcoming' },
    { id: 3, doctor: 'Dr. Alice Johnson', date: '2024-07-20', time: '09:30 AM', location: 'Room 112', type: 'Follow-up', status: 'past' },
    { id: 4, doctor: 'Dr. Michael Brown', date: '2024-07-25', time: '01:00 PM', location: 'Room 405', type: 'Specialist Consultation', status: 'past' },
    // Add more data to demonstrate "load more" functionality
  ],
};

const AppointmentPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<selectedAppointment>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const filterOptions = ['All', 'Upcoming', 'Past'];
  const filteredAppointments = mockData.appointments
    .filter(appointment => filterType === 'All' || appointment.status === filterType.toLowerCase())
    .filter(appointment => appointment.date.includes(searchTerm) || appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShowMore(true);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: SyntheticEvent, { value }: DropdownProps) => {
    if (typeof value === 'string') {
      setFilterType(value);
    } else {
      console.error('Expected a string value for filter type');
    }
  }

  const handleAppointmentClick = (appointment : selectedAppointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900">Your Appointments</h1>
        <Button
          color="green"
          size="large"
          onClick={() => navigate('/appointments/create')}
          className="flex items-center"
        >
          <FaPlus className="mr-2" /> Schedule New Appointment
        </Button>
      </header>

      <section className="mb-8">
        <div className="flex items-center mb-6 space-x-4">
          <Input
            icon={<FaSearch />}
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/3"
          />
          <Dropdown
            placeholder='Filter'
            selection
            options={filterOptions.map(option => ({ key: option, text: option, value: option }))}
            value={filterType}
            className="w-1/4"
            onChange={handleFilterChange}
          />
          <Button
            icon
            labelPosition='left'
            color='blue'
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaCalendarDay className="mr-2" />
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </Button>
          <Button
            icon
            labelPosition='left'
            color='orange'
            onClick={() => console.log('Download appointment summary')}
          >
            <FaDownload className="mr-2" />
            Download Summary
          </Button>
        </div>

        {showCalendar && (
          <div className="mb-8">
            <Calendar />
          </div>
        )}

        <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200">
          <Card.Content>
            <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
              <FaCalendarAlt className="text-gray-600 mr-3" />
              Appointments
            </Card.Header>
            <Divider />
            <List divided relaxed>
              {filteredAppointments.slice(0, showMore ? filteredAppointments.length : 5).map(appointment => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <List.Item className="py-4 flex justify-between items-start bg-white rounded-lg mb-4 border border-gray-200 shadow-lg">
                    <List.Content>
                      <div className="flex items-center mb-1">
                        <FaCalendarDay className="text-gray-500 mr-2" />
                        <strong>Date & Time:</strong> {appointment.date} at {appointment.time}
                      </div>
                      <div className="flex items-center mb-1">
                        <FaUserMd className="text-gray-500 mr-2" />
                        <strong>Doctor:</strong> {appointment.doctor}
                      </div>
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <strong>Location:</strong> {appointment.location}
                      </div>
                      <div className="flex items-center mb-1">
                        <FaCalendarDay className="text-gray-500 mr-2" />
                        <strong>Type:</strong> {appointment.type}
                      </div>
                    </List.Content>
                    <Button
                      icon
                      color="blue"
                      onClick={() => handleAppointmentClick(appointment)}
                      className="ml-4"
                    >
                      <Icon name="info circle" />
                    </Button>
                  </List.Item>
                </motion.div>
              ))}
              {filteredAppointments.length > 5 && !showMore && (
                <List.Item className="py-4 flex justify-center items-center">
                  <Button
                    color="teal"
                    onClick={handleLoadMore}
                    className="flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader active inline size="small" className="mr-2" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaEllipsisH className="mr-2" />
                        Load More
                      </>
                    )}
                  </Button>
                </List.Item>
              )}
            </List>
          </Card.Content>
        </Card>
      </section>

      {selectedAppointment && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size='small'
        >
          <Header icon='info circle' content='Appointment Details' />
          <Modal.Content>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{selectedAppointment.date} at {selectedAppointment.time}</h2>
              <p className="text-gray-600 mt-2"><strong>Doctor:</strong> {selectedAppointment.doctor}</p>
              <p className="text-gray-600"><strong>Location:</strong> {selectedAppointment.location}</p>
              <p className="text-gray-600"><strong>Type:</strong> {selectedAppointment.type}</p>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

export default AppointmentPage;
