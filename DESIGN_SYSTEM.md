# Ad Studio Design System v2 - Refined

## Brand Identity
- **Product**: Ad Studio by Cloud 9 Digital
- **Purpose**: Internal tool for generating Google and Facebook ad copy
- **Aesthetic**: Sophisticated, AI-powered, modern with subtle animations
- **Font**: Plus Jakarta Sans (MANDATORY - never deviate)

## Color System

### CSS Custom Properties (ALWAYS USE THESE)
```css
:root {
  /* Sophisticated Dark Theme */
  --color-bg-primary: #0a0a0f;      /* Deep sophisticated dark */
  --color-bg-secondary: #111118;     /* Secondary background */
  --color-bg-tertiary: #1a1a24;     /* Card backgrounds */
  --color-bg-hover: #2a2a34;        /* Hover states */
  
  /* Text Colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #cccccc;
  --color-text-muted: #888888;
  --color-text-disabled: #666666;
  
  /* Border Colors */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-hover: rgba(255, 255, 255, 0.2);
  
  /* Accent Colors */
  --color-accent-primary: #667eea;   /* Primary gradient start */
  --color-accent-secondary: #764ba2;  /* Secondary gradient */
  --color-accent-tertiary: #f093fb;  /* Tertiary gradient */
  --color-accent-quaternary: #8b5cf6; /* Final gradient color */
  
  /* Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  /* Gradient System */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-ai: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
  /* Animated Brand Gradient (5-color refined) */
  --gradient-brand-animated: linear-gradient(
    -45deg,
    #667eea,
    #764ba2,
    #f093fb,
    #8b5cf6,
    #667eea
  );
  
  /* Subtle Glow Effects */
  --glow-subtle: 0 0 15px rgba(102, 126, 234, 0.15);
  --glow-primary: 0 0 20px rgba(102, 126, 234, 0.3);
  --glow-hover: 0 0 25px rgba(102, 126, 234, 0.4);
}
```

### Usage Rules
- NEVER hardcode colors like `bg-black` or `text-white`
- ALWAYS use `bg-[var(--color-bg-primary)]`
- Colors automatically adapt to theme changes
- Use CSS custom properties for all colors

## Typography

### Font Family
- **Primary**: Plus Jakarta Sans (MANDATORY - never change)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Import**: Must be loaded in layout/globals

### Hierarchy
```css
/* Headings */
.h1 { @apply text-5xl md:text-6xl font-bold; }
.h2 { @apply text-3xl md:text-4xl font-bold; }
.h3 { @apply text-xl font-semibold; }
.h4 { @apply text-lg font-semibold; }

/* Body Text */
.body-large { @apply text-lg; }
.body-base { @apply text-base; }
.body-small { @apply text-sm text-gray-400; }
.body-xs { @apply text-xs text-gray-500; }

/* Animated Brand Text */
.text-gradient-animated {
  background: var(--gradient-brand-animated);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  animation: gradient-shift 8s ease-in-out infinite;
  position: relative;
}
```

## Animation System

### Gradient Animation
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Subtle Glow Behind Animated Text */
.text-gradient-animated::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--gradient-brand-animated);
  background-size: 300% 300%;
  border-radius: 8px;
  filter: blur(15px);
  animation: gradient-shift 8s ease-in-out infinite;
  z-index: -1;
  opacity: 0.4;
}
```

## Component System

### Buttons
```css
.btn-primary {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
         transition-all duration-200 hover:bg-blue-700 hover:scale-105
         whitespace-nowrap;
}

.btn-outline {
  @apply px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold 
         rounded-lg transition-all duration-200 hover:bg-blue-600 
         hover:text-white whitespace-nowrap;
}

.btn-secondary {
  @apply px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg 
         transition-all duration-200 hover:bg-gray-700 whitespace-nowrap;
}
```

### Cards
```css
.card {
  @apply rounded-2xl bg-gray-900 border border-gray-800 p-6 
         transition-all duration-200;
}

.card-hover {
  @apply card hover:bg-gray-800 hover:border-gray-700 hover:scale-105;
}

.card-glass {
  @apply rounded-2xl overflow-hidden relative backdrop-blur-sm
         bg-gray-900/80 border border-gray-800;
}

