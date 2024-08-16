import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaBars, FaSun, FaMoon, FaCalendar, FaPlus, FaAddressBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const HCPLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(FaSun, FaMoon);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const navBg = useColorModeValue('white', 'gray.800');

  return (
    <Flex h="100vh" flexDirection="column" bg={bg}>
      <Flex as="nav" p="4" bg={navBg} shadow="md" justifyContent="space-between" alignItems="center">
        <IconButton aria-label="Menu" icon={<FaBars />} onClick={onOpen} />
        <Heading size="md">Doctor Dashboard</Heading>
        <Flex alignItems="center">
          <IconButton aria-label="Toggle color mode" icon={<colorModeIcon />} onClick={toggleColorMode} mr="4" />
          <Avatar name="Dr. John Doe" src="https://i.pravatar.cc/300" />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>
              <VStack align="stretch" spacing="4">
                <Button leftIcon={<FaCalendar />} variant="ghost" justifyContent="flex-start" onClick={() => navigate('/hcp/dashboard')}>Dashboard</Button>
                <Button leftIcon={<FaCalendar />} variant="ghost" justifyContent="flex-start"onClick={() => navigate('/hcp/appointments')}>Appointments</Button>
                <Button leftIcon={<FaAddressBook />} variant="ghost" justifyContent="flex-start" onClick={() => navigate('/hcp/profile')}>Profile</Button>
                <Button leftIcon={<FaCalendar />} variant="ghost" justifyContent="flex-start" onClick={() => navigate('/hcp/faq')}>Help & Feedback</Button>
                <Button leftIcon={<FaCalendar />} variant="ghost" justifyContent="flex-start" onClick={() => navigate('/hcp/resources')}>Resources</Button>
                <Button leftIcon={<FaPlus />} variant="ghost" justifyContent="flex-start" onClick={() => navigate('/hcp/appointmentcreate')}>New Appointment</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Flex flex="1">
        <Box flex="1" p="6">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default HCPLayout;
