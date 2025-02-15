import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

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

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &.btn-primary {
    background: var(--primary-color);
    color: white;

    &:hover {
      background: var(--primary-color-dark);
      transform: translateY(-2px);
    }
  }

  &.btn-secondary {
    background: var(--glass-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
  }

  &.btn-outline {
    background: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px);
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

const ProjectDetails = () => { // eslint-disable-next-line
  const { id } = useParams(); 

  const project = {
    title: "Modern Web Platform",
    subtitle: "A sophisticated web platform built with cutting-edge technologies",
    preview: "https://source.unsplash.com/random/800x600?website",
    description: {
      overview: [
        "This modern web platform showcases the latest in web development technologies and best practices. Built with scalability and performance in mind, it features a responsive design, real-time updates, and a seamless user experience.",
        "The platform is designed to handle high traffic loads while maintaining optimal performance. It incorporates modern security practices and follows industry-standard coding conventions. Our focus on user experience ensures that every interaction is intuitive and meaningful."
      ],
      features: [
        {
          title: "Responsive Design",
          description: "Works flawlessly across all devices and screen sizes"
        },
        {
          title: "Real-time Updates",
          description: "Instant data synchronization for collaborative features"
        },
        {
          title: "Advanced Authentication",
          description: "Secure user authentication with multi-factor support"
        },
        {
          title: "Performance Optimized",
          description: "Blazing fast load times and optimized resource usage"
        },
        {
          title: "API Integration",
          description: "Well-documented APIs for third-party integration"
        },
        {
          title: "Scalable Architecture",
          description: "Built to handle growth with microservices architecture"
        },
        {
          title: "Security First",
          description: "Implements latest security best practices and protocols"
        },
        {
          title: "CI/CD Pipeline",
          description: "Automated testing and deployment workflows"
        }
      ],
      technical: {
        frontend: {
          title: "Frontend Development",
          description: "Modern React-based frontend with state-of-the-art tooling",
          technologies: ["React", "Redux", "TypeScript", "Styled Components", "Next.js", "React Query"]
        },
        backend: {
          title: "Backend Services",
          description: "Robust Node.js backend with GraphQL API",
          technologies: ["Node.js", "Express", "GraphQL", "Apollo Server", "WebSocket", "Redis"]
        },
        database: {
          title: "Database & Storage",
          description: "Scalable data storage with caching",
          technologies: ["MongoDB", "PostgreSQL", "Redis", "Amazon S3", "ElasticSearch"]
        },
        devops: {
          title: "DevOps & Infrastructure",
          description: "Cloud-native infrastructure with automated scaling",
          technologies: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "ELK Stack"]
        }
      }
    },
    implementation: {
      sections: [
        {
          title: "Architecture Overview",
          content: "The platform follows a microservices architecture, with each service handling specific business domains. This ensures high availability and independent scaling of components.",
          details: [
            "Service mesh for inter-service communication",
            "Event-driven architecture for real-time features",
            "Caching layers for improved performance",
            "Load balancing and auto-scaling"
          ]
        },
        {
          title: "Development Approach",
          content: "We follow an agile development methodology with continuous integration and deployment. This ensures rapid iterations and reliable releases.",
          details: [
            "Test-driven development",
            "Automated CI/CD pipelines",
            "Code quality checks",
            "Regular security audits"
          ]
        },
        {
          title: "Performance Optimization",
          content: "Performance is a key focus area, with optimizations at every layer of the stack.",
          details: [
            "Code splitting and lazy loading",
            "Server-side rendering",
            "Asset optimization",
            "Database query optimization"
          ]
        }
      ]
    },
    creator: {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "https://via.placeholder.com/50"
    },
    meta: {
      author: "By Sarah Johnson",
      date: "Updated March 15, 2024",
      views: "2.5k views",
      rating: "4.9/5 rating"
    },
    stats: {
      views: "2.5k",
      stars: "180",
      forks: "45",
      contributors: "12"
    },
    techStack: {
      frontend: ["React", "Redux", "Styled Components", "TypeScript"],
      backend: ["Node.js", "Express", "GraphQL"],
      database: ["MongoDB", "Redis"],
      devops: ["Docker", "AWS", "CI/CD", "Kubernetes"]
    },
    gallery: [
      {
        url: "https://source.unsplash.com/random/800x600?coding",
        alt: "Modern development environment showing the React component structure"
      },
      {
        url: "https://source.unsplash.com/random/800x600?technology",
        alt: "Backend architecture diagram showcasing the microservices"
      },
      {
        url: "https://source.unsplash.com/random/800x600?computer",
        alt: "DevOps pipeline visualization with deployment stages"
      }
    ],
    similarProjects: [
      { title: "E-commerce Platform", link: "#", description: "A full-featured online shopping platform" },
      { title: "Social Network App", link: "#", description: "Modern social networking application" },
      { title: "Portfolio Builder", link: "#", description: "Professional portfolio creation tool" }
    ]
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
                <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
                <ProjectMeta>
                  <span>👤 {project.meta.author}</span>
                  <span>📅 {project.meta.date}</span>
                  <span>👁️ {project.meta.views}</span>
                  <span>⭐ {project.meta.rating}</span>
                </ProjectMeta>
                <ProjectActions>
                  <ActionButton href="#" className="btn btn-primary">Live Demo</ActionButton>
                  <ActionButton href="#" className="btn btn-secondary">Source Code</ActionButton>
                  <ActionButton href="#" className="btn btn-outline">⭐ Star Project</ActionButton>
                </ProjectActions>
              </div>
              <ProjectPreview>
                <img src={project.preview} alt="Project Preview" />
              </ProjectPreview>
            </HeroContent>
          </div>
        </Hero>

        <section className="container">
          <ProjectContent>
            <div className="project-main">
              <ProjectDescription>
                <h2>About the Project</h2>
                {project.description.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                <h2>Key Features</h2>
                <FeaturesList>
                  {project.description.features.map((feature, index) => (
                    <li key={index}>
                      <strong>{feature.title}</strong> - {feature.description}
                    </li>
                  ))}
                </FeaturesList>

                <h2>Technical Implementation</h2>
                <TechStackSection>
                  {Object.entries(project.description.technical).map(([key, section]) => (
                    <div key={key} className="tech-category">
                      <h3>{section.title}</h3>
                      <p>{section.description}</p>
                      <TechStack>
                        {section.technologies.map((tech, index) => (
                          <TechTag key={index}>{tech}</TechTag>
                        ))}
                      </TechStack>
                    </div>
                  ))}
                </TechStackSection>

                <h2>Implementation Details</h2>
                <ImplementationSection>
                  {project.implementation.sections.map((section, index) => (
                    <div key={index} className="implementation-category">
                      <h3>{section.title}</h3>
                      <p>{section.content}</p>
                      <ul>
                        {section.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ImplementationSection>

                <h2>Project Gallery</h2>
                <GalleryGrid>
                  {project.gallery.map((image, index) => (
                    <GalleryItem key={index}>
                      <img src={image.url} alt={image.alt} />
                    </GalleryItem>
                  ))}
                </GalleryGrid>
              </ProjectDescription>
            </div>

            <ProjectSidebar>
              <InfoCard>
                <h3>Project Stats</h3>
                <ProjectStats>
                  <StatItem>
                    <StatValue>{project.stats.views}</StatValue>
                    <StatLabel>Views</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{project.stats.stars}</StatValue>
                    <StatLabel>Stars</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{project.stats.forks}</StatValue>
                    <StatLabel>Forks</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{project.stats.contributors}</StatValue>
                    <StatLabel>Contributors</StatLabel>
                  </StatItem>
                </ProjectStats>
              </InfoCard>

              <InfoCard>
                <h3>Creator</h3>
                <CreatorInfo>
                  <img src={project.creator.avatar} alt={project.creator.name} />
                  <div>
                    <h4>{project.creator.name}</h4>
                    <p>{project.creator.role}</p>
                  </div>
                </CreatorInfo>
              </InfoCard>

              <InfoCard>
                <h3>Similar Projects</h3>
                <SimilarProjects>
                  {project.similarProjects.map((proj, index) => (
                    <a key={index} href={proj.link} className="project-link">
                      <strong>{proj.title}</strong>
                      <p>{proj.description}</p>
                    </a>
                  ))}
                </SimilarProjects>
              </InfoCard>
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