.card-gradient {
  @apply rounded-2xl overflow-hidden relative bg-gray-900 
         border border-gray-800 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Subtle Top Border Gradient */
.card-gradient::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
}
```

### Form Elements
```css
.input-field {
  @apply w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 
         rounded-lg focus:outline-none focus:border-blue-500 
         focus:ring-1 focus:ring-blue-500 transition-all duration-200;
}

.textarea-field {
  @apply input-field resize-none min-h-[120px];
}

.select-field {
  @apply input-field appearance-none;
}
```

## Platform Integration

### Real Platform Logos (SVG)
```jsx
// Google Ads Logo
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
</svg>

// Facebook Logo (#1877F2)
// Instagram Logo (gradient: purple-pink-orange)  
// LinkedIn Logo (#0077B5)
```

### Platform Colors
- **Google Ads**: `#4285F4`
- **Facebook**: `#1877F2` 
- **Instagram**: `bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600`
- **LinkedIn**: `#0077B5`

## Interactive Patterns

### Copy Functionality
```jsx
// Copy Button Pattern
<button
  onClick={() => copyToClipboard(text, index)}
  className="p-1 rounded-md hover:bg-gray-600 transition-colors 
             opacity-0 group-hover:opacity-100"
  title="Copy to clipboard"
>
  {copiedIndex === index ? (
    <CheckCheck className="w-4 h-4 text-green-400" />
  ) : (
    <Copy className="w-4 h-4 text-gray-400" />
  )}
</button>
```

### Hover States
```css
.hover-reveal {
  @apply opacity-0 group-hover:opacity-100 transition-all duration-200;
}

.hover-lift {
  @apply transition-all duration-200 hover:scale-105;
}

.hover-glow {
  @apply transition-all duration-200 hover:shadow-[var(--glow-hover)];
}
```

## Character Counting & Compliance

### Google Ads Requirements
- **Headlines**: Max 15, each ≤30 characters (including spaces)
- **Descriptions**: Max 4, each ≤90 characters (including spaces)
- **NO exclamation marks** in any ad copy
- **Real-time validation** required

### Character Counter Component
```css
.char-counter-ok { @apply text-green-400; }
.char-counter-warning { @apply text-yellow-400; }
.char-counter-danger { @apply text-red-400; }
```

## Responsive Design

### Breakpoints
- **Mobile**: `<640px`
- **Tablet**: `640px - 768px` 
- **Desktop**: `>768px`
- **Large**: `>1024px`

### Mobile-First Patterns
```css
/* Base (Mobile) */
.responsive-text { @apply text-2xl; }
/* Tablet */
@screen sm { .responsive-text { @apply text-3xl; } }
/* Desktop */
@screen md { .responsive-text { @apply text-4xl; } }
/* Large */
@screen lg { .responsive-text { @apply text-5xl; } }
```

## Layout System

### Page Structure
```jsx
<div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Content */}
  </main>
</div>
```

### Grid Patterns
```css
/* Feature Grid */
.feature-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Platform Grid */
.platform-grid {
  @apply grid grid-cols-2 gap-4;
}
```

## Accessibility Requirements

### Standards
- **Contrast**: 4.5:1 minimum ratio
- **Focus**: Visible indicators on all interactive elements
- **ARIA**: Labels for screen readers
- **Keyboard**: Full navigation support

### Implementation
```jsx
// Example accessible button
<button
  className="btn-primary"
  aria-label="Copy headline to clipboard"
  title="Copy to clipboard"
>
  <Copy className="w-4 h-4" />
</button>
```

## Implementation Rules

### Do's
✅ Use Plus Jakarta Sans font exclusively
✅ Use CSS custom properties for all colors
✅ Include hover states and transitions
✅ Add copy functionality to generated content
✅ Include real platform logos
✅ Use mobile-first responsive design
✅ Include character counting with spaces
✅ Add subtle animations and glow effects

### Don'ts
❌ Never hardcode colors
❌ Never create custom CSS files
❌ Never remove Google Ads compliance checking
❌ Never use different fonts
❌ Never skip accessibility features
❌ Never remove loading states or error handling

## Design Tokens Summary
- **Primary Font**: Plus Jakarta Sans
- **Theme**: Sophisticated dark (#0a0a0f, #111118, #1a1a24)
- **Animations**: 8-second gradient cycles
- **Glow**: Subtle (opacity 0.4, blur 15px)
- **Borders**: 1px subtle gradients
- **Icons**: Real platform SVGs
- **Interactions**: Copy with visual confirmation
- **Responsive**: Mobile-first breakpoints 