import React, { useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.layout.spacing.lg};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.layout.borderRadius.xl};
  box-shadow: ${props => props.theme.layout.shadow.xl};
  width: 100%;
  max-width: ${props => props.size === 'large' ? '800px' : props.size === 'small' ? '400px' : '600px'};
  max-height: 90vh;
  overflow: hidden;
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  padding: ${props => props.theme.layout.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  flex: 1;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: ${props => props.theme.layout.spacing.sm};
  border-radius: ${props => props.theme.layout.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.layout.spacing.lg};
  overflow-y: auto;
  flex: 1;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.layout.spacing.md};
  padding: ${props => props.theme.layout.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
`;

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  footer 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer 
        isOpen={isOpen} 
        size={size}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;