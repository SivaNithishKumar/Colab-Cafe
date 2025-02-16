import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { teamsApi } from '../services/teamsApi';
import { toast } from 'react-toastify';
import api from '../services/api';

const TeamCreateSection = styled.section`
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-alpha);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-alpha);
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  text-align: center;

  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
  }
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--primary-color) 0%, #06b6d4 100%);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const CancelButton = styled(Button)`
  background: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
`;

const TeamCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        avatar: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                avatar: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Upload avatar if exists
            let avatarUrl = null;
            if (formData.avatar) {
                const avatarFormData = new FormData();
                avatarFormData.append('file', formData.avatar);
                const response = await api.post('/upload', avatarFormData);
                avatarUrl = response.data.url;
            }

            const teamData = {
                name: formData.name,
                description: formData.description,
                avatar: avatarUrl
            };

            const team = await teamsApi.createTeam(teamData);
            toast.success('Team created successfully!');
            navigate(`/team/${team.id}`);
        } catch (error) {
            console.error('Error creating team:', error);
            toast.error('Failed to create team');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TeamCreateSection>
            <Title>Create a New Team</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter team name"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        placeholder="Describe your team's mission and goals"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="avatar">Team Avatar</Label>
                    <Input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {previewImage && (
                        <ImagePreview>
                            <img src={previewImage} alt="Preview" />
                        </ImagePreview>
                    )}
                </FormGroup>

                <ButtonGroup>
                    <CancelButton type="button" onClick={() => navigate(-1)}>
                        Cancel
                    </CancelButton>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Team'}
                    </Button>
                </ButtonGroup>
            </Form>
        </TeamCreateSection>
    );
};

export default TeamCreate; 