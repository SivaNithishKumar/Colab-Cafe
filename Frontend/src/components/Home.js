import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = styled.section`
  min-height: 90vh;
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
  font-size: 4.5rem;
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

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  padding: 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 0.75rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const FeaturedProjects = styled.section`
  padding: 4rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
  border-radius: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.875rem;
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  span {
    padding: 0.25rem 0.75rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    font-size: 0.875rem;
  }
`;

const Categories = styled.section`
  padding: 4rem 0;
`;

const CategoryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.3));
`;

const Home = () => {
    return (
        <main>
            <Hero>
                <HeroContent className="container">
                    <HeroTitle>Transform Ideas<br />Into Reality</HeroTitle>
                    <p>Join our vibrant community of innovators and bring your creative vision to life through collaborative development.</p>
                    <HeroButtons>
                        <Link to="/register" className="btn btn-primary">Start Creating →</Link>
                        <Link to="/projects" className="btn btn-secondary">Explore Projects</Link>
                    </HeroButtons>
                </HeroContent>
            </Hero>

            <div className="container">
                <StatsGrid>
                    <StatItem>
                        <StatValue>10K+</StatValue>
                        <StatLabel>Active Projects</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>50K+</StatValue>
                        <StatLabel>Creative Minds</StatLabel>
                    </StatItem>
                    <StatItem>
                        <StatValue>100+</StatValue>
                        <StatLabel>Technologies</StatLabel>
                    </StatItem>
                </StatsGrid>

                <FeaturedProjects>
                    <h2 className="section-title">Featured Innovations</h2>
                    <Grid>
                        <FeaturedCard>
                            <CardBadge>Featured</CardBadge>
                            <h3>AI Chat Assistant</h3>
                            <p>A sophisticated chatbot powered by machine learning, capable of understanding context and providing human-like responses.</p>
                            <CardMeta>
                                <span>👥 2.3k views</span>
                                <span>❤️ 245 likes</span>
                            </CardMeta>
                            <CardTags>
                                <span>AI</span>
                                <span>Python</span>
                                <span>NLP</span>
                            </CardTags>
                        </FeaturedCard>

                        <FeaturedCard>
                            <h3>E-commerce Platform</h3>
                            <p>Modern, scalable online shopping solution with real-time inventory management and analytics dashboard.</p>
                            <CardMeta>
                                <span>👥 1.8k views</span>
                                <span>❤️ 189 likes</span>
                            </CardMeta>
                            <CardTags>
                                <span>Web</span>
                                <span>React</span>
                                <span>Node.js</span>
                            </CardTags>
                        </FeaturedCard>

                        <FeaturedCard>
                            <h3>Mobile Game</h3>
                            <p>Immersive 3D puzzle game with stunning graphics and innovative gameplay mechanics.</p>
                            <CardMeta>
                                <span>👥 3.1k views</span>
                                <span>❤️ 426 likes</span>
                            </CardMeta>
                            <CardTags>
                                <span>Game Dev</span>
                                <span>Unity</span>
                                <span>C#</span>
                            </CardTags>
                        </FeaturedCard>
                    </Grid>
                </FeaturedProjects>

                <Categories>
                    <h2 className="section-title">Explore Categories</h2>
                    <Grid>
                        <CategoryCard to="/categories#ai">
                            <CategoryIcon>🤖</CategoryIcon>
                            <h3>AI & Machine Learning</h3>
                            <p>Discover cutting-edge AI projects and innovations</p>
                        </CategoryCard>
                        <CategoryCard to="/categories#web">
                            <CategoryIcon>🌐</CategoryIcon>
                            <h3>Web Development</h3>
                            <p>Explore modern web applications and tools</p>
                        </CategoryCard>
                        <CategoryCard to="/categories#mobile">
                            <CategoryIcon>📱</CategoryIcon>
                            <h3>Mobile Development</h3>
                            <p>Browse innovative mobile solutions</p>
                        </CategoryCard>
                    </Grid>
                </Categories>
            </div>
        </main>
    );
};

export default Home; 