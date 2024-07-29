import { Card, Button } from '@nextui-org/react';
import { FaHeartbeat, FaBook, FaHospital, FaGlobe } from 'react-icons/fa';

const HealthcareAndResources = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Healthcare and Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Healthcare Section */}
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <div className="flex items-center mb-4">
              <FaHeartbeat className="text-red-500 text-3xl mr-4" />
              <h2 className="text-2xl font-semibold">Healthcare Services</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Explore a range of healthcare services provided by our network of professionals. 
              From general health checks to specialized treatments, find the right service for you.
            </p>
            <Button color="primary">Learn More</Button>
          </Card>
          
          {/* Resources Section */}
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <div className="flex items-center mb-4">
              <FaBook className="text-blue-500 text-3xl mr-4" />
              <h2 className="text-2xl font-semibold">Educational Resources</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Access a variety of educational materials and resources to help you understand more about health 
              and wellness. Stay informed with articles, guides, and research.
            </p>
            <Button color="primary">Explore Resources</Button>
          </Card>

          {/* Facilities Section */}
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <div className="flex items-center mb-4">
              <FaHospital className="text-green-500 text-3xl mr-4" />
              <h2 className="text-2xl font-semibold">Facilities</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Discover the facilities available at our partner locations. From advanced medical equipment to 
              comfortable waiting areas, learn more about our state-of-the-art facilities.
            </p>
            <Button color="primary">View Facilities</Button>
          </Card>
          
          {/* Global Health Initiatives Section */}
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <div className="flex items-center mb-4">
              <FaGlobe className="text-yellow-500 text-3xl mr-4" />
              <h2 className="text-2xl font-semibold">Global Health Initiatives</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Learn about our global health initiatives and how we're working to improve health outcomes worldwide. 
              Join our mission to make a difference.
            </p>
            <Button color="primary">Join Us</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthcareAndResources;
