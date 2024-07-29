import { useState } from 'react';
import { Avatar } from '@nextui-org/react'; // Using NextUI's Avatar component
import { motion } from 'framer-motion';
import { HiPencil } from 'react-icons/hi';

const HCPProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <header className="flex items-center space-x-4 mb-6">
        <Avatar
          src="/path-to-avatar.jpg" // Replace with actual image path
          size="md"
          className="transition-transform transform hover:scale-105"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">Dr. John Doe</h1>
          <p className="text-xl text-gray-600">Specialization: Cardiology</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-auto text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
        >
          <HiPencil className="text-xl" />
        </button>
      </header>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">dr.johndoe@example.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">(123) 456-7890</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">123 Health St, Suite 456</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Bio:</span>
            <span className="font-medium">Experienced cardiologist with 10 years in practice...</span>
          </div>
        </div>
      </motion.section>

      {/* Add more sections as needed */}
    </div>
  );
};

export default HCPProfile;
