'use client';
import Section from './Section';
import projects from '../content/projects.json';

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="w-full max-w-5xl px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="bg-white/5 p-6 rounded-lg shadow-lg backdrop-blur">
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-300 mb-4">{p.description}</p>
              <p className="text-sm text-accent mb-2">{p.tech.join(' • ')}</p>
              <a
                href={p.link}
                className="underline text-accent hover:text-accent/80"
                target="_blank"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
