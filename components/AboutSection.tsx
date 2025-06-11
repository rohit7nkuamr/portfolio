'use client';
import Section from './Section';
import aboutData from '../content/about.json';

export default function AboutSection() {
  return (
    <Section id="about" className="bg-transparent">
      <div className="max-w-2xl text-center space-y-6">
        <h2 className="text-4xl font-bold">About Me</h2>
        {aboutData.bio.map((paragraph: string) => (
          <p key={paragraph.slice(0,20)} className="text-lg text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
