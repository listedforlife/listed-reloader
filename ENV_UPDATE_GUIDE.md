# Environment Variables Update Guide

## Security Fix: Moving Contentful Credentials to Server-Side

Your Contentful credentials have been moved to secure server-side API routes to prevent exposure in the client-side bundle.

## Required Environment Variable Changes

Update your `.env.local` (or production environment) to change these variable names:

### Before (INSECURE - exposed to client):

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

### After (SECURE - server-side only):

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

## What Changed

1. **Created API Routes** - All Contentful data fetching now happens through secure API routes:

   - `/api/artists` - Get all artists
   - `/api/artists/[slug]` - Get single artist
   - `/api/posts` - Get all posts
   - `/api/events` - Get all events

2. **Updated Client Components** - All pages now fetch from API routes instead of directly calling Contentful

3. **Removed NEXT*PUBLIC* Prefix** - Environment variables are no longer exposed to the client bundle

## Deployment Instructions

### Vercel:

1. Go to your project settings
2. Navigate to Environment Variables
3. Remove the old `NEXT_PUBLIC_*` variables
4. Add the new variables without the `NEXT_PUBLIC_` prefix

### Other Platforms:

Update your environment variables according to your platform's documentation.

## Testing Locally

1. Update your `.env.local` file with the new variable names
2. Restart your development server
3. The app should work exactly as before, but now securely!

## Benefits

✅ Contentful credentials are no longer exposed in client-side JavaScript  
✅ Better security for your API keys  
✅ Standard Next.js API route architecture  
✅ No change to user experience
