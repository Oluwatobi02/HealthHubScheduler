import { useState } from 'react';
import { Card } from '@nextui-org/react';
import { Input as SemanticInput } from 'semantic-ui-react';

const professionals = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', photo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', photo: 'https://via.placeholder.com/50' },
];

const ProfessionalsPage = () => {
  const [search, setSearch] = useState('');
  const filteredProfessionals = professionals.filter((prof) =>
    prof.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Our Professionals</h1>
          <p className="text-lg text-gray-600">Find the best medical professionals for your needs.</p>
        </div>

        <div className="mb-8">
          <SemanticInput
            type="text"
            placeholder="Search for professionals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((prof, index) => (
              <Card key={index} className="shadow-lg rounded-lg bg-white">
                <div className="p-4 flex items-center">
                  <img
                    src={prof.photo}
                    alt={prof.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{prof.name}</h3>
                    <p className="text-sm text-gray-600">{prof.specialty}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No professionals found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsPage;
