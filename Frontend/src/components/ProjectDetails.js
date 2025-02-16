import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { projectsApi } from '../services/projectsApi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4f46e5;
    --primary-color-dark: #4338ca;
    --text-color: #1f2937;
    --text-muted: #6b7280;
    --bg-color: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.9);
    --glass-border: rgba(255, 255, 255, 0.2);
    --border-color: #e5e7eb;
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] {
    --primary-color: #818cf8;
    --primary-color-dark: #6366f1;
    --text-color: #f3f4f6;
    --text-muted: #9ca3af;
    --bg-color: #111827;
    --glass-bg: rgba(17, 24, 39, 0.9);
    --glass-border: rgba(255, 255, 255, 0.1);
    --border-color: #374151;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    color: var(--text-color);
    background: var(--bg-color);
    line-height: 1.5;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @keyframes titleGlow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Hero = styled.section`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0;
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

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #4f46e5 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ProjectPreview = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const ProjectContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectDescription = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-lg);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    font-weight: 600;
  }

  h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin: 1.5rem 0 1rem;
    font-weight: 600;
  }

  p {
    line-height: 1.6;
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }
`;

const TechStackSection = styled.div`
  margin: 2rem 0;

  .tech-category {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: var(--primary-color);
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    p {
      color: var(--text-muted);
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1rem 0;
`;

const TechTag = styled.span`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: var(--text-color);

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const ProjectSidebar = styled.div`
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
  }
`;

const InfoCard = styled.div`
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

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16/9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      background: var(--primary-color-dark);
    }
  }

  &.secondary {
    background: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--glass-bg);
      border-color: var(--primary-color);
    }
  }
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 1rem;
  }

  h4 {
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 0.25rem 0 0;
    color: var(--text-muted);
  }
`;

const SimilarProjects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .project-link {
    color: var(--text-color);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const MainContent = styled.main`
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Header = styled.header`
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }

  .nav-logo {
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      text-decoration: none;
      color: var(--text-color);
      &.active {
        color: var(--primary-color);
      }
      &.btn-primary {
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
      }
    }
  }
`;

const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  color: var(--text-muted);
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;

    &:before {
      content: '•';
      color: var(--primary-color);
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    strong {
      color: var(--primary-color);
      font-weight: 600;
    }
  }
