import React from 'react';
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

const AboutSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 0;

  h2 {
    font-size: 2.5rem;
    margin: 3rem 0 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;

    h2 {
      font-size: 2rem;
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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

    img {
      transform: scale(1.1);
    }
  }
`;

const TeamMemberImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 3px solid var(--primary-color);
  padding: 3px;
  background: var(--bg-color);
  transition: transform 0.3s ease;
`;

const FAQSection = styled.div`
  display: grid;
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FAQItem = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    border-color: var(--primary-color);
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
`;

const ContactSection = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-top: 3rem;

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const About = () => {
  const aboutSectionRef = useIntersectionObserver();

  return (
    <main>
      <Hero>
        <HeroContent>
          <HeroTitle>Our Story</HeroTitle>
          <p>Building a community of innovators and creators</p>
        </HeroContent>
      </Hero>

      <div className="container">
        <AboutSection ref={aboutSectionRef}>
          <p className="lead">
            ProjectShowcase is a community-driven platform where creators can share their projects,
            get feedback, and connect with like-minded individuals. Our mission is to foster
            innovation and collaboration in the tech community.
          </p>

          <h2>Meet Our Team</h2>
          <TeamGrid>
            <TeamMember>
              <TeamMemberImage src="/assets/team/darkside.jpg" alt="Darkside" />
              <h3>Darkside</h3>
              <p>Founder & CEO</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/assets/team/pradheeban.jpg" alt="Pradheeban" />
              <h3>Pradheeban</h3>
              <p>Head of Engineering</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/assets/team/ananth.jpg" alt="Ananth Kumar" />
              <h3>Ananth Kumar</h3>
              <p>Community Manager</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/assets/team/barani.jpg" alt="Barani dharan" />
              <h3>Barani dharan</h3>
              <p>Lead Developer</p>
            </TeamMember>
            <TeamMember>
              <TeamMemberImage src="/assets/team/sathish.jpg" alt="Sathish dk" />
              <h3>Sathish dk</h3>
              <p>UX Designer</p>
            </TeamMember>
          </TeamGrid>

          <h2>Common Questions</h2>
          <FAQSection>
            <FAQItem>
              <h3>How do I submit a project?</h3>
              <p>
                Once you're logged in, click on the "Submit Project" button in your dashboard.
                Fill out the project details, add media, and submit for review.
              </p>
            </FAQItem>
            <FAQItem>
              <h3>What types of projects can I share?</h3>
              <p>
                You can share any tech-related project, from web applications and mobile apps
                to machine learning models and hardware projects. We welcome all innovative
                solutions!
              </p>
            </FAQItem>
            <FAQItem>
              <h3>How can I get feedback on my project?</h3>
              <p>
                Share your project with our community, and other members can provide feedback
                through comments and reactions. You can also join our discussion forums for
                more in-depth conversations.
              </p>
            </FAQItem>
          </FAQSection>

          <ContactSection>
            <h2>Get in Touch</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you!<br />
              Email us at <a href="mailto:contact@projectshowcase.com">contact@projectshowcase.com</a>
            </p>
          </ContactSection>
        </AboutSection>
      </div>
    </main>
  );
};

export default About; 