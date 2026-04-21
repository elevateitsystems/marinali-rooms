import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/'],
};

export function middleware(request: NextRequest) {
  // Extract country from Vercel's Edge network headers. 
  // For local development it might be null, so we use a fallback.
  const country = request.headers.get('x-vercel-ip-country') || '';

  let targetLang = 'en'; // Defaults to English for "Others"

  if (country === 'IT') {
    targetLang = 'it';
  } else if (country === 'DE' || country === 'AT') {
    targetLang = 'de';
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}`;

  return NextResponse.redirect(url);
}
