import type { NextConfig } from "next";

// Headers de seguridad base (09-SEGURIDAD.md) — antes de esto no había ninguno:
// sin X-Frame-Options la app podía cargarse dentro de un <iframe> ajeno (clickjacking).
const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
