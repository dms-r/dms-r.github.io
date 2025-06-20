
// This file serves as the single source of truth for all content in your portfolio.
// To update your portfolio, you will primarily edit the `portfolioData` object below.
// Ensure that any new data you add (like projects, experiences, or skills)
// conforms to the TypeScript interfaces defined in this file.

import type { LucideIcon } from 'lucide-react';
// Importing icons from lucide-react. Add any new icons you might need for skill categories here.
import { Laptop, Cpu, Wifi, AppWindow, ShieldCheck } from 'lucide-react'; // Added ShieldCheck for Cyber Security

// --- INTERFACE DEFINITIONS ---
// These interfaces define the structure for your portfolio data.

/**
 * Represents a single work experience item.
 */
export interface WorkExperienceItem {
  id: string; // A unique identifier for this item (e.g., "exp1", "exp_company_role").
  company: string; // The name of the company or organization.
  jobTitle: string; // Your role or job title.
  employmentDates: string; // The period of employment (e.g., "Jan 2020 - Dec 2021", "2023 - Present").
  description: string[]; // An array of strings, where each string is a bullet point describing responsibilities or achievements.
  logoUrl?: string; // Optional: URL to the company's logo. Use a placeholder like "https://placehold.co/100x100.png" if no logo is available.
}

/**
 * Represents a single education item.
 * It uses the WorkExperienceItem structure for component reusability in display.
 * - `company` field will represent the Institution name.
 * - `jobTitle` field will represent the Degree or Program name.
 * - `employmentDates` field will represent the duration of study.
 */
export type EducationItem = WorkExperienceItem;

/**
 * Represents a single project item.
 */
export interface ProjectItem {
  id: string; // A unique identifier for this project (e.g., "proj_alpha", "project1").
  name: string; // The name of the project.
  description: string; // A brief description of the project.
  technologies: string[]; // An array of strings listing the technologies used (e.g., ["React", "Node.js", "Firebase"]).
  imageUrl: string; // URL to an image representing the project. Use a placeholder like "https://placehold.co/600x400.png".
  liveDemoUrl?: string; // Optional: URL to a live demo of the project.
  githubRepoUrl?: string; // Optional: URL to the project's GitHub repository.
  dataAiHint: string; // One or two keywords for AI to find a relevant Unsplash image (e.g., "web app", "mobile interface"). Max two words.
}

/**
 * Defines the levels of skill proficiency.
 */
export type SkillLevel = 'Novice' | 'Advanced Beginner' | 'Competent' | 'Proficient' | 'Expert';

/**
 * Represents an individual skill.
 */
export interface Skill {
  name: string; // The name of the specific skill (e.g., "JavaScript", "Git").
  level?: SkillLevel; // Optional: Descriptive level of understanding.
}

/**
 * Represents a category of skills (e.g., "Programming Languages", "Tools").
 */
export interface SkillCategory {
  name: string; // The name of the skill category (e.g., "Frontend Development").
  icon: LucideIcon; // An icon component from lucide-react representing this category (e.g., Code2, Database).
  skills: Skill[];
}

/**
 * Defines the overall structure for all portfolio data.
 */
export interface CandidateProfile {
  name: string; // Your full name.
  title: string; // Your professional title or headline (e.g., "Software Engineer", "Aspiring Web Developer").
  bio: string; // A short biography or summary about yourself.
  heroImage: string; // URL for the main hero image on the homepage. Use a placeholder like "https://placehold.co/1200x600.png".
  heroImageAiHint: string; // One or two keywords for AI for the hero image (e.g., "developer portrait", "tech workspace"). Max two words.
  contact: {
    email: string; // Your contact email address.
    linkedin: string; // Full URL to your LinkedIn profile.
    github: string; // Full URL to your GitHub profile.
  };
  workExperience: WorkExperienceItem[]; // An array of your work experiences.
  education: EducationItem[]; // An array of your educational qualifications.
  projects: ProjectItem[]; // An array of your projects.
  skills: {
    technical: SkillCategory[]; // An array of your technical skill categories.
    soft?: string[]; // Optional: An array of your soft skills.
  };
}

// --- PORTFOLIO DATA ---
// This is the main object containing all your portfolio information.
// Edit the values below to customize your portfolio.
// To add new items (e.g., a new project or experience),
// simply add a new object to the respective array, ensuring it follows the defined interface structure.

