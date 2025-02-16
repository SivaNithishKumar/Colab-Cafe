import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { teamsApi } from '../services/teamsApi';
import { toast } from 'react-toastify';

const TeamDetailsSection = styled.section`
  padding: 2rem 0;
`;

const Hero = styled.section`
  min-height: 60vh;
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

const TeamContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 2rem;
`;

const TeamHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const TeamName = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TeamDescription = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
`;

const TeamStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  text-align: center;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const MemberCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  ${props => props.isLeader && `
    &::before {
      content: 'Team Lead';
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      color: white;
      font-weight: 600;
    }
  `}
`;

const MemberAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  border: 3px solid var(--primary-color);
`;

const MemberName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const ProjectCard = styled(Link)`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease;
  text-decoration: none;
  color: var(--text-color);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--text-color);
`;

const EditButton = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #06b6d4 100%);
  color: white;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TeamDetails = () => {
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        fetchTeamDetails();
    }, [id]);

    const fetchTeamDetails = async () => {
        try {
            setIsLoading(true);
            const teamData = await teamsApi.getTeamById(id);
            setTeam(teamData);
        } catch (error) {
            console.error('Error fetching team details:', error);
            toast.error('Failed to load team details');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading team details...</div>;
    }

    if (!team) {
        return <div>Team not found</div>;
    }

    const isTeamLeader = user?.id === team.leader?.id;

    return (
        <TeamDetailsSection>
            <Hero>
                <TeamContent>
                    <TeamHeader>
                        <TeamName>{team.name}</TeamName>
                        <TeamDescription>{team.description}</TeamDescription>
                    </TeamHeader>

                    <TeamStats>
                        <StatCard>
                            <StatValue>{team.stats?.projectCount || 0}</StatValue>
                            <StatLabel>Projects</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatValue>{team.Users?.length || 0}</StatValue>
                            <StatLabel>Members</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatValue>{team.stats?.achievementCount || 0}</StatValue>
                            <StatLabel>Achievements</StatLabel>
                        </StatCard>
                        <StatCard>
                            <StatValue>{team.stats?.yearsActive || 0}</StatValue>
                            <StatLabel>Years Active</StatLabel>
                        </StatCard>
                    </TeamStats>

                    <section>
                        <SectionTitle>Team Members</SectionTitle>
                        <MembersGrid>
                            {team.Users?.map(member => (
                                <MemberCard
                                    key={member.id}
                                    isLeader={member.id === team.leader?.id}
                                >
                                    <MemberAvatar src={member.avatar || '/default-avatar.png'} alt={member.username} />
                                    <MemberName>{member.username}</MemberName>
                                    <MemberRole>{member.TeamMember?.role || 'Member'}</MemberRole>
                                </MemberCard>
                            ))}
                        </MembersGrid>
                    </section>

                    <section>
                        <SectionTitle>Team Projects</SectionTitle>
                        <ProjectsGrid>
                            {team.Projects?.map(project => (
                                <ProjectCard to={`/project/${project.id}`} key={project.id}>
                                    <ProjectTitle>{project.title}</ProjectTitle>
                                    <ProjectDescription>{project.description}</ProjectDescription>
                                    <TechTags>
                                        {project.technologies?.map((tech, index) => (
                                            <TechTag key={index}>{tech}</TechTag>
                                        ))}
                                    </TechTags>
                                </ProjectCard>
                            ))}
                        </ProjectsGrid>
                    </section>
                </TeamContent>
            </Hero>

            {isTeamLeader && (
                <EditButton to={`/team/${team.id}/edit`}>
                    Edit Team
                </EditButton>
            )}
        </TeamDetailsSection>
    );
};

export default TeamDetails; 