import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// src/i18n/request.ts 를 자동 인식 (src 디렉터리 존재 시).
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
