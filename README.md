# Ad Studio by Cloud 9 Digital

Internal tool for generating Google and Facebook ad copy with AI-powered content generation and strict compliance checking.

## 🚀 Features

- **Multi-User Authentication**: Secure user management with isolated data
- **Client Management**: Store business context, services, and URLs
- **Google Ads Compliance**: Automatic validation of character limits and policies
- **AI-Powered Generation**: Intelligent ad copy creation using OpenAI
- **Real-time Validation**: Live character counting and compliance checking
- **Generation History**: Track and reuse previous ad campaigns
- **Modern UI**: Black theme with AI-style glow effects

## 📋 Google Ads Compliance

- **Headlines**: Maximum 15, each ≤30 characters (no exclamation marks)
- **Descriptions**: Maximum 4, each ≤90 characters
- **Sitelinks**: 4 extensions with linked URLs
- **Real-time Validation**: Instant feedback on character limits

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Firebase (Auth, Firestore, Cloud Functions)
- **AI**: OpenAI API for content generation
- **TypeScript**: Full type safety
- **Font**: Plus Jakarta Sans (mandatory)

## 🎨 Design System

The project follows a comprehensive design system with:
- CSS custom properties for consistent theming
- AI-style glow effects on interactive elements
- Black background with white text
- Standardized component library

See `DESIGN_SYSTEM.md` for complete guidelines.

## 📁 Project Structure

```
ad-studio/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # External library configs
├── utils/              # Utility functions
├── types/              # TypeScript definitions
└── public/             # Static assets
```

See `PROJECT_STRUCTURE.md` for detailed organization.

## 🚦 Development Rules

This project follows strict development guidelines in `.cursorrules`:
- Never remove existing functionality
- Always use design system components
- Include error handling and loading states
- Follow Google Ads compliance rules
- Use TypeScript for all new code

## 🔧 Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and configure:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   OPENAI_API_KEY=your_key
   ```

3. **Firebase Setup**
   - Create Firebase project
   - Enable Authentication and Firestore
   - Configure security rules

4. **Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Authentication

- Multi-user support with user isolation
- Each user manages their own clients and generation history
- Secure session management with Firebase Auth

## 📊 Data Structure

### Clients
- Business information and context
- Multiple services per client
- URLs for ad extensions

### Generations
- Google/Facebook ad copy
- Associated with specific client and service
- Compliance validation results
- Generation history and timestamps

## 🎯 Key Features in Detail

### Client Management
- Add/edit client business information
- Define multiple services per client
- Store URLs for sitelink extensions
- Organize by user ownership

### Ad Generation
- Select client and specific service
- AI-powered content generation
- Real-time compliance checking
- Multiple generation attempts
- Export-ready formats

### Compliance Checking
- Character limit validation
- Google Ads policy enforcement
- Real-time feedback
- Visual indicators for compliance status

## 🔄 Development Workflow

1. Follow 15-step development process
2. Test each feature incrementally
3. Maintain backward compatibility
4. Document all changes
5. Validate compliance at each step

## 📈 Future Enhancements

- WhatsApp Business API integration
- Advanced AI prompt engineering
- Bulk generation capabilities
- Analytics and performance tracking
- Template management system

## 🐛 Debugging

- Check `.cursorrules` for coding standards
- Reference `DESIGN_SYSTEM.md` for UI issues
- Validate Firebase configuration
- Review Google Ads compliance rules

## 📞 Support

Internal tool for Cloud 9 Digital team. For issues:
1. Check documentation files
2. Review cursor rules
3. Validate against design system
4. Test Firebase connection

## 📄 License

Internal use only - Cloud 9 Digital proprietary software.

---

**Important**: Always reference the design system and cursor rules before making changes to maintain consistency across the project. 