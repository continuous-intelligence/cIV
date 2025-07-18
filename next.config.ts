import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Only apply Sentry in production to avoid development issues
const config =
  process.env.NODE_ENV === 'production'
    ? withSentryConfig(
        bundleAnalyzer(
          withSentryConfig(nextConfig, {
            org: 'xlm-continuous-intelligence',
            project: 'javascript-nextjs',
            silent: !process.env.CI,
            widenClientFileUpload: true,
            tunnelRoute: '/monitoring',
            disableLogger: true,
            automaticVercelMonitors: true,
          })
        ),
        {
          org: 'xlm-continuous-intelligence',
          project: 'javascript-nextjs',
          silent: !process.env.CI,
          widenClientFileUpload: true,
          tunnelRoute: '/monitoring',
          disableLogger: true,
          automaticVercelMonitors: true,
        }
      )
    : bundleAnalyzer(nextConfig);

export default config;
