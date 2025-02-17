import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { teamsApi } from '../services/teamsApi';
import { toast } from 'react-toastify';

const TeamsSection = styled.section`
  padding: 2rem 0;
`;

const Hero = styled.section`
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
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
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff 0%, #4f46e5 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const TeamCard = styled.div`
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

const TeamHeader = styled.div`
  padding: 2rem;
  text-align: center;
`;

const TeamAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  border: 4px solid var(--primary-color);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const TeamDescription = styled.p`
  color: var(--text-muted);
  margin-bottom: 1.5rem;
`;

const TeamStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--glass-border);
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
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
`;

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await teamsApi.getUserTeams();
      setTeams(response);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to load teams');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  return (
    <TeamsSection>
      <Hero>
        <HeroContent>
          <HeroTitle>My Teams</HeroTitle>
          <p>Collaborate with talented developers and create amazing projects together</p>
        </HeroContent>
      </Hero>

      <TeamsGrid>
        {teams.map(team => (
          <Link to={`/team/${team.id}`} key={team.id} style={{ textDecoration: 'none' }}>
            <TeamCard>
              <TeamHeader>
                <TeamAvatar src={team.avatar || '/default-team.png'} alt={team.name} />
                <TeamName>{team.name}</TeamName>
                <TeamDescription>{team.description}</TeamDescription>
              </TeamHeader>
              <TeamStats>
                <StatItem>
                  <StatValue>{team.stats?.projectCount || 0}</StatValue>
                  <StatLabel>Projects</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{team.stats?.memberCount || 0}</StatValue>
                  <StatLabel>Members</StatLabel>
                </StatItem>
              </TeamStats>
            </TeamCard>
          </Link>
        ))}
      </TeamsGrid>

      <FloatingActionButton to="/team/create" title="Create New Team">
        +
      </FloatingActionButton>
    </TeamsSection>
  );
};

export default Teams; 