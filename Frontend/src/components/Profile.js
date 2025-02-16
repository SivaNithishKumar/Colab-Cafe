import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaEdit, FaSave, FaTrophy, FaGraduationCap, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../services/api';
import { toast } from 'react-toastify';
import { projectsApi } from '../services/projectsApi';
import { teamsApi } from '../services/teamsApi';

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
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  background: 
    radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent),
    radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.1), transparent);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 0;
  }
`;

const ProfileContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 3rem;
  padding: 3rem;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 2rem;
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

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
  }
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

  &::before {
    content: '';
    position: absolute;
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
  width: 100%;
  margin: 1rem 0;

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
    padding: 0.5rem;
    border-radius: 50%;

    &:hover {
      background: rgba(79, 70, 229, 0.1);
      color: var(--primary-color);
    }
  }

  &:hover .edit-button {
    opacity: 1;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--glass-bg);
    color: var(--text-color);
    font-size: inherit;
    font-family: inherit;
    resize: vertical;
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      outline: none;
    }
  }
`;

const ProfileTitle = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  margin: 0.5rem 0 1.5rem;
  font-size: 1.1rem;
  position: relative;
  display: inline-block;
  padding-right: 2rem;

  .edit-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
    padding: 0.5rem;
    border-radius: 50%;

    &:hover {
      background: rgba(79, 70, 229, 0.1);
      color: var(--primary-color);
    }
  }

  &:hover .edit-button {
    opacity: 1;
  }
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

const ProfileStatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
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
  text-align: left;

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--glass-bg);
    color: var(--text-color);
    font-size: 0.9rem;
    margin-top: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      outline: none;
    }
  }
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

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const SkillItem = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 15px;
  font-size: 0.75rem;
  color: var(--text-color);
  transition: all 0.3s;
  cursor: default;

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }

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

  p {
    line-height: 1.6;
    color: var(--text-color);
    opacity: 0.9;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);

  button {
    background: var(--glass-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }

    svg {
      font-size: 1rem;
    }
  }
`;

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
    opacity: 1;
  }
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
`;

const ProjectsSection = styled(ProfileSection)`
  padding: 0;
  overflow: hidden;
`;

const ProjectsContainer = styled.div`
  position: relative;
  padding: 2rem;
  overflow: hidden;
`;

