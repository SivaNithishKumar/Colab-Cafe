<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaEdit, FaSave, FaTrophy, FaGraduationCap, FaStar, FaTimes } from 'react-icons/fa';
import api from '../services/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileHero = styled.section`
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = styled.section`
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
<<<<<<< HEAD
  padding: 4rem 0;
  background: 
    radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent),
    radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.1), transparent);
=======
  padding: 6rem 0;
  background: radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent);
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3

  &::before {
    content: '';
    position: absolute;
    inset: 0;
<<<<<<< HEAD
=======
    background: 
      radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.15), transparent 60%),
      radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.15), transparent 60%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 0;
  }
`;

<<<<<<< HEAD
const ProfileContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const GlassContainer = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const ProfileSidebar = styled(GlassContainer)`
  padding: 2rem;
  text-align: center;
  position: sticky;
  top: 2rem;
  height: fit-content;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
`;

const ProfileAvatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  position: relative;
  background: var(--primary-color);
  padding: 4px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg-color);
  }
=======
const ProfileHeader = styled.div`
  position: relative;
  margin-top: -120px;
  padding: 0 2rem;
  margin-bottom: 2rem;
  z-index: 10;
`;

const ProfileMain = styled.div`
  background: var(--glass-bg);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3

  &::before {
    content: '';
    position: absolute;
<<<<<<< HEAD
    inset: -3px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .edit-overlay {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    svg {
      font-size: 1.5rem;
      color: white;
    }
  }
`;

const ProfileName = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EditableField = styled.div`
  position: relative;
  display: inline-block;

  .edit-button {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .edit-button {
    opacity: 1;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: var(--glass-bg);
    color: var(--text-color);
    font-size: inherit;
    font-family: inherit;
    resize: vertical;
  }
`;

const ProfileTitle = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const ProfileStat = styled(GlassContainer)`
  padding: 1rem;
  background: rgba(79, 70, 229, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.25rem;
`;

const ProfileSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.8;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    color: var(--primary-color);
  }
`;

const SidebarSkills = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--glass-border);
`;

const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const SkillTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 15px;
  font-size: 0.75rem;
  color: var(--text-color);
  transition: all 0.3s;
  cursor: default;
=======
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-primary);
    opacity: 0.7;
  }
`;

const ProfileAvatar = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 4px solid var(--bg-color);
  margin: -100px auto 1.5rem;
  display: block;
  box-shadow: var(--shadow-lg);
  background: var(--bg-color);
  padding: 4px;
  position: relative;
  z-index: 2;
`;

