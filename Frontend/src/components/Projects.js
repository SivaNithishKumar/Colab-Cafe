import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-next-line 
import styled from 'styled-components';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projectsApi } from '../services/projectsApi';
import { toast } from 'react-toastify';
import api from '../services/api';

const ProjectsSection = styled.section`
  padding: 2rem 0;
`;

const Hero = styled.section`
  min-height: 56vh;
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
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;

  p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    opacity: 0.8;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff 0%, #4f46e5 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const FilterSection = styled.section`
  padding: 2rem 0;
`;

const SearchWrapper = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px var(--primary-color-alpha);
  }
`;

const FilterTags = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
`;

const FilterTag = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover, &.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const FloatingActionButton = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color) 0%, #06b6d4 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const ProjectCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 1rem;
  color: var(--text-color);
  font-size: 1.25rem;
`;

const ProjectDescription = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(79, 70, 229, 0.1);
  color: var(--text-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

const CardLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--secondary-color);
    transform: translateX(4px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
  font-size: 1.1rem;
`;

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectsGridRef = useIntersectionObserver();

  const filters = ['All', 'Web Development', 'Mobile Apps', 'AI & Machine Learning', 'Game Development'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { projects: fetchedProjects } = await projectsApi.getProjects();
      setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
      toast.error('Failed to load projects. Please try again later.');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (!project) return false;

    const matchesSearch = (
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(project.technologies) && project.technologies.some(tech =>
        tech?.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return <LoadingSpinner>Loading projects...</LoadingSpinner>;
  if (error) return <NoResults>{error}</NoResults>;

  return (
    <ProjectsSection>
      <Hero>
        <HeroContent>
          <HeroTitle>Our Projects</HeroTitle>
          <p>Discover our innovative solutions and creative collaborations</p>
        </HeroContent>
      </Hero>

      <FilterSection>
        <div className="container">
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchWrapper>
          <FilterTags>
            {filters.map(filter => (
              <FilterTag
                key={filter}
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterTag>
            ))}
          </FilterTags>
        </div>
      </FilterSection>

      <section className="container">
        <ProjectsGrid ref={projectsGridRef}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => {
              // Ensure technologies is an array
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : (typeof project.technologies === 'string'
                  ? JSON.parse(project.technologies || '[]')
                  : []);

              return (
                <ProjectCard key={project.id}>
                  <Link to={`/project/${project.id}`}>
                    <ProjectImage
                      src={project.thumbnail || '/default-project.png'}
                      alt={project.title}
                    />
                    <ProjectInfo>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>
                        {project.shortDescription || project.description.substring(0, 150)}
                        {project.description.length > 150 && '...'}
                      </ProjectDescription>
                      <TechStack>
                        {technologies.slice(0, 5).map((tech, index) => (
                          <TechTag key={index}>{tech}</TechTag>
                        ))}
                        {technologies.length > 5 && (
                          <TechTag>+{technologies.length - 5} more</TechTag>
                        )}
                      </TechStack>
                    </ProjectInfo>
                  </Link>
                </ProjectCard>
              );
            })
          ) : (
            <NoResults>
              No projects found matching your criteria
            </NoResults>
          )}
        </ProjectsGrid>
      </section>

      <FloatingActionButton to="/project/upload" title="Add New Project">
        +
      </FloatingActionButton>
    </ProjectsSection>
  );
};

export default Projects; 