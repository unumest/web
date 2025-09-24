import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',          // 정적 산출(out/)
  images: { unoptimized: true }
  // 커스텀 도메인 사용 시 basePath/assetPrefix 설정 금지
};

export default nextConfig;