const ProjectsSlider = styled.div`
  display: flex;
  gap: 2rem;
  transition: transform 0.3s ease;
  padding: 0.5rem;
  margin: 0 -1rem;

  a {
    pointer-events: auto;
    text-decoration: none;
  }
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(31, 38, 135, 0.1);

  &:hover:not(:disabled) {
    background: var(--primary-color);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ProjectCard = styled(GlassContainer)`
  flex: 0 0 400px;
  max-width: 400px;
  padding: 0;
  transition: all 0.3s;
  position: relative;
  height: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(31, 38, 135, 0.15);
  }

  .project-thumbnail {
    width: 100%;
    height: 220px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .project-thumbnail img {
    transform: scale(1.05);
  }

  .project-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-size: 1.4rem;
    margin: 0 0 1rem;
    color: var(--text-color);
    font-weight: 600;
  }

  p {
    color: var(--text-muted);
    margin-bottom: 1rem;
    line-height: 1.6;
    flex: 1;
  }

  .project-stats {
    display: flex;
    gap: 1rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
`;

const CardTags = styled.div`
  display: flex;
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

const DeleteButton = styled(EditButton)`
  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`;

const EditOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const EditModal = styled(GlassContainer)`
  width: 90%;
  max-width: 600px;
  padding: 2rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  h2 {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: var(--text-color);
  }

  input, textarea {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--glass-bg);
    color: var(--text-color);
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      outline: none;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &.primary {
    background: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
    }
  }

  &.secondary {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);

    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px);
    }
  }
`;

const EditButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.save {
    background: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
    }
  }
  
  &.cancel {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    
    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
`;

const SocialInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--glass-bg);
    color: var(--text-color);
    font-size: 0.9rem;
    transition: all 0.3s;
    
    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
      outline: none;
    }
  }
`;

const AddButton = styled.button`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  ${Button} {
    margin: 0 auto;
  }
`;

const TeamsSection = styled(ProfileSection)`
  margin-top: 2rem;
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamCard = styled(GlassContainer)`
  padding: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TeamAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const TeamRole = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const TeamStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const StatItem = styled.div`
  text-align: center;
`;

const Profile = () => {
  const { user: authUser, updateProfile } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    title: '',
    skills: [],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const projectsPerPage = 3;
  const sliderRef = useRef(null);
  const [teams, setTeams] = useState([]);

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/users/${username || authUser?.username}`);
      const userData = response.data;
      setUser(userData);

      console.log('User ID:', userData.id); // Debug log

      setEditData({
        bio: userData.bio || '',
        title: userData.title || '',
        skills: userData.skills || [],
        socialLinks: userData.socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
          website: ''
        }
      });

      // Fetch only the projects created by this user
      const projectsResponse = await projectsApi.getProjects();
      console.log('All projects:', projectsResponse.projects); // Debug log

      // Filter projects on the client side to ensure we only get this user's projects
      const userProjects = projectsResponse.projects.filter(project => project.userId === userData.id);
      console.log('Filtered user projects:', userProjects); // Debug log

      setUserProjects(userProjects || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [username, authUser?.username]);

  const fetchUserTeams = async () => {
    try {
      const teamsData = await teamsApi.getUserTeams();
      setTeams(teamsData);
    } catch (error) {
      console.error('Error fetching user teams:', error);
      toast.error('Failed to load teams');
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserTeams();
  }, [fetchUserProfile, fetchUserTeams]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      bio: user.bio || '',
      title: user.title || '',
      skills: user.skills || [],
      socialLinks: user.socialLinks || {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
      }
    });
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(editData);
      if (result.success) {
        setUser(prev => ({ ...prev, ...editData }));
        setIsEditing(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setEditData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSkillAdd = (skill) => {
    if (!editData.skills.includes(skill)) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const openEditModal = (mode, data = null) => {
    setEditMode(mode);
    setModalData(data);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditMode(null);
    setModalData(null);
  };

  const handleAddAchievement = () => {
    const newAchievement = {
      type: 'award',
      title: 'New Achievement',
      description: 'Click edit to modify this achievement'
    };
    openEditModal('achievement', newAchievement);
  };

  const handleAddProject = () => {
    const newProject = {
      title: 'New Project',
      description: 'Click edit to modify this project',
      technologies: []
    };
    openEditModal('project', newProject);
  };

  const handleModalSave = async () => {
    try {
      if (editMode === 'achievement') {
        const updatedAchievements = [...(user.achievements || [])];
        if (modalData.id) {
          const index = updatedAchievements.findIndex(a => a.id === modalData.id);
          updatedAchievements[index] = modalData;
        } else {
          updatedAchievements.push(modalData);
        }
        await updateProfile({ achievements: updatedAchievements });
        setUser(prev => ({ ...prev, achievements: updatedAchievements }));
      } else if (editMode === 'project') {
        const updatedProjects = [...(user.projects || [])];
        const projectData = {
          ...modalData,
          technologies: Array.isArray(modalData.technologies) ? modalData.technologies : []
        };
        if (modalData.id) {
          const index = updatedProjects.findIndex(p => p.id === modalData.id);
          updatedProjects[index] = projectData;
        } else {
          updatedProjects.push(projectData);
        }
        await updateProfile({ projects: updatedProjects });
        setUser(prev => ({ ...prev, projects: updatedProjects }));
      }
      closeEditModal();
    } catch (error) {
      setError('Failed to save changes');
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      const updatedAchievements = user.achievements.filter(a => a.id !== id);
      await updateProfile({ achievements: updatedAchievements });
      setUser(prev => ({ ...prev, achievements: updatedAchievements }));
    } catch (error) {
      setError('Failed to delete achievement');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const updatedProjects = user.projects.filter(p => p.id !== id);
      await updateProfile({ projects: updatedProjects });
      setUser(prev => ({ ...prev, projects: updatedProjects }));
    } catch (error) {
      setError('Failed to delete project');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
        toast.error('Only JPG, PNG, and GIF images are allowed');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.url) {
          // Get the full URL by combining the backend URL with the path
          const fullImageUrl = `${process.env.REACT_APP_API_URL}${response.data.url}`;

          // Update user profile with new avatar URL
          const result = await updateProfile({ avatar: fullImageUrl });
          if (result.success) {
            setUser(prev => ({
              ...prev,
              avatar: fullImageUrl
            }));
            toast.success('Profile picture updated successfully!');
          }
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast.error('Failed to update profile picture. Please try again.');
      }
    }
  };

  const handleNextSlide = () => {
    const maxSlides = Math.max(0, userProjects.length - projectsPerPage);
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isOwnProfile = authUser?.username === user.username;

  return (
    <main>
      <ProfileHero>
        <ProfileContent>
          <ProfileSidebar>
            <ProfileAvatar>
              <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
              {isOwnProfile && (
                <>
                  <input
                    type="file"
                    id="avatarUpload"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                  <div
                    className="edit-overlay"
                    onClick={() => document.getElementById('avatarUpload').click()}
                  >
                    <FaEdit />
                  </div>
                </>
              )}
            </ProfileAvatar>

            <ProfileName>{user.username}</ProfileName>

            {isEditing ? (
              <>
                <EditableField>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleInputChange}
                    placeholder="Your title"
                  />
                </EditableField>

                <ProfileStats>
                  <ProfileStat>
                    <ProfileStatValue>{user.stats?.projectsCount || 0}</ProfileStatValue>
                    <StatLabel>Projects</StatLabel>
                  </ProfileStat>
                  <ProfileStat>
                    <ProfileStatValue>{user.stats?.contributionsCount || 0}</ProfileStatValue>
                    <StatLabel>Contributions</StatLabel>
                  </ProfileStat>
                </ProfileStats>

                <EditableField>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows="4"
                  />
                </EditableField>

                <SidebarSkills>
                  <SidebarTitle>Skills</SidebarTitle>
                  <SkillsContainer>
                    {editData.skills.map((skill, index) => (
                      <SkillItem key={index}>
                        {skill}
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                        >
                          <FaTimes />
                        </button>
                      </SkillItem>
                    ))}
                  </SkillsContainer>
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSkillAdd(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    style={{ marginTop: '1rem' }}
                  />
                </SidebarSkills>

                <SocialInputsContainer>
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={editData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={editData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={editData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="Website URL"
                    value={editData.socialLinks.website}
                    onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                  />
                </SocialInputsContainer>

                <EditButtonsContainer>
                  <ActionButton className="save" onClick={handleSave}>
                    <FaSave /> Save Changes
                  </ActionButton>
                  <ActionButton className="cancel" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </ActionButton>
                </EditButtonsContainer>
              </>
            ) : (
              <>
                <ProfileTitle>
                  {user.title}
                  {isOwnProfile && (
                    <button className="edit-button" onClick={handleEdit}>
                      <FaEdit />
                    </button>
                  )}
                </ProfileTitle>

                <ProfileStats>
                  <ProfileStat>
                    <ProfileStatValue>{user.stats?.projectsCount || 0}</ProfileStatValue>
                    <StatLabel>Projects</StatLabel>
                  </ProfileStat>
                  <ProfileStat>
                    <ProfileStatValue>{user.stats?.contributionsCount || 0}</ProfileStatValue>
                    <StatLabel>Contributions</StatLabel>
                  </ProfileStat>
                </ProfileStats>

                <div style={{ marginBottom: '1.5rem' }}>
                  {user.bio || 'No bio added yet'}
                  {isOwnProfile && (
                    <button className="edit-button" onClick={handleEdit}>
                      <FaEdit />
                    </button>
                  )}
                </div>

                <SidebarSkills>
                  <SidebarTitle>
                    Skills
                    {isOwnProfile && (
                      <button className="edit-button" onClick={handleEdit}>
                        <FaEdit />
                      </button>
                    )}
                  </SidebarTitle>
                  <SkillsContainer>
                    {user.skills?.map((skill, index) => (
                      <SkillItem key={index}>{skill}</SkillItem>
                    ))}
                    {(!user.skills || user.skills.length === 0) && (
                      <div style={{ color: 'var(--text-muted)' }}>No skills added yet</div>
                    )}
                  </SkillsContainer>
                </SidebarSkills>

                <ProfileSocial>
                  {user.socialLinks?.github && (
                    <SocialLink href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </SocialLink>
                  )}
                  {user.socialLinks?.linkedin && (
                    <SocialLink href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </SocialLink>
                  )}
                  {user.socialLinks?.twitter && (
                    <SocialLink href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </SocialLink>
                  )}
                  {user.socialLinks?.website && (
                    <SocialLink href={user.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </SocialLink>
                  )}
                  {isOwnProfile && (
                    <button className="edit-button" onClick={handleEdit}>
                      <FaEdit />
                    </button>
                  )}
                </ProfileSocial>
              </>
            )}
          </ProfileSidebar>

          <ProfileMain>
            <ProfileSection>
              <SectionTitle>
                About Me
                {isOwnProfile && (
                  <button onClick={() => handleEdit()}>
                    <FaEdit /> Edit Profile
                  </button>
                )}
              </SectionTitle>
              <p>{user.bio}</p>
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
                {user.achievements?.map((achievement, index) => (
                  <AchievementCard key={index}>
                    {isOwnProfile && (
                      <div className="edit-buttons">
                        <EditButton onClick={() => openEditModal('achievement', achievement)}>
                          <FaEdit />
                        </EditButton>
                        <DeleteButton onClick={() => handleDeleteAchievement(achievement.id)}>
                          <FaTimes />
                        </DeleteButton>
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

            <ProjectsSection>
              <SectionTitle>
                Featured Projects
                {isOwnProfile && (
                  <Button
                    className="primary"
                    onClick={() => navigate('/project/upload')}
                  >
                    Add New Project
                  </Button>
                )}
              </SectionTitle>
              <ProjectsContainer>
                {userProjects.length > 0 ? (
                  <>
                    {userProjects.length > projectsPerPage && (
                      <>
                        <SliderButton
                          className="prev"
                          onClick={handlePrevSlide}
                          disabled={currentSlide === 0}
                        >
                          <FaChevronLeft />
                        </SliderButton>
                        <SliderButton
                          className="next"
                          onClick={handleNextSlide}
                          disabled={currentSlide >= userProjects.length - projectsPerPage}
                        >
                          <FaChevronRight />
                        </SliderButton>
                      </>
                    )}
                    <ProjectsSlider
                      ref={sliderRef}
                      style={{
                        transform: `translateX(${-currentSlide * 432}px)`,
                      }}
                    >
                      {userProjects.map((project) => (
                        <ProjectCard key={project.id}>
                          <Link to={`/project/${project.id}`}>
                            <div className="project-thumbnail">
                              <img
                                src={project.thumbnail ? `${process.env.REACT_APP_API_URL}${project.thumbnail}` : '/default-project.png'}
                                alt={project.title}
                              />
                            </div>
                            <div className="project-content">
                              <h3>{project.title}</h3>
                              <p>
                                {project.shortDescription ||
                                  (project.description && project.description.substring(0, 150)) ||
                                  'No description available'}
                                {(project.shortDescription?.length > 150 || (project.description?.length > 150)) && '...'}
                              </p>
                              <CardTags>
                                {Array.isArray(project.technologies) ? (
                                  project.technologies.slice(0, 4).map((tech, techIndex) => (
                                    <span key={techIndex}>{tech}</span>
                                  ))
                                ) : (
                                  typeof project.technologies === 'string' && project.technologies ? (
                                    JSON.parse(project.technologies).slice(0, 4).map((tech, techIndex) => (
                                      <span key={techIndex}>{tech}</span>
                                    ))
                                  ) : []
                                )}
                                {Array.isArray(project.technologies) && project.technologies.length > 4 && (
                                  <span>+{project.technologies.length - 4} more</span>
                                )}
                              </CardTags>
                              <div className="project-stats">
                                <span>👁️ {project.views || 0}</span>
                                <span>⭐ {project.likes || 0}</span>
                                {project.commentsCount > 0 && <span>💬 {project.commentsCount}</span>}
                              </div>
                            </div>
                          </Link>
                        </ProjectCard>
                      ))}
                    </ProjectsSlider>
                  </>
                ) : (
                  <EmptyState>
                    <p>{isOwnProfile ? 'You haven\'t created any projects yet' : 'This user hasn\'t created any projects yet'}</p>
                    {isOwnProfile && (
                      <Button
                        className="primary"
                        onClick={() => navigate('/project/upload')}
                      >
                        Create Your First Project
                      </Button>
                    )}
                  </EmptyState>
                )}
              </ProjectsContainer>
            </ProjectsSection>

            <TeamsSection>
              <SectionTitle>
                Teams
                {isOwnProfile && (
                  <Button
                    className="primary"
                    onClick={() => navigate('/team/create')}
                  >
                    Create Team
                  </Button>
                )}
              </SectionTitle>

              <TeamsContainer>
                {teams.map(team => (
                  <TeamCard key={team.id}>
                    <TeamHeader>
                      <TeamAvatar src={team.avatar || '/default-team.png'} alt={team.name} />
                      <TeamInfo>
                        <TeamName to={`/team/${team.id}`}>{team.name}</TeamName>
                        <TeamRole>
                          {team.leaderId === user.id ? 'Team Leader' : 'Team Member'}
                        </TeamRole>
                      </TeamInfo>
                    </TeamHeader>
                    <TeamStats>
                      <StatItem>
                        <ProfileStatValue>{team.stats?.projectCount || 0}</ProfileStatValue>
                        <StatLabel>Projects</StatLabel>
                      </StatItem>
                      <StatItem>
                        <ProfileStatValue>{team.stats?.memberCount || 0}</ProfileStatValue>
                        <StatLabel>Members</StatLabel>
                      </StatItem>
                    </TeamStats>
                  </TeamCard>
                ))}
                {teams.length === 0 && (
                  <EmptyState>
                    {isOwnProfile
                      ? "You haven't joined any teams yet. Create or join a team to collaborate with others!"
                      : "This user hasn't joined any teams yet."}
                  </EmptyState>
                )}
              </TeamsContainer>
            </TeamsSection>
          </ProfileMain>
        </ProfileContent>
      </ProfileHero>

      {showEditModal && (
        <EditOverlay>
          <EditModal>
            <h2>{editMode === 'achievement' ? 'Edit Achievement' : 'Edit Project'}</h2>
            <EditForm onSubmit={(e) => {
              e.preventDefault();
              handleModalSave();
            }}>
              <FormGroup>
                <label>Title</label>
                <input
                  type="text"
                  value={modalData.title}
                  onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Description</label>
                <textarea
                  value={modalData.description}
                  onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  required
                />
              </FormGroup>
              {editMode === 'achievement' && (
                <FormGroup>
                  <label>Type</label>
                  <select
                    value={modalData.type}
                    onChange={(e) => setModalData({ ...modalData, type: e.target.value })}
                  >
                    <option value="award">Award</option>
                    <option value="certification">Certification</option>
                    <option value="contribution">Contribution</option>
                  </select>
                </FormGroup>
              )}
              {editMode === 'project' && (
                <FormGroup>
                  <label>Technologies</label>
                  <input
                    type="text"
                    placeholder="Add technologies (comma-separated)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                        setModalData({
                          ...modalData,
                          technologies: [...(Array.isArray(modalData.technologies) ? modalData.technologies : []), ...techs]
                        });
                        e.target.value = '';
                      }
                    }}
                  />
                  <div style={{ marginTop: '0.5rem' }}>
                    {Array.isArray(modalData.technologies) && modalData.technologies.map((tech, index) => (
                      <span key={index} style={{ marginRight: '0.5rem' }}>
                        {tech}
                        <button
                          onClick={() => {
                            const newTechs = modalData.technologies.filter((_, i) => i !== index);
                            setModalData({ ...modalData, technologies: newTechs });
                          }}
                          style={{ marginLeft: '0.25rem', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </FormGroup>
              )}
              <ButtonGroup>
                <Button type="button" className="secondary" onClick={closeEditModal}>
                  Cancel
                </Button>
                <Button type="submit" className="primary">
                  Save Changes
                </Button>
              </ButtonGroup>
            </EditForm>
          </EditModal>
        </EditOverlay>
      )}
    </main>
  );
};

export default Profile; 