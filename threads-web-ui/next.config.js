const { withPlugins } = require('next-composed-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  {
    swcMinify: true,
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
  },
  [withBundleAnalyzer],
);
