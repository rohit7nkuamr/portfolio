'use client';
import Section from './Section';
import experiences from '../content/experience.json';

export default function ExperienceSection() {
  return (
    <Section id="experience" className="bg-transparent">
      <div className="max-w-3xl w-full px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((e) => (
            <div key={e.org} className="bg-white/5 p-6 rounded-lg backdrop-blur">
              <h3 className="text-xl font-semibold">{e.role} — {e.org}</h3>
              <p className="text-sm text-gray-400 mb-2">{e.period}</p>
              <p className="text-gray-300">{e.details}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
