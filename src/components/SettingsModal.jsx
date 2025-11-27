import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 1.1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input {
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  
  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.outline {
    background: transparent;
    border: 1px solid #ddd;
    color: #333;
  }
`;

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [formData, setFormData] = useState(settings || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Settings"
      width="700px"
      footer={
        <ButtonGroup>
          <Button type="button" className="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="primary" form="settings-form">
            Save Settings
          </Button>
        </ButtonGroup>
      }
    >
      <Form id="settings-form" onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Notifications</SectionTitle>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.notifications?.email || false}
                onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
              />
              Email Notifications
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.notifications?.push || false}
                onChange={(e) => handleNestedChange('notifications', 'push', e.target.checked)}
              />
              Push Notifications
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.notifications?.sms || false}
                onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
              />
              SMS Notifications
            </CheckboxLabel>
          </CheckboxGroup>
        </Section>

        <Section>
          <SectionTitle>Privacy</SectionTitle>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="profileVisible"
                checked={formData.privacy?.profileVisible || false}
                onChange={(e) => handleNestedChange('privacy', 'profileVisible', e.target.checked)}
              />
              Make Profile Visible to Others
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="activityStatus"
                checked={formData.privacy?.activityStatus || false}
                onChange={(e) => handleNestedChange('privacy', 'activityStatus', e.target.checked)}
              />
              Show Activity Status
            </CheckboxLabel>
          </CheckboxGroup>
        </Section>

        <Section>
          <SectionTitle>Preferences</SectionTitle>
          <FormGroup>
            <Label>Language</Label>
            <Select
              name="language"
              value={formData.language || 'en'}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Time Zone</Label>
            <Select
              name="timezone"
              value={formData.timezone || 'UTC'}
              onChange={handleChange}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="CET">Central European Time</option>
            </Select>
          </FormGroup>
        </Section>
      </Form>
    </Modal>
  );
};

export default SettingsModal;