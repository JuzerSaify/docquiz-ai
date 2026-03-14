# DocQuiz AI

Turn any PDF into interactive quizzes, flashcards, and study guides powered by Claude AI.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database + Auth + Storage**: Supabase
- **Payments**: Stripe
- **AI**: Anthropic Claude API (claude-opus-4-6)
- **Styling**: Tailwind CSS
- **PDF Parsing**: pdf-parse

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd docquiz-ai
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Settings → API** and copy your keys
3. Run the SQL migrations in **SQL Editor**:
   - Open `supabase/migrations/001_initial.sql` and run it
   - Open `supabase/migrations/002_storage.sql` and run it
4. In **Authentication → URL Configuration**, add `http://localhost:3000/auth/callback` as a redirect URL

### 3. Set Up Stripe

1. Create an account at [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Developers → API keys** and copy your keys
3. Create a product called "DocQuiz Pro" with a monthly price of $9
4. Copy the Price ID (starts with `price_`)

### 4. Set Up Anthropic

1. Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 5. Configure Environment Variables

Fill in `.env.local` with your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Set Up Stripe Webhooks (Local Development)

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret from the CLI output to `STRIPE_WEBHOOK_SECRET`.

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Add all environment variables from `.env.local` to Vercel project settings
4. Update `NEXT_PUBLIC_APP_URL` to your Vercel domain (e.g., `https://docquiz-ai.vercel.app`)
5. Deploy
6. After deployment:
   - Go to Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://your-domain.vercel.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the new webhook signing secret to Vercel environment variables
   - Redeploy

## Features

- **PDF Upload**: Upload PDF documents up to 10MB
- **Text Extraction**: Automatic text extraction from PDFs
- **AI Quiz Generation**: Generate multiple-choice quizzes with 10 questions
- **Flashcards**: Generate 15 flashcards with front/back/hint
- **Study Guides**: Generate comprehensive study guides with summaries, key concepts, and review questions
- **Score Tracking**: Track quiz attempts and best scores
- **Subscription Billing**: Free tier (3 quizzes) and Pro tier ($9/month, 100/month)
- **Stripe Integration**: Checkout, billing portal, and webhook handling

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, check-email pages
│   ├── api/             # API routes (extract-text, generate-quiz, stripe)
│   ├── auth/callback/   # Supabase auth callback
│   ├── dashboard/       # Protected dashboard pages
│   ├── pricing/         # Pricing page
│   └── page.tsx         # Landing page
├── components/          # Reusable components (Navbar, UploadDocument)
└── lib/
    ├── stripe.ts        # Stripe client
    └── supabase/        # Supabase clients (browser, server, service, middleware)
```
