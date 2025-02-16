import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { projectsApi } from '../services/projectsApi';
import { toast } from 'react-toastify';
import api from '../services/api';

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
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ProjectEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        category: '',
        thumbnail: null,
        thumbnailPreview: '',
        screenshots: [],
        screenshotPreviews: [],
        technologies: {
            frontend: [],
            backend: [],
            database: [],
            devops: [],
            other: []
        },
        githubUrl: '',
        liveUrl: '',
        status: 'published'
    });

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            setIsLoading(true);
            const project = await projectsApi.getProject(id);

            // Parse technologies if it's a string
            const technologies = typeof project.technologies === 'string'
                ? JSON.parse(project.technologies || '[]')
                : (project.technologies || []);

            // Convert flat technologies array to categorized object
            const categorizedTech = {
                frontend: technologies.filter(tech => tech.toLowerCase().includes('frontend') || tech.toLowerCase().includes('ui') || tech.toLowerCase().includes('web')),
                backend: technologies.filter(tech => tech.toLowerCase().includes('backend') || tech.toLowerCase().includes('server')),
                database: technologies.filter(tech => tech.toLowerCase().includes('db') || tech.toLowerCase().includes('sql') || tech.toLowerCase().includes('database')),
                devops: technologies.filter(tech => tech.toLowerCase().includes('devops') || tech.toLowerCase().includes('cloud') || tech.toLowerCase().includes('deployment')),
                other: technologies.filter(tech =>
                    !tech.toLowerCase().includes('frontend') &&
                    !tech.toLowerCase().includes('ui') &&
                    !tech.toLowerCase().includes('web') &&
                    !tech.toLowerCase().includes('backend') &&
                    !tech.toLowerCase().includes('server') &&
                    !tech.toLowerCase().includes('db') &&
                    !tech.toLowerCase().includes('sql') &&
                    !tech.toLowerCase().includes('database') &&
                    !tech.toLowerCase().includes('devops') &&
                    !tech.toLowerCase().includes('cloud') &&
                    !tech.toLowerCase().includes('deployment')
                )
            };

            setFormData({
                title: project.title || '',
                shortDescription: project.shortDescription || '',
                description: project.description || '',
                category: project.category || '',
                thumbnail: null,
                thumbnailPreview: project.thumbnail || '',
                screenshots: [],
                screenshotPreviews: project.screenshots || [],
                technologies: categorizedTech,
                githubUrl: project.githubUrl || '',
                liveUrl: project.liveUrl || '',
                status: project.status || 'published'
            });
        } catch (error) {
            console.error('Error fetching project:', error);
            toast.error('Failed to load project details');
            navigate('/projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTechInput = (e, category) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const tech = e.target.value.trim();
            setFormData(prev => ({
                ...prev,
                technologies: {
                    ...prev.technologies,
                    [category]: [...prev.technologies[category], tech]
                }
            }));
            e.target.value = '';
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);
                const response = await api.post('/upload/image', formData);

                setFormData(prev => ({
                    ...prev,
                    thumbnail: file,
                    thumbnailPreview: response.data.url
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Failed to upload thumbnail');
            }
        }
    };

    const handleScreenshotsUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            try {
                const uploadPromises = files.map(file => {
                    const formData = new FormData();
                    formData.append('image', file);
                    return api.post('/upload/image', formData);
                });

                const responses = await Promise.all(uploadPromises);
                const newUrls = responses.map(response => response.data.url);

                setFormData(prev => ({
                    ...prev,
                    screenshots: [...prev.screenshots, ...files],
                    screenshotPreviews: [...prev.screenshotPreviews, ...newUrls]
                }));
            } catch (error) {
                console.error('Error uploading screenshots:', error);
                toast.error('Failed to upload screenshots');
            }
        }
    };

    const removeScreenshot = (index) => {
        setFormData(prev => ({
            ...prev,
            screenshots: prev.screenshots.filter((_, i) => i !== index),
            screenshotPreviews: prev.screenshotPreviews.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const updatedProject = {
                ...formData,
                technologies: Object.values(formData.technologies).flat()
            };

            await projectsApi.updateProject(id, updatedProject);
            toast.success('Project updated successfully!');
            navigate(`/project/${id}`);
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Failed to update project');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <ProjectUploadSection>
            <Hero>
                <HeroContent>
                    <UploadTitle>Edit Project</UploadTitle>
                    <UploadSubtitle>Update your project details and showcase your work</UploadSubtitle>
                </HeroContent>
            </Hero>

            <UploadFormContainer>
                <UploadMain>
                    <form onSubmit={handleSubmit}>
                        <FormSection>
                            <FormSectionTitle>Basic Information</FormSectionTitle>
                            <FormGroup>
                                <FormLabel>Project Title</FormLabel>
                                <FormInput
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Short Description</FormLabel>
                                <FormTextarea
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Detailed Description</FormLabel>
                                <FormTextarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Category</FormLabel>
                                <FormSelect
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
                                </FormSelect>
                            </FormGroup>
                        </FormSection>

                        <FormSection>
                            <FormSectionTitle>Technologies Used</FormSectionTitle>
                            {Object.keys(formData.technologies).map(category => (
                                <FormGroup key={category}>
                                    <FormLabel>{category.charAt(0).toUpperCase() + category.slice(1)}</FormLabel>
                                    <FormInput
                                        type="text"
                                        placeholder={`Press Enter to add ${category} technologies`}
                                        onKeyDown={(e) => handleTechInput(e, category)}
                                    />
                                    <TechStackInput>
                                        {formData.technologies[category].map((tech, index) => (
                                            <TechTag key={index}>
                                                {tech}
                                                <button type="button" onClick={() => removeTech(category, tech)}>×</button>
                                            </TechTag>
                                        ))}
                                    </TechStackInput>
                                </FormGroup>
                            ))}
                        </FormSection>

                        <FormSection>
                            <FormSectionTitle>Project Media</FormSectionTitle>
                            <FormGroup>
                                <FormLabel>Thumbnail Image</FormLabel>
                                <ImageUploadArea>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                        id="thumbnail-upload"
                                    />
                                    <label htmlFor="thumbnail-upload">
                                        {formData.thumbnailPreview ? (
                                            <img
                                                src={formData.thumbnailPreview}
                                                alt="Thumbnail preview"
                                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            />
                                        ) : (
                                            <p>Click to upload thumbnail</p>
                                        )}
                                    </label>
                                </ImageUploadArea>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Project Screenshots</FormLabel>
                                <ImageUploadArea>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleScreenshotsUpload}
                                        style={{ display: 'none' }}
                                        id="screenshots-upload"
                                    />
                                    <label htmlFor="screenshots-upload">
                                        <p>Click to upload screenshots</p>
                                    </label>
                                </ImageUploadArea>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                    {formData.screenshotPreviews.map((url, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img src={url} alt={`Screenshot ${index + 1}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <button
                                                type="button"
                                                onClick={() => removeScreenshot(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: 'rgba(0,0,0,0.5)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </FormGroup>
                        </FormSection>

                        <FormSection>
                            <FormSectionTitle>Project Links</FormSectionTitle>
                            <FormGroup>
                                <FormLabel>GitHub URL</FormLabel>
                                <FormInput
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Live Demo URL</FormLabel>
                                <FormInput
                                    type="url"
                                    name="liveUrl"
                                    value={formData.liveUrl}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                        </FormSection>

                        <button
                            type="submit"
                            style={{
                                background: 'var(--primary-color)',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Project'}
                        </button>
                    </form>
                </UploadMain>

                <UploadSidebar>
                    <PreviewCard>
                        <h3>Project Preview</h3>
                        {formData.thumbnailPreview && (
                            <PreviewImage src={formData.thumbnailPreview} alt="Project thumbnail" />
                        )}
                        <h4 style={{ margin: '1rem 0' }}>{formData.title}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{formData.shortDescription}</p>
                    </PreviewCard>
                </UploadSidebar>
            </UploadFormContainer>
        </ProjectUploadSection>
    );
};

export default ProjectEdit; 