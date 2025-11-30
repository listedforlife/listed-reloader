# Contentful Setup Guide

## ✅ Contentful Integration Complete!

Your site is now set up to work with Contentful CMS. It will use sample data until you configure your Contentful credentials.

## 🚀 Quick Setup

### 1. Get Your Contentful Credentials

1. Log in to [Contentful](https://app.contentful.com)
2. Go to your Space → **Settings** → **API Keys**
3. Create or select a **Content Delivery API** key
4. Copy:
   - **Space ID**
   - **Content Delivery API - access token**

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

### 3. Content Models in Contentful

Create these content types in your Contentful space:

#### Artist Content Type
- **name** (Short text, required)
- **slug** (Short text, required, unique)
- **bio** (Long text)
- **image** (Media/Asset)
- **soundcloud** (Short text - SoundCloud embed URL)
- **video** (Short text - YouTube embed URL)
- **socialLinks** (JSON object)

#### Post Content Type
- **title** (Short text, required)
- **slug** (Short text, required, unique)
- **excerpt** (Long text)
- **content** (Rich text)
- **featuredImage** (Media/Asset)
- **category** (Reference to Category)

#### Event Content Type (Optional)
- **title** (Short text, required)
- **slug** (Short text, required, unique)
- **description** (Long text)
- **date** (Date & time)
- **venue** (Short text)
- **image** (Media/Asset)

#### Category Content Type
- **name** (Short text)
- **slug** (Short text)

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Your site will now fetch content from Contentful!

## 📝 Features

- **Automatic Fallback**: Uses sample data when Contentful is not configured
- **Type-Safe**: Full TypeScript support
- **Rich Text Support**: Render Contentful rich text content
- **Image Optimization**: Automatic image optimization with Next.js Image
- **Error Handling**: Graceful fallback on API errors

## 🚢 Deployment

### For Vercel:
Add these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
- `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- `NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT`

### For Other Platforms:
Set the same environment variables in your deployment platform.

## 🧪 Testing Without Contentful

The site works perfectly without Contentful configuration - it will use the built-in sample data. This is useful for:
- Local development
- Testing
- Demo purposes

## 📚 Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Contentful JavaScript SDK](https://github.com/contentful/contentful.js)
- [Rich Text Renderer](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer)
