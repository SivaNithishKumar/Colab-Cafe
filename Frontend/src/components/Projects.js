import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-next-line 
import styled from 'styled-components';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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
  padding: 2rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ProjectCard = styled.article`
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);

    &::after {
      transform: scaleX(1);
    }
  }
`;

const CardMedia = styled(Link)`
  position: relative;
  overflow: hidden;
  display: block;
  border-radius: 12px 12px 0 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.5) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${ProjectCard}:hover & {
    &::after {
      opacity: 1;
    }

    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    img {
      height: 200px;
    }
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;

  a {
    color: var(--text-color);
    text-decoration: none;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const CardDescription = styled.p`
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }
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

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const projectsGridRef = useIntersectionObserver();

  const filters = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Machine Learning'];

  // Sample projects data - replace with your actual data
  const projects = [
    {
      id: 1,
      title: 'Modern Web Platform',
      description: 'A sophisticated web platform built with cutting-edge technologies.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
      techStack: ['React', 'Node.js', 'GraphQL'],
      category: 'Web Development'
    },
    // Add more projects as needed
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
          {filteredProjects.map(project => (
            <ProjectCard key={project.id}>
              <CardMedia to={`/project/${project.id}`}>
                <img src={project.image} alt={project.title} />
              </CardMedia>
              <CardContent>
                <CardTitle>
                  <Link to={`/project/${project.id}`}>{project.title}</Link>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <CardMeta>
                  <TechStack>
                    {project.techStack.map(tech => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  <CardLink to={`/project/${project.id}`}>View Details →</CardLink>
                </CardMeta>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </section>
    </ProjectsSection>
  );
};

export default Projects; 