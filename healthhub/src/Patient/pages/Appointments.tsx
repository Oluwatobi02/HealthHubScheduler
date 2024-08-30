import React, { SyntheticEvent, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Button, Divider, List, Modal, Header, Loader, Input, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaSearch, FaCalendarDay, FaDownload, FaEllipsisH } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Spinner, } from '@nextui-org/react';
import { useAppContext } from '../../Context/customHook';
import {  FAppointment } from '../../types/types';

const AppointmentPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<FAppointment>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [appointments, setAppointments] = useState<FAppointment[]>()
  const {user, token} = useAppContext()
  
  const navigate = useNavigate();
  const filterOptions = ['All', 'Upcoming', 'Past'];
  const filteredAppointments = appointments?.
  filter(appointment => filterType === 'All' || appointment.status === filterType.toLowerCase()).
  filter(appointment => appointment.date?.includes(searchTerm) || appointment.health_care_professional.name?.toLowerCase().includes(searchTerm.toLowerCase()));

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

  const handleFilterChange = (_: SyntheticEvent, { value }: DropdownProps) => {
    if (typeof value === 'string') {
      setFilterType(value);
    } else {
      console.error('Expected a string value for filter type');
    }
  }

  const handleAppointmentClick = (appointment : FAppointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const getAppointment = async () => {
    const res = await fetch(`http://localhost:5000/appointments/?patientid=${user.id}&all=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    setAppointments(data.appointments)
  }
  useEffect(() => {
    getAppointment()
  },[])

  if (!appointments) {
    return <Spinner color='success' size="lg" className='w-full ml-auto mt-4'/>;
  }
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
            color='orange'
            onClick={() => console.log('Download appointment summary')}
          >
            <FaDownload className="mr-2" />
            Download Summary
          </Button>
        </div>

        <Card fluid className="shadow-xl rounded-lg bg-white border border-gray-200">
          <Card.Content>
            <Card.Header className="text-3xl font-semibold text-gray-900 flex items-center">
              <FaCalendarAlt className="text-gray-600 mr-3" />
              Appointments
            </Card.Header>
            <Divider />
            <List divided relaxed>
              {filteredAppointments?.slice(0, showMore ? filteredAppointments.length : 5).map(appointment => (
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
                        <strong>Date & Time:</strong> {appointment.date}
                      </div>
                      <div className="flex items-center mb-1">
                        <FaUserMd className="text-gray-500 mr-2" />
                        <strong>Doctor:</strong> {appointment.health_care_professional.name}
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
              {filteredAppointments && filteredAppointments.length > 5 && !showMore && (
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
              <h2 className="text-2xl font-semibold text-gray-800">{selectedAppointment.date}</h2>
              <p className="text-gray-600 mt-2"><strong>Doctor:</strong> {selectedAppointment.health_care_professional.name}</p>
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