export const portfolioData: CandidateProfile = {
  name: "Dimas Refaldy",
  title: "IT Enthusiast",
  bio: "Someone with a strong interest in technology, economics, and philosophy.",
  heroImage: "https://avatars.githubusercontent.com/u/174266241?v=4",
  heroImageAiHint: "photo profile", // Keywords for hero image (max 2 words)
  contact: {
    email: "dimas@dpublic.my.id",
    linkedin: "https://linkedin.com/in/dimas-refaldy",
    github: "https://github.com/dms-r",
  },
  // To add a new work experience, copy an existing block, modify its content, and ensure 'id' is unique.
  workExperience: [
    {
      id: "exp1",
      company: "Community Support",
      jobTitle: "Informal Technical Support",
      employmentDates: "2023 - Present",
      description: [
        "Regularly assisted family, friends, internet citizens in solving computer-related problems.",
        "Create documentation both formal and non-formal in Google Workspace.",
      ],
      logoUrl: "https://placehold.co/100x100.png?text=Community", // Placeholder logo
    },
    {
      id: "exp2",
      company: "Freelance",
      jobTitle: "Bug Hunter",
      employmentDates: "2023 - Present",
      description: [
        "Analyze the vulnerability of a web or mobile app, thus ensuring it remains safe from similar attacks.",
        "Create reports or documentation needed to report bugs found.",
      ],
      logoUrl: "https://placehold.co/100x100.png?text=Bug%20Hunter", // Placeholder logo
    },

    // Add more work experience items here by duplicating the object structure above.
  ],
  // To add a new education entry, copy an existing block, modify its content, and ensure 'id' is unique.
  education: [
    {
      id: "edu1",
      company: "SMAN 1 Haurgeulis", // Institution name
      jobTitle: "Mathematics and Natural Sciences", // Program/Degree
      employmentDates: "2022 - 2025", // Duration
      description: [
        "Achieved a GPA of 94/100.",
        "Graduated with a strong foundation for technical learning."
      ],
      logoUrl: "https://sman1haurgeulis.sch.id/img/smantulis.webp",
    },
    // Add more education items here.
  ],
  // To add a new project, copy an existing block, modify its content, and ensure 'id' and 'dataAiHint' are updated.
  projects: [
    {
      id: "proj_homelab",
      name: "Home Lab",
      description: "A self-driven project involving installation and dual-boot configuration of Windows and Linux operating systems, hardware troubleshooting, and optimization of home Wi-Fi networks.",
      technologies: ["Windows 10/11", "Linux", "Hardware Troubleshooting", "Network Configuration", "Wi-Fi Optimization"],
      imageUrl: "https://unsplash.com/photos/ZZ0YbE9n938/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGhvZW0lMjBsYWIlMjB0ZWNofGVufDB8fHx8MTc0OTkzNjI0OXww&force=true&w=640", 
      dataAiHint: "setup computer", // Keywords for project image (max 2 words)
    },
    {
      "id": "proj_homeserver",
      "name": "Virtual Home Server",
      "description": "I set up a virtual home server on my laptop using VirtualBox and Debian Linux. This project allowed me to explore core home server functionalities. I gained hands-on experience understanding various server roles and the fundamentals of remote access and management within a virtualized environment.",
      "technologies": ["Linux", "VirtualBox", "Networking Basics", "SSH"],
      "imageUrl": "https://unsplash.com/photos/M5tzZtFCOfs/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQ5OTM1MjcyfA&force=true&w=640",
      "dataAiHint": "setup server"
    },
    {
      "id": "proj_pentest",
      "name": "Pentest CBT App",
      "description": "Conducted penetration testing on a Computer-Based Test (CBT) application. Identified and documented vulnerabilities related to network services, application code, and overall program response. The goal was to assess and improve the application's security posture by examining potential attack vectors like Insecure Direct Object References (IDOR), network weaknesses, and subdomain enumeration.",
      "technologies": ["Nmap", "IDOR", "Network Analysis", "APK Analysis", "Web Security", "Subdomain Enumeration", "JadX"],
      "imageUrl": "https://unsplash.com/photos/lVF2HLzjopw/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQ5OTM2ODU2fA&force=true&w=640",
      "dataAiHint": "pentest cbt"
    },
        
    // Add more project items here.
  ],
  skills: {
    // To add a new technical skill category, add a new object to this array.
    // To add a new skill within a category, add to its 'skills' array.
    technical: [
      {
        name: "Operating Systems",
        icon: Laptop, // Icon from lucide-react
        skills: [
          { name: "Windows 10/11", level: "Competent" }, 
          { name: "Linux", level: "Competent" },
          { name: "Debian", level: "Competent" },
          { name: "Ubuntu", level: "Competent" },
          { name: "OpenSuse", level: "Competent" },
          { name: "Fedora", level: "Competent" },
        ],
      },
      {
        name: "Hardware",
        icon: Cpu,
        skills: [
          { name: "PC Component Identification", level: "Advanced Beginner" },
          { name: "Hardware Troubleshooting", level: "Advanced Beginner" },
          { name: "Peripheral Management", level: "Advanced Beginner" },
          { name: "PC Upgrades", level: "Advanced Beginner" },
        ],
      },
      {
        name: "Networking",
        icon: Wifi,
        skills: [
          { name: "TCP/IP Concept", level: "Advanced Beginner" },
          { name: "DNS & DHCP Configuration", level: "Advanced Beginner" },
          { name: "Connection Troubleshooting", level: "Advanced Beginner" },
          { name: "Wi-Fi Setup & Optimization", level: "Advanced Beginner" },
          { name: "Network Security", level: "Advanced Beginner" },
          { name: "Firewall", level: "Advanced Beginner" },
          { name: "Basic Network Monitoring", level: "Advanced Beginner" },
        ],
      },
      {
        name: "Software & Applications",
        icon: AppWindow,
        skills: [
          { name: "Microsoft Office Suite", level: "Competent" },
          { name: "Google Workspace", level: "Competent" },
          { name: "Application Management", level: "Competent" },
          { name: "Basic Antivirus Management", level: "Competent" },
        ],
      },
      {
        name: "Cyber Security",
        icon: ShieldCheck, // Using ShieldCheck icon
        skills: [
          { name: "CIA Triad", level: "Competent" },
          { name: "Web Concepts", level: "Competent" },
          { name: "Security Apk", level: "Novice" },
          { name: "Reverse Engineering", level: "Novice" },
          { name: "Web Security", level: "Advanced Beginner" },
          { name: "OWASP Top 10 (IDOR)", level: "Advanced Beginner" },
          { name: "BurpSuite Community", level: "Advanced Beginner" },
          { name: "Nmap", level: "Advanced Beginner" },
          { name: "JADX", level: "Novice" },
        ],
      },

      // Add more technical skill categories here.
    ],
    // To add a new soft skill, simply add a string to this array.
    soft: [
      "Problem Solving",
      "Self-Learning",
      "Commitment to Learning",
      "Technical Aptitude",
      "Adaptability",
      "Attention to Detail",
      // Add more soft skills here.
    ],
  },
};

