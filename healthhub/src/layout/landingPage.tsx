import { Button, useDisclosure } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUserMd, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';
import LoginForm from '../auth/loginForm';
import { useState } from 'react';
import SignupForm from '../auth/signupForm';

const LandingPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center py-10">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 px-4 md:px-8 lg:px-16"
            >
                <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Health Hub Scheduler</h1>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                    The most intuitive and powerful tool for managing your health and appointments. Organize your medical life with ease and efficiency.
                </p>
                <Button 
                    onPress={() => {
                        onOpen()
                        setShowSignup(false) 
                }}
                    size='lg' 
                    className='bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-green-500 hover:to-teal-600 transition duration-300 ease-in-out mx-2'
                >
                    Log In
                </Button>
                <Button 
                    onPress={() => setShowSignup(prev => !prev)} 
                    size='lg' 
                    className='bg-gradient-to-r from-green-400 to-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-green-500 hover:to-teal-600 transition duration-300 ease-in-out mx-2'
                >
                    Get Started
                </Button>
            </motion.div>
            <LoginForm isOpen={isOpen} onOpenChange={onOpenChange} />
            {showSignup && <SignupForm />}

            {/* Features Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16">
                {[
                    { icon: <FaHeartbeat className="text-4xl text-green-500 mb-4" />, title: 'Health Tracking', description: 'Keep track of your health metrics and stay informed about your well-being.' },
                    { icon: <FaUserMd className="text-4xl text-green-500 mb-4" />, title: 'Doctor Appointments', description: 'Schedule and manage your appointments with healthcare professionals.' },
                    { icon: <FaCalendarAlt className="text-4xl text-green-500 mb-4" />, title: 'Calendar Integration', description: 'Integrate with your calendar to keep track of all your health-related events.' },
                    { icon: <FaShieldAlt className="text-4xl text-green-500 mb-4" />, title: 'Secure and Private', description: 'Your data is encrypted and secured to ensure privacy and safety.' },
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg"
                    >
                        {feature.icon}
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
