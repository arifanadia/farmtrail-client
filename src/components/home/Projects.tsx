import React from "react";
import ProjectsSlider from "./ProjectsSlider";

const Projects = () => (
    <section className="bg-dark-1 py-12 lg:py-24 my-28 w-full ">
        <div className="text-center">
            <span className="subtle-semibold text-light_green uppercase">
                Latest Projects
            </span>
            <h2 className="h3-bold lg:h2-bold ">Recently Completed Projects</h2>
        </div>
        <div className="mt-8 lg:mt-12">
            <ProjectsSlider />
        </div>
    </section>
);

export default Projects;