`;

const ImplementationSection = styled.div`
  .implementation-category {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: var(--primary-color);
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
        line-height: 1.6;

        &:before {
          content: '•';
          color: var(--primary-color);
          position: absolute;
          left: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;

const TeamSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
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

const TeamMeta = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const CreatorSection = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
`;

const CreatorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 1rem;
`;

const CreatorName = styled(Link)`
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

const CreatedAt = styled.div`
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const projectData = await projectsApi.getProject(id);
      setProject(projectData);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
      toast.error('Failed to load project details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner>Loading project details...</LoadingSpinner>;
  if (error) return <NoResults>{error}</NoResults>;
  if (!project) return <NoResults>Project not found</NoResults>;

  // Parse technologies if it's a string
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : (typeof project.technologies === 'string'
      ? JSON.parse(project.technologies || '[]')
      : []);

  const renderCreator = () => {
    if (project.isTeamProject && project.Team) {
      return (
        <TeamSection>
          <TeamHeader>
            <TeamAvatar src={project.Team.avatar || '/default-team.png'} alt={project.Team.name} />
            <TeamInfo>
              <TeamName to={`/team/${project.Team.id}`}>{project.Team.name}</TeamName>
              <TeamMeta>
                Team Project • Led by {project.Team.leader?.username}
              </TeamMeta>
            </TeamInfo>
          </TeamHeader>
        </TeamSection>
      );
    }

    return (
      <CreatorSection>
        <CreatorAvatar src={project.User?.avatar || '/default-avatar.png'} alt={project.User?.username} />
        <CreatorInfo>
          <CreatorName to={`/profile/${project.User?.id}`}>{project.User?.username}</CreatorName>
          <CreatedAt>Created {formatDate(project.createdAt)}</CreatedAt>
        </CreatorInfo>
      </CreatorSection>
    );
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <nav className="nav container">
          <Link to="/" className="nav-logo">ProjectShowcase</Link>
          <button className="mobile-nav-toggle">☰</button>
          <ul className="nav-links">
            <li><Link to="/projects" className="active">Projects</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login" className="btn btn-primary">Login</Link></li>
            <li><button className="theme-toggle" onClick={() => document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'}>🌓</button></li>
          </ul>
        </nav>
        <div className="mobile-nav">
          <ul className="mobile-nav-links">
            <li><Link to="/projects" className="active">Projects</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login" className="btn btn-primary">Login</Link></li>
            <li><button className="theme-toggle" onClick={() => document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'}>🌓</button></li>
          </ul>
        </div>
        <div className="mobile-nav-overlay"></div>
      </Header>

      <MainContent>
        <Hero>
          <div className="container">
            <HeroContent>
              <div className="project-info">
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectSubtitle>{project.shortDescription}</ProjectSubtitle>
                <ProjectMeta>
                  <span>👤 By <Link to={`/profile/${project.user?.username}`}>{project.user?.username}</Link></span>
                  <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                  <span>👁️ {project.views} views</span>
                  {project.likes > 0 && <span>⭐ {project.likes} likes</span>}
                </ProjectMeta>
                <ProjectActions>
                  {project.demoUrl && (
                    <ActionButton
                      className="primary"
                      as="a"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </ActionButton>
                  )}
                  {project.repoUrl && (
                    <ActionButton
                      className="secondary"
                      as="a"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source Code
                    </ActionButton>
                  )}
                  {user && project?.userId === user.id && (
                    <ActionButton
                      className="secondary"
                      onClick={() => navigate(`/project/${id}/edit`)}
                    >
                      Edit Project
                    </ActionButton>
                  )}
                </ProjectActions>
              </div>
              <ProjectPreview>
                <img src={project.thumbnail || '/default-project.png'} alt={project.title} />
              </ProjectPreview>
            </HeroContent>
          </div>
        </Hero>

        <section className="container">
          <ProjectContent>
            <div className="project-main">
              <ProjectDescription>
                <h2>About the Project</h2>
                <p>{project.description}</p>

                {project.keyFeatures?.length > 0 && (
                  <>
                    <h2>Key Features</h2>
                    <FeaturesList>
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </FeaturesList>
                  </>
                )}

                {(project.architecture || project.technicalImplementation || project.performanceOptimizations) && (
                  <>
                    <h2>Technical Implementation</h2>
                    {project.architecture && (
                      <div className="tech-category">
                        <h3>Architecture Overview</h3>
                        <p>{project.architecture}</p>
                      </div>
                    )}
                    {project.technicalImplementation && (
                      <div className="tech-category">
                        <h3>Implementation Details</h3>
                        <p>{project.technicalImplementation}</p>
                      </div>
                    )}
                    {project.performanceOptimizations && (
                      <div className="tech-category">
                        <h3>Performance Optimizations</h3>
                        <p>{project.performanceOptimizations}</p>
                      </div>
                    )}
                  </>
                )}

                {technologies.length > 0 && (
                  <>
                    <h2>Technologies Used</h2>
                    <TechStack>
                      {technologies.map((tech, index) => (
                        <TechTag key={index}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  </>
                )}

                {project.challengesFaced && (
                  <>
                    <h2>Challenges & Solutions</h2>
                    <p>{project.challengesFaced}</p>
                  </>
                )}

                {project.futurePlans && (
                  <>
                    <h2>Future Plans</h2>
                    <p>{project.futurePlans}</p>
                  </>
                )}
              </ProjectDescription>
            </div>

            <ProjectSidebar>
              <InfoCard>
                <h3>Project Stats</h3>
                <ProjectStats>
                  <StatItem>
                    <StatValue>{project.views}</StatValue>
                    <StatLabel>Views</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{project.likes}</StatValue>
                    <StatLabel>Likes</StatLabel>
                  </StatItem>
                  {project.commentsCount > 0 && (
                    <StatItem>
                      <StatValue>{project.commentsCount}</StatValue>
                      <StatLabel>Comments</StatLabel>
                    </StatItem>
                  )}
                </ProjectStats>
              </InfoCard>

              {renderCreator()}

              {project.category && (
                <InfoCard>
                  <h3>Category</h3>
                  <p>{project.category}</p>
                </InfoCard>
              )}
            </ProjectSidebar>
          </ProjectContent>
        </section>
      </MainContent>

      <Footer>
        <div className="container">
          <p>&copy; 2024 ProjectShowcase. Empowering creators worldwide.</p>
        </div>
      </Footer>
    </>
  );
};

export default ProjectDetails; 