import { useParams } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const resourcesData = [
  {
    id: 1,
    title: 'How to Maintain a Healthy Lifestyle',
    content: 'Maintaining a healthy lifestyle involves balanced nutrition, regular physical activity, adequate sleep, and stress management.',
    details: 'A healthy lifestyle involves a balanced diet rich in fruits, vegetables, lean proteins, and whole grains. Regular exercise, such as walking, running, or cycling, is essential. Additionally, getting 7-8 hours of sleep per night and managing stress through techniques like meditation or yoga can greatly contribute to overall health.'
  },
  {
    id: 2,
    title: 'The Importance of Regular Check-ups',
    content: 'Regular check-ups help in early detection and prevention of potential health issues. They also provide an opportunity for preventive care.',
    details: 'Regular check-ups with your healthcare provider are crucial for maintaining good health. These visits allow for the early detection of potential health problems, ensuring timely intervention. Preventive care, including vaccinations and screenings, is also an essential aspect of these check-ups.'
  },
  {
    id: 3,
    title: 'Managing Chronic Conditions Effectively',
    content: 'Effective management of chronic conditions includes regular monitoring, medication adherence, lifestyle changes, and regular consultations with healthcare providers.',
    details: 'Chronic conditions, such as diabetes or hypertension, require consistent management. This includes regular monitoring of symptoms, adhering to prescribed medications, and making lifestyle changes, such as improving diet and increasing physical activity. Regular consultations with healthcare providers ensure that treatment plans are effective and adjusted as needed.'
  },
  {
    id: 4,
    title: 'Understanding Your Lab Results',
    content: 'Understanding lab results is crucial for assessing your health status. This guide will help you interpret common lab results and what they mean for your health.',
    details: 'Lab results provide valuable insights into your health. Common tests include blood tests, urine tests, and imaging studies. Understanding these results can help you make informed decisions about your health. For instance, high cholesterol levels may indicate a need for dietary changes, while abnormal blood sugar levels could signal diabetes.'
  }
];

const DetailedResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resource = resourcesData.find(res => res.id === parseInt(id || '0'));

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <Button
          icon={<FaArrowLeft />}
          content="Back"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-4xl font-bold text-green-600">{resource.title}</h1>
      </header>

      <section className="mb-8">
        <Card fluid className="shadow-lg rounded-lg bg-white">
          <Card.Content>
            <Card.Header className="text-2xl font-semibold text-gray-800 mb-4">
              {resource.title}
            </Card.Header>
            <Card.Description className="text-lg text-gray-700">
              {resource.details}
            </Card.Description>
          </Card.Content>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourcesData.filter(res => res.id !== resource.id).map((relatedResource) => (
            <Card key={relatedResource.id} fluid className="shadow-lg rounded-lg bg-white">
              <Card.Content>
                <Card.Header className="text-xl font-semibold text-gray-800 mb-2">
                  {relatedResource.title}
                </Card.Header>
                <Card.Description className="text-gray-700">
                  {relatedResource.content}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Engage with Us</h2>
        <div className="flex space-x-4">
          <Button color="green" size="large" className="bg-green-500 text-white">
            Subscribe to Newsletter
          </Button>
          <Button color="blue" size="large" className="bg-blue-500 text-white">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DetailedResource;
