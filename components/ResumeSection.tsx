'use client';
import Section from './Section';

export default function ResumeSection() {
  return (
    <Section id="resume" className="bg-transparent">
      <div className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-4xl font-bold">Résumé</h2>
        <p className="text-gray-300 max-w-xl">
          Download my ATS-optimized résumé (PDF) for a concise overview of my skills, experience,
          and projects.
        </p>
        <a
          href="/Rohit_Kumar_Resume.pdf"
          download
          className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Download PDF
        </a>
      </div>
    </Section>
  );
}
