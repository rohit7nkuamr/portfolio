'use client';
import Section from './Section';
import profile from '../content/profile.json';

export default function ContactSection() {
  return (
    <Section id="contact" className="bg-transparent">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold">Get in Touch</h2>
        <p className="text-gray-300">Feel free to reach out anytime—let’s build something awesome.</p>
        <div className="flex justify-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            className="inline-block border border-accent text-accent font-semibold px-6 py-3 rounded-full hover:bg-accent/10 transition"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            className="inline-block border border-accent text-accent font-semibold px-6 py-3 rounded-full hover:bg-accent/10 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
