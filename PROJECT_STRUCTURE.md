# Ad Studio Project Structure

## Directory Structure
```
ad-studio/
├── .cursorrules                    # Cursor IDE rules
├── .env.local                      # Environment variables
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── DESIGN_SYSTEM.md               # UI/UX design system
├── PROJECT_STRUCTURE.md           # This file
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
│
├── app/                           # Next.js App Router
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── loading.tsx               # Global loading UI
│   ├── error.tsx                 # Global error UI
│   │
│   ├── auth/                     # Authentication pages
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   │
│   ├── dashboard/                # Main dashboard
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── clients/                  # Client management
│   │   ├── page.tsx             # Clients list
│   │   ├── [id]/                # Individual client
│   │   │   └── page.tsx
│   │   └── new/                 # Add new client
│   │       └── page.tsx
│   │
│   ├── generate/                # Ad generation
│   │   ├── page.tsx             # Generation interface
│   │   └── [type]/              # Google/Facebook specific
│   │       └── page.tsx
│   │
│   └── history/                 # Generation history
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── CharacterCounter.tsx
│   │   └── index.ts            # Barrel exports
│   │
│   ├── forms/                   # Form components
│   │   ├── AuthForm.tsx
│   │   ├── ClientForm.tsx
│   │   └── GenerationForm.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   └── features/               # Feature-specific components
│       ├── auth/
│       ├── clients/
│       ├── generation/
│       └── history/
│
├── contexts/                    # React contexts
│   ├── AuthContext.tsx         # Authentication state
│   ├── ThemeContext.tsx        # Theme management
│   └── ClientContext.tsx       # Client data state
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts             # Authentication hook
│   ├── useClients.ts          # Client management hook
│   ├── useGeneration.ts       # Ad generation hook
│   └── useLocalStorage.ts     # Local storage hook
│
├── lib/                       # External library configurations
│   ├── firebase.ts           # Firebase configuration
│   ├── openai.ts            # OpenAI API configuration
│   └── validations.ts       # Validation schemas
│
├── utils/                     # Utility functions
│   ├── formatters.ts         # Text formatting utilities
│   ├── validators.ts         # Validation functions
│   ├── constants.ts          # App constants
│   └── helpers.ts            # General helper functions
│
├── types/                     # TypeScript type definitions
│   ├── auth.ts              # Authentication types
│   ├── client.ts            # Client data types
│   ├── generation.ts        # Ad generation types
│   └── index.ts             # Barrel exports
│
└── public/                    # Static assets
    ├── favicon.ico
    ├── logo.png
    └── images/
```

## File Naming Conventions

### Components
- **PascalCase**: `Button.tsx`, `ClientForm.tsx`
- **Index files**: Always include for barrel exports
- **Props interface**: `ButtonProps`, `ClientFormProps`

### Pages (App Router)
- **Lowercase**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Dynamic routes**: `[id]/page.tsx`, `[...slug]/page.tsx`

### Hooks
- **camelCase with use prefix**: `useAuth.ts`, `useClients.ts`

### Utilities and Libs
- **camelCase**: `firebase.ts`, `validators.ts`

### Types
- **camelCase files**: `auth.ts`, `client.ts`
- **PascalCase interfaces**: `User`, `Client`, `AdGeneration`

## Import Order (MANDATORY)
```typescript
// 1. React and Next.js
import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

// 2. External libraries
import { collection, query, where } from 'firebase/firestore'

// 3. Internal components (absolute paths)
import { Button, Input, Card } from '@/components/ui'
import { ClientForm } from '@/components/forms'

// 4. Hooks and contexts
import { useAuth } from '@/hooks/useAuth'
import { AuthContext } from '@/contexts/AuthContext'

// 5. Utils and types
import { validateClient } from '@/utils/validators'
import { Client } from '@/types/client'

// 6. Relative imports (if needed)
import './styles.module.css'
```

## Component Structure Template
```typescript
// components/ui/Button.tsx
import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

/**
 * Reusable button component following design system
 * @param variant - Button style variant
 * @param size - Button size
 * @param children - Button content
 * @param onClick - Click handler
 * @param disabled - Disabled state
 * @param loading - Loading state
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false
}) => {
  const baseClasses = 'btn-primary' // From design system
  
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```

## Page Structure Template
```typescript
// app/clients/page.tsx
import React from 'react'
import { Metadata } from 'next'

import { ClientList } from '@/components/features/clients'
import { useAuth } from '@/hooks/useAuth'

export const metadata: Metadata = {
  title: 'Clients - Ad Studio',
  description: 'Manage your clients and their services'
}

export default function ClientsPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="h1">Clients</h1>
        <ClientList />
      </div>
    </div>
  )
}
```

## Environment Variables
```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Development Workflow
1. **Start with types**: Define TypeScript interfaces first
2. **Create components**: Build UI components following design system
3. **Add functionality**: Implement hooks and contexts
4. **Test integration**: Ensure components work together
5. **Add validation**: Implement form validation and error handling

## Code Quality Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Standard configuration
- **Prettier**: Consistent code formatting
- **JSDoc**: All functions documented
- **Error Handling**: Try/catch blocks required
- **Loading States**: Always implement loading UIs
- **Accessibility**: ARIA labels and keyboard navigation

## Firebase Firestore Structure
```
users/
  {userId}/
    email: string
    displayName: string
    createdAt: timestamp
    
clients/
  {clientId}/
    name: string
    description: string
    website: string
    services: Service[]
    userId: string (owner)
    createdAt: timestamp
    
generations/
  {generationId}/
    clientId: string
    serviceId: string
    type: 'google' | 'facebook'
    headlines: string[]
    descriptions: string[]
    sitelinks: Sitelink[]
    userId: string
    createdAt: timestamp
```

## Testing Strategy
- **Unit Tests**: Components and utilities
- **Integration Tests**: Page functionality
- **E2E Tests**: Critical user flows
- **Accessibility Tests**: Screen reader compatibility 