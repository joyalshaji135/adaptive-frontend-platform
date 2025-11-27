import React from 'react';
import styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';

const InputWrapper = styled.div`
  margin-bottom: ${props => props.theme.layout.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.layout.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.layout.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.layout.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary}60;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &:disabled {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.secondary};
    cursor: not-allowed;
  }

  ${props => props.hasIcon && 'padding-right: 50px;'}
  ${props => props.hasLeftIcon && 'padding-left: 50px;'}
`;

const IconWrapper = styled.div`
  position: absolute;
  right: ${props => props.theme.layout.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LeftIconWrapper = styled.div`
  position: absolute;
  left: ${props => props.theme.layout.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
`;

const ErrorMessage = styled.span`
  display: block;
  margin-top: ${props => props.theme.layout.spacing.sm};
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const HelpText = styled.span`
  display: block;
  margin-top: ${props => props.theme.layout.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helpText,
  icon,
  leftIcon,
  disabled = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <InputWrapper>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>}
        </Label>
      )}
      
      <InputContainer>
        {leftIcon && (
          <LeftIconWrapper>
            {leftIcon}
          </LeftIconWrapper>
        )}
        
        <StyledInput
          type={getInputType()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          hasIcon={icon || type === 'password'}
          hasLeftIcon={leftIcon}
          {...props}
        />

        {type === 'password' && (
          <IconWrapper onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </IconWrapper>
        )}

        {icon && type !== 'password' && (
          <IconWrapper>
            {icon}
          </IconWrapper>
        )}
      </InputContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputWrapper>
  );
};

export default InputField;