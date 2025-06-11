'use client';
import React from 'react';
import { motion } from 'framer-motion';
import profileData from '../content/profile.json';
import experienceData from '../content/experience.json';
import skillsData from '../content/skills.json';
import educationData from '../content/education.json';
import certificationsData from '../content/certifications.json';

// Add a summary for resume display purpose only
const resumeSummary = "Innovative game developer and full-stack engineer with expertise in Unity/C#, MERN stack, and AI-driven gameplay. Experienced in delivering secure, scalable web solutions and immersive interactive experiences.";

const ResumePreview: React.FC = () => {
  return (
    <div className="resume-preview bg-[#0f1014] border border-accent/20 p-4 rounded-lg shadow-lg max-w-2xl mx-auto text-sm opacity-90">
      <div className="mb-4 border-b border-accent/30 pb-3">
        <h2 className="text-xl font-bold text-white">{profileData.name}</h2>
        <h3 className="text-accent text-base">{profileData.tagline}</h3>
        <div className="text-gray-400 text-xs mt-1">
          {profileData.email} • {profileData.phone}
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white border-l-2 border-accent pl-2 mb-1">SUMMARY</h3>
        <p className="text-xs text-gray-300 leading-tight">{resumeSummary}</p>
      </div>
      
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white border-l-2 border-accent pl-2 mb-1">SKILLS</h3>
        <div className="flex flex-wrap gap-1 text-xs">
          {skillsData.slice(0, 8).map((skill, index) => (
            <span key={index} className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">
              {skill.name}
            </span>
          ))}
          <span className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">+more</span>
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white border-l-2 border-accent pl-2 mb-1">EXPERIENCE</h3>
        {experienceData.slice(0, 1).map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <h4 className="text-xs font-medium text-white">{exp.org}</h4>
              <span className="text-xs text-gray-400">{exp.period}</span>
            </div>
            <p className="text-xs text-accent italic">{exp.role}</p>
            <ul className="text-xs text-gray-300 list-disc list-inside mt-0.5 blur-sm">
              <li>Key achievement highlighted here...</li>
              <li>Another achievement with metrics...</li>
            </ul>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-white border-l-2 border-accent pl-2 mb-1">EDUCATION</h3>
        <div className="text-xs">
          <div className="flex justify-between">
            <h4 className="font-medium text-white">{educationData.university}</h4>
            <span className="text-gray-400">{educationData.period}</span>
          </div>
          <p className="text-gray-300">{educationData.degree}</p>
        </div>
      </div>
      
      {/* Overlay for the blurred effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
};

export default ResumePreview;