const ProfileInfo = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleGlow 3s ease-in-out infinite;
  }

  p {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const ProfileBio = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  background: var(--glass-bg);
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
  justify-content: center;
`;

const SkillTag = styled.span`
  padding: 0.25rem 1rem;
  border-radius: 20px;
  background: var(--glass-bg);
  font-size: 0.875rem;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
<<<<<<< HEAD

  .remove-skill {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

const ProfileMain = styled.div`
  display: grid;
  gap: 2rem;
`;

const ProfileSection = styled(GlassContainer)`
  padding: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
  animation-fill-mode: both;

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.3s;

    &:hover {
      background: rgba(79, 70, 229, 0.1);
      color: var(--primary-color);
=======
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  padding: 1rem;
  background: var(--glass-bg);
  border-radius: 12px;
`;

const StatItem = styled.div`
  text-align: center;
  min-width: 100px;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: var(--glass-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
    }
  }
`;

<<<<<<< HEAD
const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const AchievementCard = styled(GlassContainer)`
  padding: 1.5rem;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(31, 38, 135, 0.15);
  }

  .edit-buttons {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .edit-buttons {
=======
const ProfileTabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-color);
  margin: 2rem 0;
  padding: 0 1rem;
`;

const Tab = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.7;
  transition: all 0.2s;

  &.active {
    border-bottom-color: var(--primary-color);
    opacity: 1;
    color: var(--primary-color);
  }

  &:hover {
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
    opacity: 1;
  }
`;

<<<<<<< HEAD
const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled(GlassContainer)`
  padding: 1.5rem;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(31, 38, 135, 0.15);
  }

  h3 {
    font-size: 1.2rem;
=======
const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  h3 {
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  p {
    color: var(--text-muted);
    margin-bottom: 1rem;
<<<<<<< HEAD
    line-height: 1.5;
  }

  .edit-buttons {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .edit-buttons {
    opacity: 1;
=======
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
  }
`;

const CardTags = styled.div`
  display: flex;
<<<<<<< HEAD
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  span {
    padding: 0.25rem 0.75rem;
    background: rgba(79, 70, 229, 0.1);
    border-radius: 15px;
    font-size: 0.875rem;
    color: var(--text-color);
    font-weight: 500;
    transition: all 0.3s;

    &:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--primary-color);
    background: rgba(79, 70, 229, 0.1);
  }
`;

const SaveButton = styled(EditButton)`
  &:hover {
    color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }
`;

const DeleteButton = styled(EditButton)`
  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: rgba(79, 70, 229, 0.05);
  }
`;

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const isOwnProfile = user?.username === username;

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  const fetchProfileData = async () => {
    try {
      const targetUsername = username || user?.username;

      if (!targetUsername) {
        setError('No username provided');
        return;
      }

      const response = await api.get(`/api/users/${targetUsername}`);
      setProfile(response.data);
      setEditedProfile(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.response?.data?.message || 'Failed to load profile');
      if (error.response?.status === 404) {
        navigate('/404');
      }
    }
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (field) => {
    try {
      await api.patch(`/api/users/${profile.username}`, {
        [field]: editedProfile[field]
      });
      setProfile(editedProfile);
      setEditingField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const updatedSkills = [...(profile.skills || []), newSkill.trim()];
      await api.patch(`/api/users/${profile.username}`, {
        skills: updatedSkills
      });
      setProfile(prev => ({
        ...prev,
        skills: updatedSkills
      }));
      setNewSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const updatedSkills = profile.skills.filter(skill => skill !== skillToRemove);
      await api.patch(`/api/users/${profile.username}`, {
        skills: updatedSkills
      });
      setProfile(prev => ({
        ...prev,
        skills: updatedSkills
      }));
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  const handleAddAchievement = async () => {
    try {
      const newAchievement = {
        type: 'award',
        title: 'New Achievement',
        description: 'Click edit to modify this achievement'
      };
      const updatedAchievements = [...(profile.achievements || []), newAchievement];
      await api.patch(`/api/users/${profile.username}`, {
        achievements: updatedAchievements
      });
      setProfile(prev => ({
        ...prev,
        achievements: updatedAchievements
      }));
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleAddProject = async () => {
    try {
      const newProject = {
        title: 'New Project',
        description: 'Click edit to modify this project',
        technologies: []
      };
      const updatedProjects = [...(profile.projects || []), newProject];
      await api.patch(`/api/users/${profile.username}`, {
        projects: updatedProjects
      });
      setProfile(prev => ({
        ...prev,
        projects: updatedProjects
      }));
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileHero>
      <ProfileContent>
        <ProfileSidebar>
          <ProfileAvatar>
            <img
              src={profile.avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"}
              alt={profile.name}
            />
            {isOwnProfile && (
              <div className="edit-overlay">
                <FaEdit />
              </div>
            )}
          </ProfileAvatar>

          <EditableField>
            {editingField === 'name' ? (
              <>
                <input
                  value={editedProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleSave('name')}
                  autoFocus
                />
                <SaveButton onClick={() => handleSave('name')}><FaSave /></SaveButton>
              </>
            ) : (
              <ProfileName>
                {profile.name}
                {isOwnProfile && (
                  <EditButton onClick={() => handleEdit('name')}><FaEdit /></EditButton>
                )}
              </ProfileName>
            )}
          </EditableField>

          <EditableField>
            {editingField === 'title' ? (
              <>
                <input
                  value={editedProfile.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  onBlur={() => handleSave('title')}
                  autoFocus
                />
                <SaveButton onClick={() => handleSave('title')}><FaSave /></SaveButton>
              </>
            ) : (
              <ProfileTitle>
                {profile.title}
                {isOwnProfile && (
                  <EditButton onClick={() => handleEdit('title')}><FaEdit /></EditButton>
                )}
              </ProfileTitle>
            )}
          </EditableField>

          <ProfileStats>
            <ProfileStat>
              <StatValue>{profile.projectCount || 0}</StatValue>
              <StatLabel>Projects</StatLabel>
            </ProfileStat>
            <ProfileStat>
              <StatValue>{profile.followerCount || 0}</StatValue>
              <StatLabel>Followers</StatLabel>
            </ProfileStat>
          </ProfileStats>

          <ProfileSocial>
            {profile.github && <SocialLink href={profile.github} target="_blank"><FaGithub /></SocialLink>}
            {profile.linkedin && <SocialLink href={profile.linkedin} target="_blank"><FaLinkedin /></SocialLink>}
            {profile.twitter && <SocialLink href={profile.twitter} target="_blank"><FaTwitter /></SocialLink>}
            {profile.website && <SocialLink href={profile.website} target="_blank"><FaGlobe /></SocialLink>}
          </ProfileSocial>

          <SidebarSkills>
            <SidebarTitle>
              Skills
              {isOwnProfile && (
                <button onClick={() => setEditingField('skills')}>
                  <FaEdit />
                </button>
              )}
            </SidebarTitle>
            <SkillsGrid>
              {profile.skills?.map((skill, index) => (
                <SkillTag key={index}>
                  {skill}
                  {isOwnProfile && editingField === 'skills' && (
                    <span className="remove-skill" onClick={() => handleRemoveSkill(skill)}>
                      <FaTimes />
                    </span>
                  )}
                </SkillTag>
              ))}
            </SkillsGrid>
            {isOwnProfile && editingField === 'skills' && (
              <div style={{ marginTop: '1rem' }}>
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <SaveButton onClick={handleAddSkill}><FaSave /></SaveButton>
              </div>
            )}
          </SidebarSkills>
        </ProfileSidebar>

        <ProfileMain>
          <ProfileSection>
            <SectionTitle>
              About Me
              {isOwnProfile && (
                <button onClick={() => handleEdit('bio')}>
                  <FaEdit /> Edit
                </button>
              )}
            </SectionTitle>
            <EditableField>
              {editingField === 'bio' ? (
                <>
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    onBlur={() => handleSave('bio')}
                    autoFocus
                  />
                  <SaveButton onClick={() => handleSave('bio')}><FaSave /></SaveButton>
                </>
              ) : (
                <p>{profile.bio}</p>
              )}
            </EditableField>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>
              Achievements
              {isOwnProfile && (
                <button onClick={handleAddAchievement}>
                  <FaEdit /> Add Achievement
                </button>
              )}
            </SectionTitle>
            <AchievementsGrid>
              {profile.achievements?.map((achievement, index) => (
                <AchievementCard key={index}>
                  {isOwnProfile && (
                    <div className="edit-buttons">
                      <EditButton><FaEdit /></EditButton>
                      <DeleteButton><FaTimes /></DeleteButton>
                    </div>
                  )}
                  <AchievementIcon>
                    {achievement.type === 'award' && <FaTrophy />}
                    {achievement.type === 'certification' && <FaGraduationCap />}
                    {achievement.type === 'contribution' && <FaStar />}
                  </AchievementIcon>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </AchievementCard>
              ))}
            </AchievementsGrid>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>
              Featured Projects
              {isOwnProfile && (
                <button onClick={handleAddProject}>
                  <FaEdit /> Add Project
                </button>
              )}
            </SectionTitle>
            <ProjectsGrid>
              {profile.projects?.map((project, index) => (
                <ProjectCard key={index}>
                  {isOwnProfile && (
                    <div className="edit-buttons">
                      <EditButton><FaEdit /></EditButton>
                      <DeleteButton><FaTimes /></DeleteButton>
                    </div>
                  )}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <CardTags>
                    {project.technologies?.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </CardTags>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </ProfileSection>
        </ProfileMain>
      </ProfileContent>
    </ProfileHero>
=======
  gap: 0.5rem;
  margin: 1rem 0;

  span {
    padding: 0.25rem 0.75rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
`;

const ProjectMeta = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Projects');

  // Sample user data - replace with your actual data
  const user = {
    name: 'John Doe',
    title: 'Senior Full Stack Developer | AI Enthusiast',
    avatar: 'https://via.placeholder.com/160',
    bio: 'Building innovative solutions with modern technologies. Passionate about AI, web development, and open source.',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 'AWS'],
    stats: {
      projects: 15,
      followers: '1.2k',
      following: 450,
      likes: '5.2k'
    },
    projects: [
      {
        id: 1,
        title: 'AI Chat Assistant',
        description: 'A sophisticated chatbot powered by machine learning and NLP',
        image: 'https://via.placeholder.com/300x200',
        tags: ['AI', 'Python'],
        likes: 245,
        comments: 23
      },
      {
        id: 2,
        title: 'Portfolio Website',
        description: 'Personal portfolio built with React and Three.js',
        image: 'https://via.placeholder.com/300x200',
        tags: ['Web', 'React'],
        likes: 189,
        comments: 15
      }
    ]
  };

  return (
    <main>
      <Hero />
      <div className="container">
        <ProfileHeader>
          <ProfileMain>
            <ProfileAvatar src={user.avatar} alt="Profile picture" />
            <ProfileInfo>
              <h1>{user.name}</h1>
              <p>{user.title}</p>

              <ProfileBio>
                {user.bio}
              </ProfileBio>

              <SkillTags>
                {user.skills.map(skill => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </SkillTags>

              <ProfileStats>
                <StatItem>
                  <StatValue>{user.stats.projects}</StatValue>
                  <StatLabel>Projects</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{user.stats.followers}</StatValue>
                  <StatLabel>Followers</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{user.stats.following}</StatValue>
                  <StatLabel>Following</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{user.stats.likes}</StatValue>
                  <StatLabel>Likes</StatLabel>
                </StatItem>
              </ProfileStats>

              <ProfileActions>
                <ActionButton className="primary">Follow</ActionButton>
                <ActionButton className="secondary">Message</ActionButton>
              </ProfileActions>
            </ProfileInfo>

            <ProfileTabs>
              {['Projects', 'About', 'Activity', 'Followers'].map(tab => (
                <Tab
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tab>
              ))}
            </ProfileTabs>

            <ProfileGrid>
              {user.projects.map(project => (
                <ProjectCard key={project.id}>
                  <img src={project.image} alt={project.title} />
                  <ProjectInfo>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <CardTags>
                      {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </CardTags>
                    <ProjectMeta>
                      <span>❤️ {project.likes}</span>
                      <span>💬 {project.comments}</span>
                    </ProjectMeta>
                  </ProjectInfo>
                </ProjectCard>
              ))}
            </ProfileGrid>
          </ProfileMain>
        </ProfileHeader>
      </div>
    </main>
>>>>>>> cb5b936b3ad25662a02ce09c2019746f0e763fc3
  );
};

export default Profile; 