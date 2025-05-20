/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote"],
  // outputFileTracingIncludes: {
  // 	"/blog/[slug]": ["./outstatic/**/*"],
  // },
};

export default nextConfig;
