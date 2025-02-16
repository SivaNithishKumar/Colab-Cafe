import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { projectsApi } from '../services/projectsApi';
import { toast } from 'react-toastify';
import api from '../services/api';
import { teamsApi } from '../services/teamsApi';

const ProjectUploadSection = styled.main`
  min-height: 100vh;
  background: var(--bg-color);
`;

const Hero = styled.section`
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  background: radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.15), transparent 60%),
      radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.15), transparent 60%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const UploadTitle = styled.h1`
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #4f46e5 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const UploadSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const UploadFormContainer = styled.div`
  max-width: 1200px;
  margin: -4rem auto 4rem;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const UploadMain = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormSectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    background: rgba(79, 70, 229, 0.05);
  }
`;

const TechStackInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TechTag = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0;
    font-size: 1.1rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const UploadSidebar = styled.div`
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
  }
`;

const PreviewCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
    color: white;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
    }
  }

  &.btn-secondary {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-color);

    &:hover {
      background: var(--bg-color);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
`;

const FormTab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;
  position: relative;
  opacity: ${props => props.active ? '1' : '0.6'};

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary-color);
    transform: scaleX(${props => props.active ? '1' : '0'});
    transition: transform 0.3s ease;
  }

  &:hover {
    opacity: 1;
  }
`;

const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const TechStackCategory = styled.div`
  h4 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
`;

const ProjectTypeSection = styled.div`
  margin-bottom: 2rem;
