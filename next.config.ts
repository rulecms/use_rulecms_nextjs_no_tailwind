import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This checkout often sits next to other lockfiles. Keep tracing and Turbopack
  // rooted on this app so a parent folder cannot be inferred as the workspace.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
