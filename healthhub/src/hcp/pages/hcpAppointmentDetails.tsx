import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Divider,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import HCPLayout from '../components/HCPLayout';

const appointments = [
  {
    id: 1,
    patientName: 'Jane Doe',
    time: '10:00 AM - 10:30 AM',
    date: 'July 28, 2024',
    profilePic: 'https://i.pravatar.cc/300',
    details: 'Routine check-up and consultation.',
    notes: 'Patient has been experiencing mild headaches and fatigue.',
  },
  {
    id: 2,
    patientName: 'John Smith',
    time: '11:00 AM - 11:30 AM',
    date: 'July 28, 2024',
    profilePic: 'https://i.pravatar.cc/300',
    details: 'Follow-up visit for previous diagnosis.',
    notes: 'Patient needs to follow up on blood test results.',
  },
  // Add more appointments as needed
];

const HCPAppointmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const appointment = appointments.find((app) => app.id === Number(id));

  return (
      <Flex direction="column" alignItems="center" bg={useColorModeValue('white', 'gray.800')} p="8" rounded="md" shadow="md">
        <Avatar src={appointment.profilePic} size="2xl" mb="4" />
        <Heading size="lg" mb="2">{appointment.patientName}</Heading>
        <Text fontSize="md" color="gray.500">{appointment.date}</Text>
        <Text fontSize="md" color="gray.500" mb="4">{appointment.time}</Text>
        <Divider mb="4" />
        <Box w="full" textAlign="left">
          <Heading size="md" mb="2">Details</Heading>
          <Text mb="4">{appointment.details}</Text>
          <Heading size="md" mb="2">Notes</Heading>
          <Text mb="4">{appointment.notes}</Text>
        </Box>
        <Stack direction="row" spacing="4">
          <Button colorScheme="blue">Edit Appointment</Button>
          <Button colorScheme="red">Cancel Appointment</Button>
        </Stack>
      </Flex>
  );
};

export default HCPAppointmentDetailsPage;
