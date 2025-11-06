# Lean Stream Canvas

A modern, interactive **Value Stream Mapping** application designed for lean process management and optimization. Built with React, TypeScript, and shadcn/ui.

## 📊 Overview

**Lean Stream Canvas** is a comprehensive web application for visualizing, analyzing, and optimizing value streams in lean manufacturing and software development processes. It provides real-time metrics tracking, bottleneck identification, and process optimization recommendations.

### Functional Category

**Business Process Management (BPM) / Lean Management**

- 📊 Value Stream Mapping
- 📈 Performance Analytics & KPI Tracking
- 🎯 Process Optimization
- 📉 Bottleneck Analysis
- 🔄 Continuous Improvement (Kaizen)

### UI/Design Style

**Modern Minimal Dashboard**

- Clean & Professional interface
- Data-Driven visualization approach
- Process-Oriented timeline and flow charts
- Fully Responsive & Accessible (WCAG 2.1 AA)
- Dark Mode Support with smooth transitions
- Multilingual interface (English, Arabic, French)
- Subtle animations and micro-interactions

## ✨ Features

### Core Functionality

- ✅ **Interactive Value Stream Timeline** - Visual representation of 6 process stages with real-time metrics
- ✅ **Comprehensive Metrics Dashboard** - Track Lead Time, WIP Count, Cycle Time, and Process Efficiency
- ✅ **Detailed Analytics** - In-depth charts and trend analysis using Recharts
- ✅ **Bottleneck Identification** - Automatic detection and analysis of process constraints
- ✅ **Optimization Simulator** - Interactive tool to simulate process improvements
- ✅ **Process Editor** - Add, edit, and remove process stages dynamically
- ✅ **Multi-Format Export** - Export data as PDF, CSV, or JSON
- ✅ **Customizable Settings** - Configure targets, thresholds, and notifications

### User Experience

- ✅ **Multilingual Support** - Full internationalization (i18n) with English, Arabic, and French
- ✅ **RTL Support** - Right-to-left layout for Arabic language
- ✅ **Theme Switching** - Light and Dark modes with persistent preferences
- ✅ **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ✅ **Accessibility** - ARIA labels, keyboard navigation, screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd lean-stream-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite 5.4** - Fast build tool and dev server
- **React Router v6** - Client-side routing

### UI & Styling
- **shadcn/ui** - Accessible component library built on Radix UI
- **Tailwind CSS v3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management with system preference detection

### State Management & Data
- **React Context API** - Global state for theme and language
- **TanStack React Query v5** - Server state management and caching
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Data Visualization
- **Recharts** - Composable charting library for React

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite** - Fast Hot Module Replacement (HMR)

## 📁 Project Structure

```
lean-stream-canvas/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn-ui base components (50+)
│   │   ├── Header.tsx
│   │   ├── MetricCard.tsx
│   │   ├── ProcessStage.tsx
│   │   ├── ValueStreamTimeline.tsx
│   │   ├── ActionPanel.tsx
│   │   ├── MetricsChart.tsx
│   │   ├── ProcessEditor.tsx
│   │   └── ExportDialog.tsx
│   ├── pages/              # Application pages
│   │   ├── Index.tsx       # Main dashboard
│   │   ├── Details.tsx     # Detailed metrics view
│   │   ├── Bottlenecks.tsx # Bottleneck analysis
│   │   ├── Optimize.tsx    # Process optimization
│   │   ├── Settings.tsx    # User settings
│   │   └── NotFound.tsx    # 404 page
│   ├── contexts/           # React contexts
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── FEATURES.md            # Detailed feature documentation
├── README.md              # This file
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 📖 Documentation

For a complete list of features, implementation status, and development roadmap, see [FEATURES.md](./FEATURES.md).

## 🎨 Design System

### Color Palette

**Light Mode:**
- Primary: Forest Green (#22c55e)
- Secondary: Sand (#f5f5f4)
- Accent: Cream (#fef3c7)

**Dark Mode:**
- Primary: Deep Forest (#166534)
- Secondary: Dark Slate (#1e293b)
- Accent: Dark Green (#14532d)

### Typography

- Font Family: System font stack for optimal performance
- Headings: Bold, clear hierarchy
- Body: Readable, optimized line height

## 🔧 Configuration

### Environment Variables

Currently, the application runs entirely on the frontend with mock data. For production deployment with a backend, configure:

```env
VITE_API_URL=your_api_endpoint
VITE_AUTH_ENABLED=true
```

### Customization

#### Modify Process Stages

Use the Process Editor in the UI, or edit the initial stages in `src/pages/Index.tsx`.

#### Add New Metrics

1. Define new metrics in `src/types/index.ts`
2. Add metric cards in `src/pages/Index.tsx`
3. Update charts in detail pages as needed

#### Customize Themes

Edit `tailwind.config.ts` and `src/index.css` to modify color schemes and design tokens.

## 🌐 Internationalization

The app supports three languages out of the box:

- **English (en)** - Complete
- **Arabic (ar)** - Core translations (needs expansion)
- **French (fr)** - Core translations (needs expansion)

To add more translations, edit `src/contexts/LanguageContext.tsx`.

## 📊 Future Enhancements

### Planned Features (Require Backend/Database)

- 🔐 User authentication and authorization
- 💾 Persistent data storage
- 📈 Historical data tracking and versioning
- 🔔 Real-time notifications and alerts
- 👥 Multi-user collaboration
- 🤖 AI-powered optimization suggestions
- 🔗 Third-party integrations (Jira, GitHub, Slack)
- 📧 Automated reporting via email

See [FEATURES.md](./FEATURES.md) for the complete roadmap.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add TypeScript types for all new code
- Test responsiveness on multiple devices
- Ensure accessibility standards are met

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for beautiful, responsive charts
- **Lucide** for the icon set

## 📞 Support

For questions, issues, or suggestions:

- Open an issue on GitHub
- Reach out via the project repository

---

**Built with ❤️ for lean manufacturing and process optimization professionals**
