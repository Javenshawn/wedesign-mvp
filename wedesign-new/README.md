# Wedesign MVP

Professional design services platform with Stripe integration.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Supabase
- **Database**: Supabase PostgreSQL
- **Payment**: Stripe Checkout
- **Deployment**: Vercel
- **Email**: Resend
- **Monitoring**: Sentry

## Setup Instructions

### 1. Environment Variables

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_STANDARD_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=https://wedesign.design
```

### 2. Database Setup

Run the following SQL in Supabase SQL Editor:

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### 4. Deployment

Connect to Vercel and deploy automatically.

## Features

- [x] Three pricing packages (Basic, Standard, Premium)
- [x] Stripe Checkout integration
- [x] Order management
- [x] Webhook handling
- [x] Responsive design

## License

MIT