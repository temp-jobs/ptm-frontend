# PartTimeMatch - Employer Dashboard

A full-featured, interactive employer experience for managing part-time job postings and applicants.

## Features

### 1. Session & Route Management (Frontend-Only)
- User info persisted in localStorage to simulate session
- Protected dashboard pages with automatic redirect to login
- Logout functionality clears session
- Placeholder MFA flow (frontend-only, no real OTP)

### 2. Enhanced Employer Dashboard
- **Analytics Cards**: Active jobs, total applicants, total views, jobs filled
- **Posted Jobs Section**: Grid/list view with status badges (Active, Closed)
- **View Applicants**: Modal displaying applicant details with status badges
- **Quick Actions**: Approve/Reject applicants (frontend-only mock)
- **Post New Job**: Comprehensive modal with form validation
- **Edit/Delete Jobs**: Full CRUD operations (state-only)
- **Notifications Panel**: Slide-out panel for new applications and updates
- **Mock Analytics**: Real-time statistics and metrics

### 3. Job Postings & Listings
- **Interactive Job Cards**: Hover effects, shadows, scale animations
- **Sorting & Filtering**: By date, applicants count, views, status
- **Search Functionality**: Search by title, category, location
- **Responsive Design**: Mobile, tablet, and desktop layouts

### 4. Job Details & Applicant Management
- **Full Job Information**: Title, category, location, pay, hours, skills
- **Applicants Modal**: List applicants with detailed profiles
- **Status Management**: Applied, Accepted, Rejected badges
- **Form Validation**: Required fields, character limits, email validation
- **Success/Error Toasts**: User feedback for all actions

### 5. UI/UX Enhancements
- **Color Palette**: Professional teal primary, warm orange accent
- **Light/Dark Mode**: Smooth theme transitions
- **Animations**: Hover effects, scale transforms, fade transitions
- **Skeleton Loaders**: Loading states for job cards and lists
- **Interactive Badges**: Status indicators with color coding
- **Responsive Design**: Fully responsive across all devices
- **Accessibility**: ARIA labels, keyboard navigation, focus states

### 6. Multilingual Support (Frontend-Only)
- **Languages**: English + Hindi
- **Language Selector**: Toggle/dropdown in navigation
- **Dynamic Updates**: All UI text updates on language change
- **LocalStorage**: Language preference persistence
- **Comprehensive Translations**: All employer dashboard features

### 7. Component Reusability
- Modular components: JobCard, ApplicantCard, Modals, Notifications
- Consistent Tailwind styling
- Clean folder structure
- Well-commented code

### 8. Offline / Mock Data
- Mock JSON data for jobs, applicants, notifications
- LocalStorage for state persistence
- Simulated API calls with delays
- Dynamic behaviors: posting, editing, deleting, filtering

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + LocalStorage
- **Animations**: CSS transitions + Tailwind

## Getting Started

1. **Install Dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Run Development Server**
\`\`\`bash
npm run dev
\`\`\`

3. **Open Browser**
Navigate to `http://localhost:3000`

4. **Login as Employer**
- Go to `/login`
- Select "Employer" role
- Use any email/password (mock authentication)

## Project Structure

\`\`\`
app/
├── employer/
│   └── dashboard/
│       └── page.tsx          # Main employer dashboard
├── layout.tsx                # Root layout with providers
└── globals.css               # Global styles and theme

components/
├── applicants-modal.tsx      # Applicant management modal
├── delete-job-dialog.tsx     # Job deletion confirmation
├── edit-job-dialog.tsx       # Job editing wrapper
├── notifications-panel.tsx   # Notifications slide-out
├── post-job-dialog.tsx       # Job posting/editing form
├── protected-route.tsx       # Route protection
└── ui/                       # shadcn/ui components

lib/
├── auth-context.tsx          # Authentication state
├── language-context.tsx      # Multilingual support
├── theme-context.tsx         # Light/dark mode
└── mock-data.ts              # Mock data for jobs/applicants
\`\`\`

## Key Features Explained

### Session Management
- User data stored in `localStorage` under `parttimematch_user`
- Protected routes check for user existence and role
- Automatic redirect to login if not authenticated

### Job Management
- **Create**: PostJobDialog with comprehensive form validation
- **Read**: Dashboard displays all jobs with filtering/sorting
- **Update**: EditJobDialog reuses PostJobDialog component
- **Delete**: DeleteJobDialog with confirmation prompt

### Applicant Management
- View all applicants for a specific job
- Filter by status (Applied, Accepted, Rejected)
- Search by name, email, or skills
- Approve/Reject actions with toast notifications

### Notifications
- Real-time notification panel
- Unread count badge with pulse animation
- Mark as read/Mark all as read functionality
- Delete individual notifications
- Time ago formatting

### Multilingual Support
- Language context with English and Hindi translations
- Language selector in navigation
- All text dynamically updates on language change
- Preference saved to localStorage

## Future Backend Integration

The frontend is designed to easily integrate with a backend API:

1. Replace `localStorage` with API calls
2. Update mock data imports with API endpoints
3. Add proper authentication with JWT tokens
4. Implement real-time notifications with WebSockets
5. Add file upload for resumes and documents

## Notes

- All data is mock and stored in frontend state
- No actual backend or database required
- Session simulation using localStorage
- MFA flow is placeholder (accepts any 6-digit code)
- Ready for production backend integration

## License

MIT
