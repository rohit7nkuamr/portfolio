/** @type {import('next').NextConfig} */
const repo = 'portfolio';
const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : '',
  assetPrefix: isGithubPages ? `/${repo}/` : '/',
};

module.exports = nextConfig;
