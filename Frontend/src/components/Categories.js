import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Hero = styled.section`
  min-height: 60vh;
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
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
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CategoryIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  ${CategoryCard}:hover & {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  }
`;

const CategoryStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  padding-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
`;

const FeaturedProjects = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const Categories = () => {
  const gridRef = useIntersectionObserver();

  const categories = [
    {
      id: 1,
      icon: '🤖',
      title: 'Artificial Intelligence',
      description: 'Explore cutting-edge AI projects, from machine learning models to deep learning applications and natural language processing solutions.',
      projectCount: '150+',
      followers: '1.2k',
      featuredProjects: [
        { id: 1, name: 'AI Chat Assistant' },
        { id: 2, name: 'Image Recognition' },
        { id: 3, name: 'NLP Framework' }
      ]
    },
    {
      id: 2,
      icon: '🌐',
      title: 'Web Development',
      description: 'Discover modern web applications, from frontend frameworks to backend APIs, and full-stack solutions.',
      projectCount: '300+',
      followers: '2.5k',
      featuredProjects: [
        { id: 4, name: 'E-commerce Platform' },
        { id: 5, name: 'Social Network' },
        { id: 6, name: 'Portfolio Builder' }
      ]
    },
    {
      id: 3,
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Browse innovative mobile applications for iOS, Android, and cross-platform solutions.',
      projectCount: '200+',
      followers: '1.8k',
      featuredProjects: [
        { id: 7, name: 'Fitness Tracker' },
        { id: 8, name: 'Travel Guide' },
        { id: 9, name: 'Food Delivery' }
      ]
    },
    {
      id: 4,
      icon: '🎮',
      title: 'Game Development',
      description: 'Explore amazing games and game engines built with various technologies and platforms.',
      projectCount: '120+',
      followers: '1.5k',
      featuredProjects: [
        { id: 10, name: '3D Puzzle Game' },
        { id: 11, name: 'RPG Engine' },
        { id: 12, name: 'VR Experience' }
      ]
    },
    {
      id: 5,
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Discover security tools, penetration testing frameworks, and cryptography projects.',
      projectCount: '80+',
      followers: '900',
      featuredProjects: [
        { id: 13, name: 'Password Manager' },
        { id: 14, name: 'Network Scanner' },
        { id: 15, name: 'Security Audit Tool' }
      ]
    },
    {
      id: 6,
      icon: '📊',
      title: 'Data Science',
      description: 'Explore data analysis tools, visualization projects, and big data solutions.',
      projectCount: '180+',
      followers: '1.6k',
      featuredProjects: [
        { id: 16, name: 'Analytics Dashboard' },
        { id: 17, name: 'Data Visualization' },
        { id: 18, name: 'ML Pipeline' }
      ]
    }
  ];

  return (
    <main>
      <Hero>
        <HeroContent>
          <HeroTitle>Explore Categories</HeroTitle>
          <p>Discover amazing projects across different domains and technologies</p>
        </HeroContent>
      </Hero>

      <section className="container">
        <CategoriesGrid ref={gridRef}>
          {categories.map(category => (
            <CategoryCard key={category.id}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <CategoryStats>
                <span>📊 {category.projectCount} projects</span>
                <span>👥 {category.followers} followers</span>
              </CategoryStats>
              <FeaturedProjects>
                Popular:{' '}
                {category.featuredProjects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                    {index < category.featuredProjects.length - 1 ? ' • ' : ''}
                  </React.Fragment>
                ))}
              </FeaturedProjects>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </section>
    </main>
  );
};

export default Categories; 