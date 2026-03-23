import React, { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  EmptyState,
} from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCard";
import * as portfolioData from "../../data/constants";

const PROJECT_FILTERS = [
  { label: "All", value: "all" },
  { label: "Web Apps", value: "web app" },
  { label: "Android Apps", value: "android app" },
  { label: "Machine Learning", value: "machine learning" },
];

const Projects = ({ setOpenModal }) => {
  const [toggle, setToggle] = useState("all");
  const projects = portfolioData.projects ?? [];
  const visibleProjects =
    toggle === "all"
      ? projects
      : projects.filter((project) => project.category === toggle);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          My experience spans web, Android, and machine learning work. Here are
          a few project highlights.
        </Desc>
        {projects.length > 0 && (
          <ToggleButtonGroup>
            {PROJECT_FILTERS.map(({ label, value }, index) => {
              const isActive = toggle === value;

              return (
                <React.Fragment key={value}>
                  <ToggleButton
                    type="button"
                    $active={isActive}
                    aria-pressed={isActive}
                    onClick={() => setToggle(value)}
                  >
                    {label}
                  </ToggleButton>
                  {index < PROJECT_FILTERS.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </ToggleButtonGroup>
        )}
        <CardContainer>
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <ProjectCard
                key={project.id ?? project.title}
                project={project}
                setOpenModal={setOpenModal}
              />
            ))
          ) : (
            <EmptyState>No projects added yet.</EmptyState>
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
