import { useState } from 'react';
import { Button, Input, Card } from '@nextui-org/react';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const Settings = () => {
  const [email, setEmail] = useState('oldwhisper98@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Add save functionality here
    console.log('Settings saved');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Card className="shadow-lg rounded-lg p-6 max-w-lg w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Account Settings</h2>

        <div className="space-y-6">
          {/* Email Section */}
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Email</p>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2 border-r border-gray-300">
                <FaEnvelope className="text-gray-500" />
              </div>
              <Input
                aria-label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-0 rounded-lg p-2 flex-1"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2 border-r border-gray-300">
                <FaLock className="text-gray-500" />
              </div>
              <Input
                aria-label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="border-0 rounded-lg p-2 flex-1"
              />
            </div>
          </div>

          {/* Confirm Password Section */}
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</p>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="p-2 border-r border-gray-300">
                <FaLock className="text-gray-500" />
              </div>
              <Input
                aria-label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="border-0 rounded-lg p-2 flex-1"
              />
            </div>
          </div>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Card>
    </div>
  );
};

export default Settings;
