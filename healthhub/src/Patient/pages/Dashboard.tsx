import { Card, Icon, Button } from 'semantic-ui-react';
import { FaPlus, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const mockData = {
  appointments: [
    { id: 1, doctor: 'Dr. John Doe', date: '2024-08-01', time: '10:00 AM', location: 'Room 301', type: 'Routine Check-up'},
    { id: 2, doctor: 'Dr. Jane Smith', date: '2024-08-05', time: '02:00 PM', location: 'Room 204', type: 'Consultation' },
    { id: 3, doctor: 'Dr. Alice Johnson', date: '2024-08-10', time: '09:30 AM', location: 'Room 112', type: 'Follow-up' },
    { id: 4, doctor: 'Dr. Michael Brown', date: '2024-08-15', time: '01:00 PM', location: 'Room 405', type: 'Specialist Consultation' },
    { id: 5, doctor: 'Dr. Angela White', date: '2024-08-20', time: '11:00 AM', location: 'Room 202', type: 'Routine Check-up' },
    { id: 6, doctor: 'Dr. Robert Green', date: '2024-08-25', time: '03:00 PM', location: 'Room 309', type: 'Follow-up' },
  ],
  healthSummary: 'Summary of recent reports or visits, including health alerts, updates on chronic conditions, and recommendations from your healthcare provider.',
  articles: [
    { id: 1, title: 'How to Maintain a Healthy Lifestyle', content: 'Maintaining a healthy lifestyle involves balanced nutrition, regular physical activity, adequate sleep, and stress management.' },
    { id: 2, title: 'The Importance of Regular Check-ups', content: 'Regular check-ups help in early detection and prevention of potential health issues. They also provide an opportunity for preventive care.' },
    { id: 3, title: 'Managing Chronic Conditions Effectively', content: 'Effective management of chronic conditions includes regular monitoring, medication adherence, lifestyle changes, and regular consultations with healthcare providers.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
    { id: 4, title: 'Understanding Your Lab Results', content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.' },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card fluid className="shadow-lg rounded-lg bg-white">
          <Card.Content>
            <Card.Header>
              <Icon name="calendar alternate outline" className="text-green-500" />
              Upcoming Appointments
            </Card.Header>
            <Card.Description>
              <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
                <ul className="list-none p-0">
                  {mockData.appointments.map((appointment, index) => (
                    <li key={index} className="border-b border-gray-200 py-4 flex justify-between items-start">
                      <div className="text-lg font-medium text-gray-800" onClick={() => navigate('/appointments/dd')}>
                        {formatDate(appointment.date)} at {appointment.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        {appointment.type} with {appointment.doctor} in {appointment.location}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card fluid className="shadow-lg rounded-lg bg-white">
          <Card.Content>
            <Card.Header>
              <Icon name="clipboard list" className="text-green-500" />
              Health Summary
            </Card.Header>
            <Card.Description>
              <p className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                {mockData.healthSummary}
              </p>
            </Card.Description>
          </Card.Content>
        </Card>
      </section>

      <section className="mb-8">
        <Card fluid className="shadow-lg rounded-lg bg-white">
          <Card.Content>
            <Card.Header>
              <Icon name="book" className="text-green-500" />
              Educational Articles
            </Card.Header>
            <Card.Description>
              <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <ul className="list-none p-0">
                  {mockData.articles.map((article, index) => (
                    <li key={index} className="border-b border-gray-200 py-4">
                      <div className="text-lg font-semibold text-gray-800 mb-1">
                        {article.title}
                      </div>
                      <p className="text-gray-600">{article.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </section>

      <section className="fixed bottom-8 right-8 flex flex-col items-end space-y-4">
        <Button
          circular
          icon={<FaPlus />}
          color="green"
          size="huge"
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg"
          onClick={() => navigate('/appointments/create')}
        />
        <Button
          circular
          icon={<FaComment />}
          color="orange"
          size="huge"
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg"
          onClick={() => navigate('/faq')}
        />
      </section>
    </div>
  );
};

export default Dashboard;
