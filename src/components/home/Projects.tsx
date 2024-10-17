import React from "react";
import ProjectsSlider from "./ProjectsSlider";

const Projects = () => (
    <section className="bg-dark-1 py-24 my-28 container">
        <div className="text-center">
            <span className="subtle-semibold text-light_green uppercase">
                Latest Projects
            </span>
            <h2 className="h2-bold ">Recently Completed Projects</h2>
        </div>
        <div className="mt-8">
            <ProjectsSlider />
        </div>
    </section>
);

export default Projects;
