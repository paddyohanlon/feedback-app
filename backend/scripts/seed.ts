// src/scripts/seed.ts
import db from '../db'
import { FeedbackModel } from '../models/feedback'
import { FeedbackType, type UnsavedFeedback } from '../types/common'
import mongoose from 'mongoose'

const sampleFeedback: UnsavedFeedback[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    type: FeedbackType.BUG,
    title: 'Mobile Search Filter Issue',
    message: 'The search filter is not working on mobile devices'
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Dark Mode Request',
    message: 'Would be great to have a dark mode option'
  },
  {
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    type: FeedbackType.BUG,
    title: 'Profile Page 404 Error',
    message: 'Getting 404 errors when accessing my profile page'
  },
  {
    name: 'Diana Wilson',
    email: 'diana@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Keyboard Shortcuts Feature',
    message: 'Please add keyboard shortcuts for common actions'
  },
  {
    name: 'Erik Martinez',
    email: 'erik@example.com',
    type: FeedbackType.BUG,
    title: 'Gallery Image Loading Failure',
    message: 'Images are not loading in the gallery section'
  },
  {
    name: 'Fiona Taylor',
    email: 'fiona@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'CSV Export Feature',
    message: 'Add an option to export data in CSV format'
  },
  {
    name: 'George Brown',
    email: 'george@example.com',
    type: FeedbackType.BUG,
    title: 'Login Page Freeze',
    message: 'Login page freezes after failed attempt'
  },
  {
    name: 'Hannah Lee',
    email: 'hannah@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Google Calendar Integration',
    message: 'Would love to see integration with Google Calendar'
  },
  {
    name: 'Ian Wright',
    email: 'ian@example.com',
    type: FeedbackType.BUG,
    title: 'Password Reset Email Issue',
    message: 'Password reset email never arrives'
  },
  {
    name: 'Julia Chen',
    email: 'julia@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Multi-language Support Request',
    message: 'Add multi-language support'
  },
  {
    name: 'Kevin Patel',
    email: 'kevin@example.com',
    type: FeedbackType.BUG,
    title: 'Cart Items Disappearing',
    message: 'Cart items disappear after refresh'
  },
  {
    name: 'Laura Garcia',
    email: 'laura@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Upload Progress Bar',
    message: 'Include a progress bar for uploads'
  },
  {
    name: 'Mike Wilson',
    email: 'mike@example.com',
    type: FeedbackType.BUG,
    title: 'Safari Form Submission Issue',
    message: 'Cannot submit forms on Safari browser'
  },
  {
    name: 'Nina Rodriguez',
    email: 'nina@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Batch Processing Feature',
    message: 'Add batch processing for multiple items'
  },
  {
    name: 'Oscar Thompson',
    email: 'oscar@example.com',
    type: FeedbackType.BUG,
    title: 'Profile Picture Upload Failure',
    message: 'Profile picture upload fails repeatedly'
  },
  {
    name: 'Patricia Lee',
    email: 'patricia@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Draft Saving Feature',
    message: 'Implement save draft feature'
  },
  {
    name: 'Quincy Adams',
    email: 'quincy@example.com',
    type: FeedbackType.BUG,
    title: 'Incorrect Notification Count',
    message: 'Notification bell shows wrong count'
  },
  {
    name: 'Rachel Kim',
    email: 'rachel@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Customizable Dashboard',
    message: 'Add customizable dashboard widgets'
  },
  {
    name: 'Samuel Jackson',
    email: 'samuel@example.com',
    type: FeedbackType.BUG,
    title: 'Inconsistent Search Results',
    message: 'Search results are inconsistent'
  },
  {
    name: 'Tina Turner',
    email: 'tina@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Video Tutorial Section',
    message: 'Include video tutorial section'
  },
  {
    name: 'Uma Patel',
    email: 'uma@example.com',
    type: FeedbackType.BUG,
    title: 'Calendar Timezone Issue',
    message: 'Calendar events show wrong timezone'
  },
  {
    name: 'Victor Cruz',
    email: 'victor@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Bulk Import Feature',
    message: 'Add bulk import feature'
  },
  {
    name: 'Wendy Brown',
    email: 'wendy@example.com',
    type: FeedbackType.BUG,
    title: 'Print Function Error',
    message: 'Print function not working'
  },
  {
    name: 'Xavier Rodriguez',
    email: 'xavier@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'PDF Export Option',
    message: 'Include PDF export option'
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki@example.com',
    type: FeedbackType.BUG,
    title: 'Mobile Dropdown Menu Issue',
    message: 'Dropdown menus not clickable on mobile'
  },
  {
    name: 'Zoe Martin',
    email: 'zoe@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Collaboration Features Request',
    message: 'Add collaboration features'
  },
  {
    name: 'Adam Wilson',
    email: 'adam@example.com',
    type: FeedbackType.BUG,
    title: 'Item Deletion Error',
    message: 'Cannot delete saved items'
  },
  {
    name: 'Betty Cooper',
    email: 'betty@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'List Sorting Options',
    message: 'Include sorting options in lists'
  },
  {
    name: 'Carl Johnson',
    email: 'carl@example.com',
    type: FeedbackType.BUG,
    title: 'User Preferences Loading Error',
    message: 'Error loading user preferences'
  },
  {
    name: 'Dana Lee',
    email: 'dana@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Custom Theme Options',
    message: 'Add custom theme options'
  },
  {
    name: 'Eddie Murphy',
    email: 'eddie@example.com',
    type: FeedbackType.BUG,
    title: 'Comments Display Issue',
    message: 'Comments not showing up'
  },
  {
    name: 'Fay Wong',
    email: 'fay@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Activity Log Feature',
    message: 'Include activity log feature'
  },
  {
    name: 'Greg Peters',
    email: 'greg@example.com',
    type: FeedbackType.BUG,
    title: 'Email Update Error',
    message: 'Cannot update email address'
  },
  {
    name: 'Helen Troy',
    email: 'helen@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Auto-save Feature',
    message: 'Add auto-save feature'
  },
  {
    name: 'Ivan Petrov',
    email: 'ivan@example.com',
    type: FeedbackType.BUG,
    title: 'Checkout Process Freeze',
    message: 'Checkout process freezes'
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Quick Filters Feature',
    message: 'Include quick filters'
  },
  {
    name: 'Karl Marx',
    email: 'karl@example.com',
    type: FeedbackType.BUG,
    title: 'Share Button Malfunction',
    message: 'Share buttons not working'
  },
  {
    name: 'Lucy Liu',
    email: 'lucy@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Batch Export Feature',
    message: 'Add batch export feature'
  },
  {
    name: 'Mario Bros',
    email: 'mario@example.com',
    type: FeedbackType.BUG,
    title: 'Game Control Response Issue',
    message: 'Game controls unresponsive'
  },
  {
    name: 'Nancy Drew',
    email: 'nancy@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Search History Feature',
    message: 'Include search history'
  },
  {
    name: 'Oliver Twist',
    email: 'oliver@example.com',
    type: FeedbackType.BUG,
    title: 'Payment Processing Error',
    message: 'Payment processing error'
  },
  {
    name: 'Peter Pan',
    email: 'peter@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Favorites Feature',
    message: 'Add favorite items feature'
  },
  {
    name: 'Quinn Smith',
    email: 'quinn@example.com',
    type: FeedbackType.BUG,
    title: 'Video Playback Problem',
    message: 'Video playback issues'
  },
  {
    name: 'Rita Ora',
    email: 'rita@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Music Player Controls',
    message: 'Include music player controls'
  },
  {
    name: 'Steve Jobs',
    email: 'steve@example.com',
    type: FeedbackType.BUG,
    title: 'App Startup Crash',
    message: 'App crashes on startup'
  },
  {
    name: 'Tina Fey',
    email: 'tina.f@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Emoji Reaction Feature',
    message: 'Add emoji reactions'
  },
  {
    name: 'Ursula King',
    email: 'ursula@example.com',
    type: FeedbackType.BUG,
    title: 'Image Loading Failure',
    message: 'Cannot load images'
  },
  {
    name: 'Vincent Price',
    email: 'vincent@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Dark Theme Request',
    message: 'Include dark theme'
  },
  {
    name: 'Wade Wilson',
    email: 'wade@example.com',
    type: FeedbackType.BUG,
    title: 'Infinite Loading Issue',
    message: 'Infinite loading screen'
  },
  {
    name: 'Xena Smith',
    email: 'xena@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Profile Badges Feature',
    message: 'Add profile badges'
  },
  {
    name: 'Yoda Master',
    email: 'yoda@example.com',
    type: FeedbackType.BUG,
    title: 'Force Powers Malfunction',
    message: 'Force powers not working'
  },
  {
    name: 'Zack Morris',
    email: 'zack@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Time-out Feature',
    message: 'Include time-out feature'
  },
  {
    name: 'Amy Adams',
    email: 'amy@example.com',
    type: FeedbackType.BUG,
    title: 'Notification Sound Issue',
    message: 'Notification sounds not working'
  },
  {
    name: 'Bruce Wayne',
    email: 'bruce@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Night Mode Feature',
    message: 'Add night mode'
  },
  {
    name: 'Clara Oswald',
    email: 'clara@example.com',
    type: FeedbackType.BUG,
    title: 'Time Travel Function Error',
    message: 'Time travel function broken'
  },
  {
    name: 'David Banner',
    email: 'david@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Anger Management Tips',
    message: 'Include anger management tips'
  },
  {
    name: 'Emma Stone',
    email: 'emma@example.com',
    type: FeedbackType.BUG,
    title: 'Screen Recording Error',
    message: 'Screen recording fails'
  },
  {
    name: 'Frank Castle',
    email: 'frank@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Weapon Inventory System',
    message: 'Add weapon inventory system'
  },
  {
    name: 'Gwen Stacy',
    email: 'gwen@example.com',
    type: FeedbackType.BUG,
    title: 'Web Shooter Malfunction',
    message: 'Web shooter malfunction'
  },
  {
    name: 'Harry Potter',
    email: 'harry@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Spell Checker Feature',
    message: 'Add spell checker'
  },
  {
    name: 'Iris West',
    email: 'iris@example.com',
    type: FeedbackType.BUG,
    title: 'Speed Force Connection Error',
    message: 'Speed force not connecting'
  },
  {
    name: 'John Connor',
    email: 'john@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Future Prediction Feature',
    message: 'Include future prediction feature'
  },
  {
    name: 'Kate Bishop',
    email: 'kate@example.com',
    type: FeedbackType.BUG,
    title: 'Arrow Targeting Issue',
    message: 'Arrows missing targets'
  },
  {
    name: 'Loki Odinson',
    email: 'loki@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Mischief Tracking System',
    message: 'Add mischief tracker'
  },
  {
    name: 'Matt Murdock',
    email: 'matt@example.com',
    type: FeedbackType.BUG,
    title: 'Radar Sense Malfunction',
    message: 'Radar sense malfunctioning'
  },
  {
    name: 'Natasha Romanoff',
    email: 'natasha@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Stealth Mode Feature',
    message: 'Include stealth mode'
  },
  {
    name: 'Otto Octavius',
    email: 'otto@example.com',
    type: FeedbackType.BUG,
    title: 'Mechanical Arms Responsiveness',
    message: 'Mechanical arms unresponsive'
  },
  {
    name: 'Peter Parker',
    email: 'spidey@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Web Fluid Calculator Feature',
    message: 'Add web fluid calculator'
  },
  {
    name: 'Reed Richards',
    email: 'reed@example.com',
    type: FeedbackType.BUG,
    title: 'Stretching Physics Error',
    message: 'Stretching physics broken'
  },
  {
    name: 'Sue Storm',
    email: 'sue@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'Invisibility Toggle Feature',
    message: 'Add invisibility toggle'
  },
  {
    name: 'Thor Odinson',
    email: 'thor@example.com',
    type: FeedbackType.BUG,
    title: 'Lightning Effects Issue',
    message: 'Lightning effects missing'
  },
  {
    name: 'Tony Stark',
    email: 'tony@example.com',
    type: FeedbackType.SUGGESTION,
    title: 'AI Assistant Integration',
    message: 'Add AI assistant integration'
  }
]

async function seed(): Promise<void> {
  try {
    // Connect to database
    await db()
    console.log('Connected to database')

    // Clear existing data
    await FeedbackModel.deleteMany({})
    console.log('Cleared existing feedback data')

    // Insert sample data with delays to ensure different creation timestamps
    for (const feedback of sampleFeedback) {
      await FeedbackModel.create(feedback)
      // Add small delay between insertions to ensure different timestamps
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log(`Successfully seeded ${sampleFeedback.length} feedback entries`)
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
  }
}

// Run the seed function
seed()
