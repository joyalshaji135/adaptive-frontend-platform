import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props => props.theme.colors.primary}dd;
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
  
  &.outline {
    background: transparent;
    border: 1px solid #ddd;
    color: #333;
    
    &:hover {
      background: #f8f9fa;
    }
  }
`;

const AvatarUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const AvatarPreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #6c757d;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        bio: userData.bio || '',
        avatar: userData.avatar || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      title="Edit Profile"
      width="600px"
      footer={
        <ButtonGroup>
          <Button type="button" className="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="primary" form="profile-form">
            Save Changes
          </Button>
        </ButtonGroup>
      }
    >
      <Form id="profile-form" onSubmit={handleSubmit}>
        <AvatarUpload>
          <AvatarPreview>
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" />
            ) : (
              <span>👤</span>
            )}
          </AvatarPreview>
          <div>
            <Button type="button" className="outline">
              Upload Photo
            </Button>
          </div>
        </AvatarUpload>

        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bio">Bio</Label>
          <TextArea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};

export default ProfileModal;