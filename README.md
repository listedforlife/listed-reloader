# Listed Productions - Next.js Site

## Overview
Modern website for Listed Productions built with Next.js 15, TypeScript, and React.

## Features
- Server-side rendering with Next.js App Router
- Responsive design matching original Gatsby site styling
- Strapi CMS integration ready (with fallback to sample data)
- Image optimization with Next.js Image component
- Dynamic artist pages
- News/blog system
- Event listings

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file (optional - app works without it):
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

### Method 1: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

### Method 2: Via CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Environment Variables for Production
Add these in Vercel dashboard under Settings > Environment Variables:
- `NEXT_PUBLIC_STRAPI_API_URL` - Your production Strapi URL (optional)

### Build Settings (Auto-detected)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` or `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Project Structure
```
nextjs-site/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   ├── globals.css     # Global styles
│   ├── artists/        # Artists pages
│   ├── news/           # News pages
│   ├── events/         # Events pages
│   ├── contact/        # Contact page
│   └── productions/    # Productions page
├── components/         # React components
│   ├── Header.tsx     # Navigation header
│   └── Footer.tsx     # Site footer
├── lib/               # Utility functions
│   └── strapi.ts      # Strapi API client
├── public/            # Static assets
│   ├── images/        # Image files
│   └── fonts/         # Custom fonts
└── next.config.ts     # Next.js configuration
```

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf .next node_modules && npm install`
- Check Node version: Should be 18+

### Images Not Loading
- Check `next.config.ts` for proper image domains
- Ensure images are in `/public/images/` folder

### Fonts Not Loading
- Custom fonts should be in `/public/fonts/`
- Check `globals.css` for correct font paths

## CMS Integration
The site is pre-configured for Strapi integration but works with sample data if no CMS is connected. To connect Strapi:

1. Set up a Strapi instance
2. Create content types: Artists, Posts, Events
3. Update `.env.local` with your Strapi URL
4. Deploy and add the same env var in Vercel

## Support
For issues or questions, contact: info@listedproductions.com
