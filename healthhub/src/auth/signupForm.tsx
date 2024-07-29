import { Button, Input, Spacer, Card, Divider } from '@nextui-org/react';
import React, { useState } from 'react';

const SignupForm = () => {
  // State for each step
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    address: '',
    home_number: '',
    work_number: '',
    age: '',
    height: '',
    weight: ''
  });
  const [medicalRecords, setMedicalRecords] = useState({
    allergies: '',
    medications: '',
    medical_problems: ''
  });
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    address: '',
    email: '',
    home_number: '',
    work_number: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    home_number: '',
    work_number: '',
    age: '',
    height: '',
    weight: '',
    allergies: '',
    medications: '',
    medical_problems: '',
    emergencyName: '',
    emergencyAddress: '',
    emergencyEmail: '',
    emergencyHome_number: '',
    emergencyWork_number: ''
  });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (step) {
      case 1:
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        break;
      case 2:
        if (name === 'name') setName(value);
        else setPatientInfo(prev => ({ ...prev, [name]: value }));
        break;
      case 3:
        setMedicalRecords(prev => ({ ...prev, [name]: value }));
        break;
      case 4:
        setEmergencyContact(prev => ({ ...prev, [name]: value }));
        break;
      default:
        break;
    }
  };

  const validateStep = () => {
    const newErrors = { ...errors };
    switch (step) {
      case 1:
        newErrors.email = email ? '' : 'Email is required';
        newErrors.password = password ? '' : 'Password is required';
        break;
      case 2:
        newErrors.name = name ? '' : 'Name is required';
        newErrors.address = patientInfo.address ? '' : 'Address is required';
        newErrors.home_number = patientInfo.home_number ? '' : 'Home number is required';
        newErrors.work_number = patientInfo.work_number ? '' : 'Work number is required';
        newErrors.age = patientInfo.age ? '' : 'Age is required';
        newErrors.height = patientInfo.height ? '' : 'Height is required';
        newErrors.weight = patientInfo.weight ? '' : 'Weight is required';
        break;
      case 3:
        // Add validation for medical records if needed
        break;
      case 4:
        newErrors.emergencyName = emergencyContact.name ? '' : 'Contact name is required';
        newErrors.emergencyAddress = emergencyContact.address ? '' : 'Contact address is required';
        newErrors.emergencyEmail = emergencyContact.email ? '' : 'Contact email is required';
        newErrors.emergencyHome_number = emergencyContact.home_number ? '' : 'Contact home number is required';
        newErrors.emergencyWork_number = emergencyContact.work_number ? '' : 'Contact work number is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    // Check if there are any errors
    return Object.values(newErrors).every(error => !error);
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      // Handle form submission logic here
      console.log({
        email,
        password,
        name,
        patientInfo,
        medicalRecords,
        emergencyContact
      });

      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name,
          patientInfo: { ...patientInfo },
          medicalRecords: { ...medicalRecords },
          emergencyContact: { ...emergencyContact }
        })
      });

      const data = await res.json();
      console.log(data)
      if (data.success) {
        setErrorMessage('');
        setMessage(data.message);
        window.location.href = '/'
      } else {
        setMessage('');
        setErrorMessage(data.message);
      }
    }
  };

  return (
    <div style={{ width: '600px', margin: 'auto', padding: '20px' }}>
      <Card>
        <div style={{ padding: '20px' }}>
          <h3>Register</h3>
        </div>
        <Divider />
        <div style={{ padding: '20px' }}>
          {step === 1 && (
            <>
              <h3>Email & Password</h3>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                fullWidth
                onChange={handleChange}
                value={email}
                name="email"
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <Spacer y={1} />
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                fullWidth
                onChange={handleChange}
                value={password}
                name="password"
                required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              <Spacer y={1} />
              <Button color="primary" onClick={handleNext}>Next</Button>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Patient Information</h3>
              <Input
                label="Name"
                placeholder="Enter your name"
                fullWidth
                onChange={handleChange}
                value={name}
                name="name"
                required
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              <Spacer y={1} />
              <Input
                label="Address"
                placeholder="Enter your address"
                fullWidth
                onChange={handleChange}
                value={patientInfo.address}
                name="address"
                required
              />
              {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
              <Spacer y={1} />
              <Input
                label="Home Number"
                placeholder="Enter your home number"
                fullWidth
                onChange={handleChange}
                value={patientInfo.home_number}
                name="home_number"
                required
              />
              {errors.home_number && <p style={{ color: 'red' }}>{errors.home_number}</p>}
              <Spacer y={1} />
              <Input
                label="Work Number"
                placeholder="Enter your work number"
                fullWidth
                onChange={handleChange}
                value={patientInfo.work_number}
                name="work_number"
                required
              />
              {errors.work_number && <p style={{ color: 'red' }}>{errors.work_number}</p>}
              <Spacer y={1} />
              <Input
                label="Age"
                type="number"
                placeholder="Enter your age"
                fullWidth
                onChange={handleChange}
                value={patientInfo.age}
                name="age"
                required
              />
              {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
              <Spacer y={1} />
              <Input
                label="Height"
                placeholder="Enter your height"
                fullWidth
                onChange={handleChange}
                value={patientInfo.height}
                name="height"
                required
              />
              {errors.height && <p style={{ color: 'red' }}>{errors.height}</p>}
              <Spacer y={1} />
              <Input
                label="Weight"
                placeholder="Enter your weight"
                fullWidth
                onChange={handleChange}
                value={patientInfo.weight}
                name="weight"
                required
              />
              {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}
              <Spacer y={1} />
              <Button color="primary" onClick={handlePrevious}>Previous</Button>
              <Button color="primary" onClick={handleNext} style={{ marginLeft: '10px' }}>Next</Button>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Medical Records</h3>
              <Input
                label="Allergies"
                placeholder="Enter allergies"
                fullWidth
                onChange={handleChange}
                value={medicalRecords.allergies}
                name="allergies"
              />
              <Spacer y={1} />
              <Input
                label="Medications"
                placeholder="Enter medications"
                fullWidth
                onChange={handleChange}
                value={medicalRecords.medications}
                name="medications"
              />
              <Spacer y={1} />
              <Input
                label="Medical Problems"
                placeholder="Enter medical problems"
                fullWidth
                onChange={handleChange}
                value={medicalRecords.medical_problems}
                name="medical_problems"
              />
              <Spacer y={1} />
              <Button color="primary" onClick={handlePrevious}>Previous</Button>
              <Button color="primary" onClick={handleNext} style={{ marginLeft: '10px' }}>Next</Button>
            </>
          )}

          {step === 4 && (
            <>
              <h3>Emergency Contact</h3>
              <Input
                label="Name"
                placeholder="Enter contact name"
                fullWidth
                onChange={handleChange}
                value={emergencyContact.name}
                name="name"
                required
              />
              {errors.emergencyName && <p style={{ color: 'red' }}>{errors.emergencyName}</p>}
              <Spacer y={1} />
              <Input
                label="Address"
                placeholder="Enter contact address"
                fullWidth
                onChange={handleChange}
                value={emergencyContact.address}
                name="address"
                required
              />
              {errors.emergencyAddress && <p style={{ color: 'red' }}>{errors.emergencyAddress}</p>}
              <Spacer y={1} />
              <Input
                label="Email"
                placeholder="Enter contact email"
                fullWidth
                onChange={handleChange}
                value={emergencyContact.email}
                name="email"
                required
              />
              {errors.emergencyEmail && <p style={{ color: 'red' }}>{errors.emergencyEmail}</p>}
              <Spacer y={1} />
              <Input
                label="Home Number"
                placeholder="Enter contact home number"
                fullWidth
                onChange={handleChange}
                value={emergencyContact.home_number}
                name="home_number"
                required
              />
              {errors.emergencyHome_number && <p style={{ color: 'red' }}>{errors.emergencyHome_number}</p>}
              <Spacer y={1} />
              <Input
                label="Work Number"
                placeholder="Enter contact work number"
                fullWidth
                onChange={handleChange}
                value={emergencyContact.work_number}
                name="work_number"
                required
              />
              <div className="text-green-500 text-sm">{message}</div>
              <div className="text-red-500 text-sm">{errorMessage}</div>
              {errors.emergencyWork_number && <p style={{ color: 'red' }}>{errors.emergencyWork_number}</p>}
              <Spacer y={1} />
              <Button color="primary" onClick={handlePrevious}>Previous</Button>
              <Button color="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>Submit</Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SignupForm;
