// components/ProjectCard.tsx
"use client"
import React from "react";
import { Button } from "./ui/button";
// No need for Link from 'lucide-react' unless you use it for the icon
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define the type for a single tag within a project, consistent with your data structure
interface ProjectTag {
    name: string;
    parentCategoryName: string; // To know which main category this tag belongs to
    path: string | null; // Specific page path for this tag (if any)
    mainPagePath: string; // The main category page path
}

interface Project {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    tags: ProjectTag[]; // Now an array of ProjectTag objects
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const router = useRouter();

    const handleTagClick = (tag: ProjectTag) => { // Accept the full tag object
        // The condition should check the 'parentCategoryName' property of the tag
        // AND ensure that the tag actually has a specific path defined
        if (tag.parentCategoryName === "Brand Identity" && tag.path) {
            router.push(tag.path);
        } else {
            router.push(tag.mainPagePath);
        }
    };

    return (
        <div className="h-full flex flex-col group relative overflow-hidden rounded-lg bg-white  hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    priority
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium transform -translate-y-2 opacity-100 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.category}
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-0 opacity-100 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tagObj, i) => ( // Use tagObj to represent the object
                            <button
                                key={tagObj.name} // Use tagObj.name as key
                                onClick={() => handleTagClick(tagObj)} // Pass the whole tag object
                                className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-white/30 transition-colors duration-200"
                            >
                                {tagObj.name} {/* Display the name property */}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 scale-75 group-hover:scale-100">
                    <NextLink href="/projects" passHref>
                        <Button className="bg-white text-[#bb8d03fc] hover:bg-gray-100 px-6 py-2 rounded-full font-medium shadow-lg">
                            View Project
                        </Button>
                    </NextLink>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