`;

const ProjectTypeToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TypeButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-color)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TeamSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  margin-top: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-alpha);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const ProjectUpload = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    status: 'published',
    technologies: {
      frontend: [],
      backend: [],
      database: [],
      devops: [],
      other: []
    },
    architecture: '',
    technicalImplementation: '',
    performanceOptimizations: '',
    keyFeatures: [],
    developmentApproach: '',
    challengesFaced: '',
    futurePlans: '',
    repoUrl: '',
    demoUrl: '',
    docsUrl: '',
    thumbnail: null,
    screenshots: [],
    teamSize: '',
    duration: '',
    projectType: 'personal',
    contributionType: 'creator'
  });
  const [techInput, setTechInput] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isTeamProject, setIsTeamProject] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    fetchUserTeams();
  }, []);

  const fetchUserTeams = async () => {
    try {
      const teams = await teamsApi.getUserTeams();
      setUserTeams(teams);
    } catch (error) {
      console.error('Error fetching user teams:', error);
      toast.error('Failed to load teams');
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a project description');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a project category');
      return false;
    }
    if (!formData.thumbnail) {
      toast.error('Please upload a project thumbnail');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechInput = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTech = e.target.value.trim();
      if (newTech) {
        if (formData.technologies[category].includes(newTech)) {
          toast.warning('This technology is already added');
          return;
        }
        setFormData(prev => ({
          ...prev,
          technologies: {
            ...prev.technologies,
            [category]: [...prev.technologies[category], newTech]
          }
        }));
        e.target.value = '';
      }
    }
  };

  const removeTech = (category, techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: {
        ...prev.technologies,
        [category]: prev.technologies[category].filter(tech => tech !== techToRemove)
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
        toast.error('Only JPG, PNG, and GIF images are allowed');
        return;
      }
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotsUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxScreenshots = 5;
    const currentCount = formData.screenshots.length;

    if (currentCount + files.length > maxScreenshots) {
      toast.error(`You can only upload up to ${maxScreenshots} screenshots`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 2MB`);
        return false;
      }
      if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
        toast.error(`${file.name} is not a valid image format. Use JPG, PNG, or GIF`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, ...validFiles]
    }));
  };

  const removeScreenshot = (index) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      // First, handle the thumbnail upload if it exists
      let thumbnailUrl = null;
      if (formData.thumbnail) {
        const formDataFile = new FormData();
        formDataFile.append('file', formData.thumbnail);
        const uploadResponse = await api.post('/api/upload', formDataFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        thumbnailUrl = uploadResponse.data.url;
      }

      // Prepare project data
      const projectPayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        category: formData.category,
        status: formData.status,
        technologies: Object.values(formData.technologies)
          .flat()
          .filter(Boolean)
          .map(tech => tech.trim()),
        architecture: formData.architecture.trim(),
        technicalImplementation: formData.technicalImplementation.trim(),
        performanceOptimizations: formData.performanceOptimizations.trim(),
        keyFeatures: formData.keyFeatures.filter(Boolean).map(feature => feature.trim()),
        developmentApproach: formData.developmentApproach.trim(),
        challengesFaced: formData.challengesFaced.trim(),
        futurePlans: formData.futurePlans.trim(),
        repoUrl: formData.repoUrl.trim(),
        demoUrl: formData.demoUrl.trim(),
        docsUrl: formData.docsUrl.trim(),
        thumbnail: thumbnailUrl,
        projectType: formData.projectType,
        teamSize: formData.teamSize.trim(),
        duration: formData.duration.trim(),
        contributionType: formData.contributionType,
        isTeamProject,
        teamId: isTeamProject ? selectedTeamId : null
      };

      // Create the project
      const response = await projectsApi.createProject(projectPayload);

      toast.success('Project published successfully!');

      // Redirect to the newly created project's page
      if (response && response.id) {
        navigate(`/project/${response.id}`);
      } else {
        console.error('No project ID in response:', response);
        toast.error('Project created but redirect failed. Please check your projects page.');
        navigate('/projects');
      }
    } catch (error) {
      console.error('Error publishing project:', error);
      toast.error(error.response?.data?.message || 'Failed to publish project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare project data
      const projectPayload = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category,
        status: 'draft',
        technologies: Object.values(formData.technologies).flat().filter(Boolean),
        architecture: formData.architecture,
        technicalImplementation: formData.technicalImplementation,
        performanceOptimizations: formData.performanceOptimizations,
        keyFeatures: formData.keyFeatures,
        developmentApproach: formData.developmentApproach,
        challengesFaced: formData.challengesFaced,
        futurePlans: formData.futurePlans,
        repoUrl: formData.repoUrl,
        demoUrl: formData.demoUrl,
        docsUrl: formData.docsUrl,
        thumbnail: formData.thumbnail,
        projectType: formData.projectType,
        teamSize: formData.teamSize,
        duration: formData.duration,
        contributionType: formData.contributionType,
        isTeamProject,
        teamId: isTeamProject ? selectedTeamId : null
      };

      const response = await projectsApi.createProject(projectPayload);
      toast.success('Project saved as draft!');
      navigate(`/project/${response.id}`);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error(error.response?.data?.message || 'Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProjectUploadSection>
      <Hero>
        <HeroContent>
          <UploadTitle>Share Your Project</UploadTitle>
          <UploadSubtitle>Showcase your work and technical expertise to the community</UploadSubtitle>
        </HeroContent>
      </Hero>

      <UploadFormContainer>
        <UploadMain>
          <form onSubmit={handleSubmit}>
            <FormTabs>
              <FormTab
                active={activeTab === 'basic'}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </FormTab>
              <FormTab
                active={activeTab === 'technical'}
                onClick={() => setActiveTab('technical')}
              >
                Technical Details
              </FormTab>
              <FormTab
                active={activeTab === 'features'}
                onClick={() => setActiveTab('features')}
              >
                Features
              </FormTab>
              <FormTab
                active={activeTab === 'media'}
                onClick={() => setActiveTab('media')}
              >
                Media
              </FormTab>
            </FormTabs>

            {activeTab === 'basic' && (
              <FormSection>
                <FormSectionTitle>Basic Information</FormSectionTitle>
                <FormGroup>
                  <FormLabel htmlFor="title">Project Title</FormLabel>
                  <FormInput
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your project title"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="shortDescription">Short Description</FormLabel>
                  <FormInput
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Brief one-line description of your project"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="description">Detailed Description</FormLabel>
                  <FormTextarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a comprehensive description of your project"
                    rows="6"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormSelect
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Game Development">Game Development</option>
                    <option value="DevOps">DevOps & Infrastructure</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="IoT">IoT & Hardware</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="projectType">Project Type</FormLabel>
                  <FormSelect
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="personal">Personal Project</option>
                    <option value="team">Team Project</option>
                    <option value="company">Company Project</option>
                    <option value="opensource">Open Source</option>
                  </FormSelect>
                </FormGroup>
              </FormSection>
            )}

            {activeTab === 'technical' && (
              <FormSection>
                <FormSectionTitle>Technical Implementation</FormSectionTitle>

                <TechStackGrid>
                  <TechStackCategory>
                    <h4>Frontend</h4>
                    <TechStackInput>
                      <input
                        type="text"
                        placeholder="Add frontend tech"
                        onKeyPress={(e) => handleTechInput(e, 'frontend')}
                      />
                      {Array.isArray(formData.technologies.frontend) && formData.technologies.frontend.map((tech, index) => (
                        <TechTag key={index}>
                          {tech}
                          <button type="button" onClick={() => removeTech('frontend', tech)}>×</button>
                        </TechTag>
                      ))}
                    </TechStackInput>
                  </TechStackCategory>

                  <TechStackCategory>
                    <h4>Backend</h4>
                    <TechStackInput>
                      <input
                        type="text"
                        placeholder="Add backend tech"
                        onKeyPress={(e) => handleTechInput(e, 'backend')}
                      />
                      {Array.isArray(formData.technologies.backend) && formData.technologies.backend.map((tech, index) => (
                        <TechTag key={index}>
                          {tech}
                          <button type="button" onClick={() => removeTech('backend', tech)}>×</button>
                        </TechTag>
                      ))}
                    </TechStackInput>
                  </TechStackCategory>

                  <TechStackCategory>
                    <h4>Database</h4>
                    <TechStackInput>
                      <input
                        type="text"
                        placeholder="Add database tech"
                        onKeyPress={(e) => handleTechInput(e, 'database')}
                      />
                      {Array.isArray(formData.technologies.database) && formData.technologies.database.map((tech, index) => (
                        <TechTag key={index}>
                          {tech}
                          <button type="button" onClick={() => removeTech('database', tech)}>×</button>
                        </TechTag>
                      ))}
                    </TechStackInput>
                  </TechStackCategory>

                  <TechStackCategory>
                    <h4>DevOps</h4>
                    <TechStackInput>
                      <input
                        type="text"
                        placeholder="Add DevOps tech"
                        onKeyPress={(e) => handleTechInput(e, 'devops')}
                      />
                      {Array.isArray(formData.technologies.devops) && formData.technologies.devops.map((tech, index) => (
                        <TechTag key={index}>
                          {tech}
                          <button type="button" onClick={() => removeTech('devops', tech)}>×</button>
                        </TechTag>
                      ))}
                    </TechStackInput>
                  </TechStackCategory>
                </TechStackGrid>

                <FormGroup>
                  <FormLabel htmlFor="architecture">Architecture Overview</FormLabel>
                  <FormTextarea
                    id="architecture"
                    name="architecture"
                    value={formData.architecture}
                    onChange={handleInputChange}
                    placeholder="Describe your project's architecture and system design"
                    rows="4"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="technicalImplementation">Technical Implementation Details</FormLabel>
                  <FormTextarea
                    id="technicalImplementation"
                    name="technicalImplementation"
                    value={formData.technicalImplementation}
                    onChange={handleInputChange}
                    placeholder="Explain the technical implementation details and challenges overcome"
                    rows="4"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="performanceOptimizations">Performance Optimizations</FormLabel>
                  <FormTextarea
                    id="performanceOptimizations"
                    name="performanceOptimizations"
                    value={formData.performanceOptimizations}
                    onChange={handleInputChange}
                    placeholder="Describe any performance optimizations implemented"
                    rows="4"
                  />
                </FormGroup>
              </FormSection>
            )}

            {activeTab === 'features' && (
              <FormSection>
                <FormSectionTitle>Features & Implementation</FormSectionTitle>

                <FormGroup>
                  <FormLabel>Key Features</FormLabel>
                  <TechStackInput>
                    <input
                      type="text"
                      placeholder="Add key features (press Enter)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const newFeature = e.target.value.trim();
                          if (newFeature) {
                            setFormData(prev => ({
                              ...prev,
                              keyFeatures: [...prev.keyFeatures, newFeature]
                            }));
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    {formData.keyFeatures.map((feature, index) => (
                      <TechTag key={index}>
                        {feature}
                        <button type="button" onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
                          }));
                        }}>×</button>
                      </TechTag>
                    ))}
                  </TechStackInput>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="developmentApproach">Development Approach</FormLabel>
                  <FormTextarea
                    id="developmentApproach"
                    name="developmentApproach"
                    value={formData.developmentApproach}
                    onChange={handleInputChange}
                    placeholder="Describe your development methodology and approach"
                    rows="4"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="challengesFaced">Challenges & Solutions</FormLabel>
                  <FormTextarea
                    id="challengesFaced"
                    name="challengesFaced"
                    value={formData.challengesFaced}
                    onChange={handleInputChange}
                    placeholder="Describe technical challenges faced and how you solved them"
                    rows="4"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="futurePlans">Future Plans</FormLabel>
                  <FormTextarea
                    id="futurePlans"
                    name="futurePlans"
                    value={formData.futurePlans}
                    onChange={handleInputChange}
                    placeholder="Describe future plans and potential improvements"
                    rows="4"
                  />
                </FormGroup>
              </FormSection>
            )}

            {activeTab === 'media' && (
              <FormSection>
                <FormSectionTitle>Project Media</FormSectionTitle>

                <FormGroup>
                  <FormLabel>Project Thumbnail</FormLabel>
                  <ImageUploadArea onClick={() => document.getElementById('thumbnailUpload').click()}>
                    <div>📁</div>
                    <p>Click to upload thumbnail image</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Supports: JPG, PNG (Max 2MB)</p>
                    <input
                      type="file"
                      id="thumbnailUpload"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </ImageUploadArea>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Project Screenshots</FormLabel>
                  <ImageUploadArea onClick={() => document.getElementById('screenshotsUpload').click()}>
                    <div>📸</div>
                    <p>Click to upload screenshots</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Upload up to 5 screenshots</p>
                    <input
                      type="file"
                      id="screenshotsUpload"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleScreenshotsUpload}
                    />
                  </ImageUploadArea>
                  <div style={{ marginTop: '1rem' }}>
                    {formData.screenshots.map((screenshot, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem' }}>
                        <img
                          src={URL.createObjectURL(screenshot)}
                          alt={`Screenshot ${index + 1}`}
                          style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          style={{ marginLeft: '1rem' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="repoUrl">Repository URL</FormLabel>
                  <FormInput
                    type="url"
                    id="repoUrl"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleInputChange}
                    placeholder="GitHub/GitLab repository URL"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="demoUrl">Live Demo URL</FormLabel>
                  <FormInput
                    type="url"
                    id="demoUrl"
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                    placeholder="Live demo website URL"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="docsUrl">Documentation URL</FormLabel>
                  <FormInput
                    type="url"
                    id="docsUrl"
                    name="docsUrl"
                    value={formData.docsUrl}
                    onChange={handleInputChange}
                    placeholder="Project documentation URL"
                  />
                </FormGroup>
              </FormSection>
            )}

            <ProjectTypeSection>
              <Label>Project Type</Label>
              <ProjectTypeToggle>
                <TypeButton
                  type="button"
                  active={!isTeamProject}
                  onClick={() => setIsTeamProject(false)}
                >
                  Individual Project
                </TypeButton>
                <TypeButton
                  type="button"
                  active={isTeamProject}
                  onClick={() => setIsTeamProject(true)}
                >
                  Team Project
                </TypeButton>
              </ProjectTypeToggle>

              {isTeamProject && (
                <>
                  <Label>Select Team</Label>
                  <TeamSelect
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    required
                  >
                    <option value="">Select a team</option>
                    {userTeams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </TeamSelect>
                </>
              )}
            </ProjectTypeSection>

            <FormActions>
              <Button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Project'}
              </Button>
              <Button
                type="button"
                className="btn-secondary"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </Button>
            </FormActions>
          </form>
        </UploadMain>

        <UploadSidebar>
          <PreviewCard>
            <h3>Preview</h3>
            <PreviewImage
              src={previewImage || "https://via.placeholder.com/400x200"}
              alt="Project Preview"
            />
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
              This is how your project will appear in the listings
            </p>
          </PreviewCard>

          <PreviewCard>
            <h3>Publishing Guidelines</h3>
            <ul style={{ fontSize: '0.9rem' }}>
              <li>Provide clear and detailed description</li>
              <li>Include technical implementation details</li>
              <li>Add high-quality screenshots</li>
              <li>List key features and technologies</li>
              <li>Include working demo/repository links</li>
              <li>Describe challenges and solutions</li>
              <li>Ensure all content is original</li>
            </ul>
          </PreviewCard>
        </UploadSidebar>
      </UploadFormContainer>
    </ProjectUploadSection>
  );
};

export default ProjectUpload; 