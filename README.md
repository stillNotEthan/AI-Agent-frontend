# AI Agent Frontend

A premium, high-performance AI agent management platform built with Next.js 16, featuring a stunning dark-themed UI, multi-language support, and real-time data insights.

## ✨ Features

- **Premium UI/UX**: Deep dark mode with glassmorphism, fluid animations (Framer Motion), and interactive particle backgrounds.
- **Multi-language Support**: Full i18n support for English and Chinese (Simplified) using `next-international`.
- **Intelligent Dashboard**: Real-time monitoring and management of AI agents.
- **Data Insight Agent**: Advanced data analysis and visualization interface.
- **Secure Authentication**: Robust login, registration, and password recovery flows with localized feedback.
- **Responsive Design**: Fully optimized for all screen sizes.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Internationalization**: [Next International](https://github.com/QuiiBz/next-international)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-agent/frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## 📁 Project Structure

```text
src/
├── api/                # API client and request handlers
├── app/                # Next.js App Router pages
│   └── [locale]/       # Internationalized routes
│       ├── (auth)/     # Authentication routes (Login, Register, etc.)
│       └── (panel)/    # Main application panel (Dashboard, Chat, Users, Settings)
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── ...             # Feature-specific components
├── lib/                # Utility functions and shared libraries
├── locales/            # Multi-language translation files (en, zh-CN)
├── middlewares/        # Custom Next.js middleware logic
└── store/              # Zustand state management stores
```

## 📄 License

This project is private and for personal use.
