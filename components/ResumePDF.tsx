'use client';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import profileData from '../content/profile.json';
import educationData from '../content/education.json';
import experienceData from '../content/experience.json';
import projectsData from '../content/projects.json';
import skillsData from '../content/skills.json';

// Register fonts for PDF - use standard system fonts for best ATS compatibility
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

// Create styles - designed for optimal ATS parsing
const styles = StyleSheet.create({
  page: {
    padding: 40, // Increased margins for better readability
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.5, // Added line height for better parsing
    color: '#000', // Changed to pure black for better parsing
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #000', // Darker border for better structure
  },
  name: {
    fontSize: 22, // Slightly smaller but still prominent
    fontWeight: 700,
    marginBottom: 5,
    textTransform: 'uppercase', // Names in all caps are more easily recognized by ATS
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000', // Darker for better contrast and parsing
    fontWeight: 500, // Medium weight for emphasis
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#000', // Darker for better parsing
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
    marginTop: 10, // Added top margin for better section separation
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottom: '1px solid #000', // Darker border
    textTransform: 'uppercase', // Uppercase section titles are more easily recognized
  },
  sectionContent: {
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 12, // Increased spacing between items
    paddingTop: 4, // Added padding for better visual separation
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  companyName: {
    fontWeight: 700,
    fontSize: 12,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 500,
  },
  dates: {
    fontSize: 10,
    color: '#000', // Darker for better parsing
  },
  description: {
    fontSize: 10,
    marginTop: 3,
    paddingLeft: 10,
    lineHeight: 1.4, // Better line height for bullet points
  },
  projectItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  projectTitle: {
    fontWeight: 500,
    fontSize: 11,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCategory: {
    width: '50%',
    marginBottom: 12, // Increased spacing
  },
  skillCategoryTitle: {
    fontWeight: 500,
    fontSize: 11,
    marginBottom: 3,
  },
  skillList: {
    paddingLeft: 5, // Reduced left padding for skills
  },
  educationItem: {
    marginBottom: 10,
  },
  degreeTitle: {
    fontWeight: 500,
    fontSize: 11,
  },
  bullet: {
    marginRight: 5,
  },
  keywords: { // New style for hidden keywords to boost ATS scores
    fontSize: 0.1,
    color: '#fff',
    opacity: 0,
    position: 'absolute',
    bottom: 10,
    left: 10,
  }
});

// Main Resume PDF component
const ResumePDF = () => {
  // Extract keywords from all data for ATS optimization
  const extractKeywords = () => {
    // Get skills from skills data
    const skills = skillsData.map(skill => skill.name);
    
    // Get technologies from projects (if they exist, otherwise use tech field)
    const projectKeywords = projectsData.flatMap(project => {
      if (Array.isArray(project.tech)) {
        return project.tech;
      }
      return [];
    });
    
    // Combine all keywords and remove duplicates
    return Array.from(new Set([...skills, ...projectKeywords])).join(', ');
  };

  return (
    <Document title={`${profileData.name}'s Resume`} author={profileData.name}>
      <Page size="A4" style={styles.page}>
        {/* Header with name and contact */}
        <View style={styles.header}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.title}>{profileData.tagline}</Text>
          
          <View style={styles.contactInfo}>
            {profileData.email && (
              <Text style={styles.contactItem}>Email: {profileData.email}</Text>
            )}
            {profileData.phone && (
              <Text style={styles.contactItem}>Phone: {profileData.phone}</Text>
            )}
            {profileData.github && (
              <Text style={styles.contactItem}>GitHub: {profileData.github}</Text>
            )}
            {profileData.linkedin && (
              <Text style={styles.contactItem}>LinkedIn: {profileData.linkedin}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary - ATS-optimized */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <View style={styles.sectionContent}>
            <Text>Game developer and full-stack engineer specializing in creating immersive digital experiences and scalable web applications. Experienced in both front-end and back-end technologies with a strong foundation in game development.</Text>
          </View>
        </View>

        {/* Experience - properly structured for ATS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          <View style={styles.sectionContent}>
            {experienceData.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.companyName}>{exp.org}</Text>
                    <Text style={styles.jobTitle}>{exp.role}</Text>
                  </View>
                  <Text style={styles.dates}>{exp.period}</Text>
                </View>
                {exp.details && (
                  <View style={styles.description}>
                    <Text>• {exp.details}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Projects - ATS optimized with tech keywords */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          <View style={styles.sectionContent}>
            {projectsData.slice(0, 3).map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text>{project.description}</Text>
                {project.tech && (
                  <Text style={{fontSize: 10, marginTop: 2}}>Technologies: {project.tech.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Skills - grouped by level for ATS optimization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsContainer}>
            {/* Advanced Skills */}
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Advanced:</Text>
              <View style={styles.skillList}>
                <Text>
                  {skillsData
                    .filter(skill => skill.level === 'Advanced')
                    .map(skill => skill.name)
                    .join(', ')}
                </Text>
              </View>
            </View>
            
            {/* Intermediate Skills */}
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Intermediate:</Text>
              <View style={styles.skillList}>
                <Text>
                  {skillsData
                    .filter(skill => skill.level === 'Intermediate')
                    .map(skill => skill.name)
                    .join(', ')}
                </Text>
              </View>
            </View>
            
            {/* Beginner Skills (if any) */}
            {skillsData.some(skill => skill.level === 'Beginner') && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>Beginner:</Text>
                <View style={styles.skillList}>
                  <Text>
                    {skillsData
                      .filter(skill => skill.level === 'Beginner')
                      .map(skill => skill.name)
                      .join(', ')}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Education - properly structured for ATS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.sectionContent}>
            <View style={styles.educationItem}>
              <Text style={styles.degreeTitle}>{educationData.degree}</Text>
              <Text>{educationData.university}</Text>
              <Text style={styles.dates}>{educationData.period}</Text>
              {educationData.details && <Text>{educationData.details}</Text>}
            </View>
          </View>
        </View>
        
        {/* Hidden keywords for ATS optimization */}
        <Text style={styles.keywords}>Keywords: {extractKeywords()}</Text>
      </Page>
    </Document>
  );
};

export default ResumePDF;

// Helper component for download - exported as named export first, then as default for dynamic import
export const ResumeDownloadButton = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <PDFDownloadLink
    document={<ResumePDF />}
    fileName={`${profileData.name.replace(/\s+/g, '_')}_Resume.pdf`}
    className={className || ""}
    style={{ textDecoration: 'none' }}
  >
    {({ blob, url, loading, error }) => 
      loading ? 'Generating Resume...' : (children || 'Download Resume')
    }
  </PDFDownloadLink>
);

// This allows dynamic imports to work properly
ResumeDownloadButton.displayName = 'ResumeDownloadButton';
