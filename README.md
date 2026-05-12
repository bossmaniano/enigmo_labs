# ENIGMO LABS - Professional Agency Landing Page

A high-performance, interactive landing page for Enigmo Labs built with React, TypeScript, Vite, and Tailwind CSS. Features a lead capture system with automated email notifications.

## 🚀 Features

- **Interactive Navigation**: Glassmorphism navbar with active section highlighting
- **Light Mode Design**: Clean white backgrounds with high-contrast text
- **4-Column Pricing Grid**: Foundations, Intelligence, Enigma, and Bespoke packages
- **Testimonials Marquee**: 20 unique testimonials with hover controls
- **Contact Terminal**: Functional lead capture form with validation
- **Automated Email System**: Netlify Forms + EmailJS integration
- **Mobile Responsive**: Optimized for all device sizes
- **Framer Motion Animations**: Smooth transitions throughout

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4.2.4, Framer Motion
- **Icons**: Lucide React
- **Email**: Netlify Forms + EmailJS
- **Deployment**: Netlify/Vercel ready

## 📧 Email System Setup

### Netlify Forms (Admin Notifications)
The contact form automatically sends lead data to your email via Netlify Forms:

1. **Deploy to Netlify**
2. **Enable Form Detection** in Netlify dashboard
3. **Configure Notifications**:
   - Go to Site Settings → Forms
   - Add notification email: `enigmolabs@gmail.com`
   - Set subject: `NEW LEAD: {{name}} - {{protocol}}`

### EmailJS (Client Confirmations)
For sending automated confirmation emails to clients:

1. **Create EmailJS Account**: https://www.emailjs.com/
2. **Create Email Service**: Connect Gmail/Outlook
3. **Create Email Template**:
   ```
   Subject: [ENIGMO LABS] Protocol Initialized: {{protocol_type}}

   Hello {{to_name}},

   This is an automated confirmation from the Enigmo Labs Engineering Terminal.

   We have received your brief regarding the {{protocol_type}}. Our lead architect, Ian Assah, is currently reviewing your requirements.

   What happens next:
   - We will analyze the technical feasibility of your project.
   - An engineer will reach out via {{phone_number}} or this email address within 12 business hours.
   - We will schedule a 15-minute briefing to finalize the architecture.

   Thank you for choosing Enigmo Labs for your digital evolution.

   The Future is Engineered.
   — Enigmo Labs | Nairobi, Kenya
   ```
4. **Get API Keys** and update environment variables:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bossmaniano/enigmo_labs.git
   cd enigmo-labs-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:5174

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 📱 Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Component-specific styles
├── index.css            # Global styles & Tailwind imports
├── main.tsx             # Application entry point
└── assets/              # Static assets
```

## 🎨 Customization

### Colors
- **Primary**: Egyptian Blue (#1034A6)
- **Background**: Midnight Black (#05070a) / White (light mode)
- **Text**: High contrast white/black

### Pricing
Update pricing in `src/App.tsx` within the `ProtocolPricing` component:

```tsx
const protocols = [
  {
    title: "Foundations",
    price: "KSh 35,000", // Update here
    // ... other properties
  }
]
```

### Email Templates
Modify email templates in the `sendConfirmationEmail` function in `src/App.tsx`.

## 🌐 Deployment

### Netlify (Recommended)
1. Connect GitHub repository
2. Deploy automatically
3. Configure form notifications
4. Add environment variables for EmailJS

### Vercel
1. Import from GitHub
2. Deploy automatically
3. Configure environment variables

### Manual Build
```bash
npm run build
# Deploy dist/ folder to any static hosting
```

## 📄 License

This project is private and proprietary to Enigmo Labs.

## 🤝 Contact

- **Email**: enigmolabs@gmail.com
- **Website**: [Deployed Site URL]
- **Location**: Nairobi, Kenya

---

**Built with ❤️ by Enigmo Labs**
