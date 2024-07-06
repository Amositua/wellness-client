import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import image from "../assets/dashboard.svg";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  font-size: 19px
`;

const Input = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size:
`;

const RadioLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionnaireForm = () => {
  const [formData, setFormData] = useState({
    symptoms: [],
    severity: '',
    conditions: [],
    location: '',
    travel: '',
    facilityType: '',
    otherFacility: '',
    specialAssistance: '',
    additionalInfo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({ ...formData, [name]: formData[name].filter(item => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Redirect to another page
    navigate('/thank-you');
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Flex>
         <img src={image} alt="edit" style={{ width: "50%", paddingBottom: "30px" }} />
        </Flex>
        <FormGroup>
          <Label>What symptoms are you experiencing? (Select all that apply)</Label>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Fever" onChange={handleChange} /> Fever</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Cough" onChange={handleChange} /> Cough</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Difficulty breathing" onChange={handleChange} /> Difficulty breathing</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Fatigue" onChange={handleChange} /> Fatigue</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Loss of taste or smell" onChange={handleChange} /> Loss of taste or smell</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="symptoms" value="Other" onChange={handleChange} /> Other</CheckboxLabel>
        </FormGroup>

        <FormGroup>
          <Label>How severe are your symptoms?</Label>
          <RadioLabel><Input type="radio" name="severity" value="Mild" onChange={handleChange} /> Mild</RadioLabel>
          <RadioLabel><Input type="radio" name="severity" value="Moderate" onChange={handleChange} /> Moderate</RadioLabel>
          <RadioLabel><Input type="radio" name="severity" value="Severe" onChange={handleChange} /> Severe</RadioLabel>
        </FormGroup>

        <FormGroup>
          <Label>Do you have any pre-existing medical conditions? (Select all that apply)</Label>
          <CheckboxLabel><Input type="checkbox" name="conditions" value="Diabetes" onChange={handleChange} /> Diabetes</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="conditions" value="Hypertension" onChange={handleChange} /> Hypertension</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="conditions" value="Asthma" onChange={handleChange} /> Asthma</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="conditions" value="None" onChange={handleChange} /> None</CheckboxLabel>
          <CheckboxLabel><Input type="checkbox" name="conditions" value="Other" onChange={handleChange} /> Other</CheckboxLabel>
        </FormGroup>

        <FormGroup>
          <Label>What is your current location?</Label>
          <Input type="text" name="location" onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Are you able to travel to a medical center?</Label>
          <RadioLabel><Input type="radio" name="travel" value="Yes" onChange={handleChange} /> Yes</RadioLabel>
          <RadioLabel><Input type="radio" name="travel" value="No" onChange={handleChange} /> No (I need an ambulance)</RadioLabel>
        </FormGroup>

        <FormGroup>
          <Label>What type of medical facility are you looking for?</Label>
          <RadioLabel><Input type="radio" name="facilityType" value="Maternity care" onChange={handleChange} /> Maternity care</RadioLabel>
          <RadioLabel><Input type="radio" name="facilityType" value="Eye care" onChange={handleChange} /> Eye care</RadioLabel>
          <RadioLabel><Input type="radio" name="facilityType" value="Dental care" onChange={handleChange} /> Dental care</RadioLabel>
          <RadioLabel><Input type="radio" name="facilityType" value="COVID-19 testing" onChange={handleChange} /> COVID-19 testing</RadioLabel>
          <RadioLabel><Input type="radio" name="facilityType" value="General practice" onChange={handleChange} /> General practice</RadioLabel>
          <RadioLabel><Input type="radio" name="facilityType" value="Other" onChange={handleChange} /> Other</RadioLabel>
          {formData.facilityType === 'Other' && (
            <Input type="text" name="otherFacility" placeholder="Please specify" onChange={handleChange} />
          )}
        </FormGroup>

        <FormGroup>
          <Label>Do you require any special assistance?</Label>
          <Input type="text" name="specialAssistance" onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Any other information you would like us to know about your needs?</Label>
          <Input type="text" name="additionalInfo" onChange={handleChange} />
        </FormGroup>

        <Link to="/map">
        <SubmitButton type="submit">Submit Form</SubmitButton>
        </Link>
      </Form>
    </FormContainer>
  );
};

export default QuestionnaireForm;