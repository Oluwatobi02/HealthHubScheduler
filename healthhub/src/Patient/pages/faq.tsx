import { useState } from 'react';
import { Card, Button } from '@nextui-org/react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'What is Health Hub Scheduler?',
    answer: 'Health Hub Scheduler is a platform for scheduling and managing medical appointments with healthcare professionals.',
  },
  {
    question: 'How do I create an appointment?',
    answer: 'You can create an appointment by navigating to the "Create Appointment" page, selecting a date, time, and professional, and then confirming your details.',
  },
  {
    question: 'How can I view my upcoming appointments?',
    answer: 'To view your upcoming appointments, go to the "Appointments" section where you can see a list of both upcoming and past appointments.',
  },
  {
    question: 'Can I edit my profile information?',
    answer: 'Yes, you can edit your profile information on the "Profile" page where you can update your personal details and contact information.',
  },
  {
    question: 'What should I do if I forget my password?',
    answer: 'If you forget your password, you can reset it using the "Forgot Password" option on the login page. Follow the instructions sent to your email to create a new password.',
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Card className="shadow-lg rounded-lg p-6 max-w-3xl w-full bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <Button
                aria-label={faq.question}
                className="w-full text-left flex justify-between items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 rounded-lg"
                onClick={() => handleToggle(index)}
                // iconRight={activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              >
                <span className="font-semibold">{faq.question}</span>
              </Button>
              {activeIndex === index && (
                <div className="p-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FAQPage;
