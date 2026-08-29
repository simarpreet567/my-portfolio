# my-portfolio

A modern portfolio website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### Contact Form (EmailJS)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Add an email service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{to_name}}`
4. Copy your Service ID, Template ID, and Public Key
5. Update `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📦 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → Import your repository
4. Vercel auto-detects Next.js — just click **Deploy**
5. Done! Your site is live at `https://your-project.vercel.app`

### Environment Variables on Vercel

After deploying, add your environment variables in the Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable from `.env.local`

## 🎨 Customization

- **Name & Bio**: Edit `src/components/Hero.tsx` and `src/components/About.tsx`
- **Projects**: Edit the `projects` array in `src/components/Projects.tsx`
- **Skills**: Edit the `skillCategories` array in `src/components/Skills.tsx`
- **Social Links**: Update URLs in `Hero.tsx` and `Contact.tsx`
- **Colors**: Edit `tailwind.config.ts`
