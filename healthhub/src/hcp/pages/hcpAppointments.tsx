// import { useState } from 'react';
// import {
//   Box,
//   Flex,
//   Heading,
//   Button,
//   Input,
//   Select,
//   Stack,
//   Divider,
//   Text,
//   Avatar,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import { FaCalendar, FaClock, FaPlus, FaSearch } from 'react-icons/fa';
// import { FAppointment } from '../../types/types';

// const appointments = [
//   {
//     id: 1,
//     patientName: 'Jane Doe',
//     time: '10:00 AM - 10:30 AM',
//     date: 'July 28, 2024',
//     profilePic: 'https://i.pravatar.cc/300',
//     details: 'Routine check-up and consultation.',
//   },
//   {
//     id: 2,
//     patientName: 'John Smith',
//     time: '11:00 AM - 11:30 AM',
//     date: 'July 28, 2024',
//     profilePic: 'https://i.pravatar.cc/300',
//     details: 'Follow-up visit for previous diagnosis.',
//   },
//   // Add more appointments as needed
// ];

const HCPAppointments = () => {
  return <>Appointments</>
  // const [selectedDate, setSelectedDate] = useState('July 28, 2024');
  // const [selectedAppointment, setSelectedAppointment] = useState<FAppointment>();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleAppointmentClick = (appointment : FAppointment) => {
  //   setSelectedAppointment(appointment);
  //   setIsModalOpen(true);
  // };

  // return (
  //   <>
  //     <Flex justifyContent="space-between" alignItems="center" mb="4">
  //       <Heading size="lg">Appointments</Heading>
  //       <Button colorScheme="blue" leftIcon={<FaPlus />}>Add New Appointment</Button>
  //     </Flex>
  //     <Flex mb="6" justifyContent="space-between" alignItems="center">
  //       <Input placeholder="Search appointments" width="300px"><FaSearch /></Input>
  //       <Select width="200px" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
  //         <option value="July 28, 2024">July 28, 2024</option>
  //         <option value="July 29, 2024">July 29, 2024</option>
  //         {/* Add more dates as needed */}
  //       </Select>
  //     </Flex>

  //     <Divider mb="4" />

  //     <Stack spacing="4">
  //       {appointments.filter(app => app.date === selectedDate).map((appointment) => (
  //           <motion.div
  //           key={appointment.id}
  //           whileHover={{ scale: 1.02 }}
  //           transition={{ type: 'spring', stiffness: 300 }}
  //           onClick={() => handleAppointmentClick(appointment)}
  //           >
  //           <Flex p="4" bg={useColorModeValue('white', 'gray.800')} rounded="md" shadow="sm" alignItems="center" cursor="pointer">
  //             <Avatar src={appointment.profilePic} size="lg" mr="4" />
  //             <Box>
  //               <Text fontSize="xl" fontWeight="bold">{appointment.patientName}</Text>
  //               <Text><FaCalendar /> {appointment.date}</Text>
  //               <Text><FaClock /> {appointment.time}</Text>
  //             </Box>
  //           </Flex>
  //         </motion.div>
  //       ))}
  //     </Stack>
//               </>
//   );
};

export default HCPAppointments
