import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Palette, 
  Layout, 
  Type, 
  Box, 
  Save,
  Eye
} from 'lucide-react';
import Modal from '../Common/Modal';
import InputField from '../Forms/InputField';

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.layout.shadow.xl};
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  z-index: 1000;
  overflow-y: auto;
  border-left: 1px solid ${props => props.theme.colors.border};
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  z-index: 999;
  border-radius: 8px 0 0 8px;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${props => props.theme.layout.shadow.lg};
  transition: all 0.3s ease;

  &:hover {
    padding-right: 20px;
    transform: translateY(-50%) scale(1.05);
  }
`;

const PanelHeader = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  color: white;
  padding: ${props => props.theme.layout.spacing.xl};
  text-align: center;
`;

const PanelTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.layout.spacing.sm};
`;

const PanelSubtitle = styled.p`
  opacity: 0.9;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const PanelBody = styled.div`
  padding: ${props => props.theme.layout.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.layout.spacing.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.layout.spacing.md};
  margin-bottom: ${props => props.theme.layout.spacing.lg};
  padding-bottom: ${props => props.theme.layout.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.layout.spacing.md};
  margin-bottom: ${props => props.theme.layout.spacing.lg};
`;

const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.layout.spacing.sm};
`;

const ColorLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.layout.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.02);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.layout.spacing.md};
  margin-top: ${props => props.theme.layout.spacing.xl};
`;

const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.layout.spacing.md};
  border: none;
  border-radius: ${props => props.theme.layout.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.layout.spacing.sm};

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.primary}dd;
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.primary};
    border: 1px solid ${props => props.theme.colors.border};

    &:hover {
      background: ${props => props.theme.colors.background};
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const PreviewModal = styled(Modal)`
  .modal-content {
    max-width: 90vw;
    max-height: 90vh;
  }
`;

const CustomizationPanel = ({ onThemeChange, currentTheme, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState(currentTheme);

  const handleColorChange = (category, property, value) => {
    const newTheme = {
      ...localTheme,
      [category]: {
        ...localTheme[category],
        [property]: value
      }
    };
    setLocalTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handleSave = () => {
    onSave(localTheme);
  };

  const handleReset = () => {
    setLocalTheme(currentTheme);
    onThemeChange(currentTheme);
  };

  const colorOptions = [
    { label: 'Primary Color', category: 'colors', property: 'primary' },
    { label: 'Secondary Color', category: 'colors', property: 'secondary' },
    { label: 'Background Color', category: 'colors', property: 'background' },
    { label: 'Surface Color', category: 'colors', property: 'surface' },
    { label: 'Text Color', category: 'colors', property: 'text.primary' },
    { label: 'Border Color', category: 'colors', property: 'border' },
    { label: 'Success Color', category: 'colors', property: 'success' },
    { label: 'Error Color', category: 'colors', property: 'error' }
  ];

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <Palette size={18} />
        Customize
      </ToggleButton>
      
      <Panel isOpen={isOpen}>
        <PanelHeader>
          <PanelTitle>🎨 Customize UI</PanelTitle>
          <PanelSubtitle>Design your perfect interface</PanelSubtitle>
        </PanelHeader>

        <PanelBody>
          <Section>
            <SectionHeader>
              <Palette size={20} />
              <SectionTitle>Colors</SectionTitle>
            </SectionHeader>
            
            <ColorGrid>
              {colorOptions.map((option, index) => (
                <ColorOption key={index}>
                  <ColorLabel>{option.label}</ColorLabel>
                  <ColorInput
                    type="color"
                    value={localTheme.colors[option.property.split('.')[0]][option.property.split('.')[1] || option.property]}
                    onChange={(e) => handleColorChange(option.category, option.property, e.target.value)}
                  />
                </ColorOption>
              ))}
            </ColorGrid>
          </Section>

          <Section>
            <SectionHeader>
              <Type size={20} />
              <SectionTitle>Typography</SectionTitle>
            </SectionHeader>
            
            <InputField
              label="Font Family"
              type="text"
              value={localTheme.typography.fontFamily}
              onChange={(e) => handleColorChange('typography', 'fontFamily', e.target.value)}
              placeholder="Enter font family"
            />

            <InputField
              label="Base Font Size"
              type="text"
              value={localTheme.typography.fontSize.base}
              onChange={(e) => handleColorChange('typography', 'fontSize.base', e.target.value)}
              placeholder="e.g., 1rem"
            />
          </Section>

          <Section>
            <SectionHeader>
              <Layout size={20} />
              <SectionTitle>Layout</SectionTitle>
            </SectionHeader>
            
            <InputField
              label="Sidebar Width"
              type="text"
              value={localTheme.layout.sidebarWidth}
              onChange={(e) => handleColorChange('layout', 'sidebarWidth', e.target.value)}
              placeholder="e.g., 280px"
            />

            <InputField
              label="Border Radius"
              type="text"
              value={localTheme.layout.borderRadius.md}
              onChange={(e) => handleColorChange('layout', 'borderRadius.md', e.target.value)}
              placeholder="e.g., 8px"
            />
          </Section>

          <ButtonGroup>
            <Button className="secondary" onClick={() => setPreviewOpen(true)}>
              <Eye size={16} />
              Preview
            </Button>
            <Button className="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button className="primary" onClick={handleSave}>
              <Save size={16} />
              Save
            </Button>
          </ButtonGroup>
        </PanelBody>
      </Panel>

      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Theme Preview"
        size="large"
      >
        <div style={{ padding: '20px', background: localTheme.colors.background, color: localTheme.colors.text.primary, borderRadius: '8px' }}>
          <h3 style={{ fontFamily: localTheme.typography.fontFamily }}>Preview Content</h3>
          <p style={{ fontFamily: localTheme.typography.fontFamily }}>
            This is how your theme will look with the current settings.
          </p>
          <div style={{ 
            background: localTheme.colors.primary, 
            color: 'white', 
            padding: '10px', 
            borderRadius: localTheme.layout.borderRadius.md,
            margin: '10px 0'
          }}>
            Primary Color Sample
          </div>
        </div>
      </PreviewModal>
    </>
  );
};

export default CustomizationPanel;