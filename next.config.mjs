/** @type {import('next').NextConfig} */

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

const isGitHubPages =
  process.env.GITHUB_ACTIONS === "true";

const basePath =
  isGitHubPages && repoName
    ? `/${repoName}`
    : "";

const nextConfig = {
  output: "export",

  basePath,

  assetPrefix: basePath
    ? `${basePath}/`
    : "",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig; 