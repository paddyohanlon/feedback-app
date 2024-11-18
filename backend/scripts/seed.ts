// src/scripts/seed.ts
import db from '../db'
import { FeedbackModel } from '../models/feedback'
import { FeedbackType, type UnsavedFeedback } from '../types/common'
import mongoose from 'mongoose'

const sampleFeedback: UnsavedFeedback[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'The search filter is not working on mobile devices'
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Would be great to have a dark mode option'
  },
  {
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Getting 404 errors when accessing my profile page'
  },
  {
    name: 'Diana Wilson',
    email: 'diana@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Please add keyboard shortcuts for common actions'
  },
  {
    name: 'Erik Martinez',
    email: 'erik@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Images are not loading in the gallery section'
  },
  {
    name: 'Fiona Taylor',
    email: 'fiona@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add an option to export data in CSV format'
  },
  {
    name: 'George Brown',
    email: 'george@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Login page freezes after failed attempt'
  },
  {
    name: 'Hannah Lee',
    email: 'hannah@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Would love to see integration with Google Calendar'
  },
  {
    name: 'Ian Wright',
    email: 'ian@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Password reset email never arrives'
  },
  {
    name: 'Julia Chen',
    email: 'julia@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add multi-language support'
  },
  {
    name: 'Kevin Patel',
    email: 'kevin@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Cart items disappear after refresh'
  },
  {
    name: 'Laura Garcia',
    email: 'laura@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include a progress bar for uploads'
  },
  {
    name: 'Mike Wilson',
    email: 'mike@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Cannot submit forms on Safari browser'
  },
  {
    name: 'Nina Rodriguez',
    email: 'nina@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add batch processing for multiple items'
  },
  {
    name: 'Oscar Thompson',
    email: 'oscar@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Profile picture upload fails repeatedly'
  },
  {
    name: 'Patricia Lee',
    email: 'patricia@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Implement save draft feature'
  },
  {
    name: 'Quincy Adams',
    email: 'quincy@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Notification bell shows wrong count'
  },
  {
    name: 'Rachel Kim',
    email: 'rachel@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add customizable dashboard widgets'
  },
  {
    name: 'Samuel Jackson',
    email: 'samuel@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Search results are inconsistent'
  },
  {
    name: 'Tina Turner',
    email: 'tina@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include video tutorial section'
  },
  {
    name: 'Uma Patel',
    email: 'uma@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Calendar events show wrong timezone'
  },
  {
    name: 'Victor Cruz',
    email: 'victor@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add bulk import feature'
  },
  {
    name: 'Wendy Brown',
    email: 'wendy@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Print function not working'
  },
  {
    name: 'Xavier Rodriguez',
    email: 'xavier@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include PDF export option'
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Dropdown menus not clickable on mobile'
  },
  {
    name: 'Zoe Martin',
    email: 'zoe@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add collaboration features'
  },
  {
    name: 'Adam Wilson',
    email: 'adam@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Cannot delete saved items'
  },
  {
    name: 'Betty Cooper',
    email: 'betty@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include sorting options in lists'
  },
  {
    name: 'Carl Johnson',
    email: 'carl@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Error loading user preferences'
  },
  {
    name: 'Dana Lee',
    email: 'dana@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add custom theme options'
  },
  {
    name: 'Eddie Murphy',
    email: 'eddie@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Comments not showing up'
  },
  {
    name: 'Fay Wong',
    email: 'fay@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include activity log feature'
  },
  {
    name: 'Greg Peters',
    email: 'greg@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Cannot update email address'
  },
  {
    name: 'Helen Troy',
    email: 'helen@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add auto-save feature'
  },
  {
    name: 'Ivan Petrov',
    email: 'ivan@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Checkout process freezes'
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include quick filters'
  },
  {
    name: 'Karl Marx',
    email: 'karl@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Share buttons not working'
  },
  {
    name: 'Lucy Liu',
    email: 'lucy@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add batch export feature'
  },
  {
    name: 'Mario Bros',
    email: 'mario@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Game controls unresponsive'
  },
  {
    name: 'Nancy Drew',
    email: 'nancy@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include search history'
  },
  {
    name: 'Oliver Twist',
    email: 'oliver@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Payment processing error'
  },
  {
    name: 'Peter Pan',
    email: 'peter@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add favorite items feature'
  },
  {
    name: 'Quinn Smith',
    email: 'quinn@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Video playback issues'
  },
  {
    name: 'Rita Ora',
    email: 'rita@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include music player controls'
  },
  {
    name: 'Steve Jobs',
    email: 'steve@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'App crashes on startup'
  },
  {
    name: 'Tina Fey',
    email: 'tina.f@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add emoji reactions'
  },
  {
    name: 'Ursula King',
    email: 'ursula@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Cannot load images'
  },
  {
    name: 'Vincent Price',
    email: 'vincent@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include dark theme'
  },
  {
    name: 'Wade Wilson',
    email: 'wade@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Infinite loading screen'
  },
  {
    name: 'Xena Smith',
    email: 'xena@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add profile badges'
  },
  {
    name: 'Yoda Master',
    email: 'yoda@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Force powers not working'
  },
  {
    name: 'Zack Morris',
    email: 'zack@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include time-out feature'
  },
  {
    name: 'Amy Adams',
    email: 'amy@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Notification sounds not working'
  },
  {
    name: 'Bruce Wayne',
    email: 'bruce@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add night mode'
  },
  {
    name: 'Clara Oswald',
    email: 'clara@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Time travel function broken'
  },
  {
    name: 'David Banner',
    email: 'david@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include anger management tips'
  },
  {
    name: 'Emma Stone',
    email: 'emma@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Screen recording fails'
  },
  {
    name: 'Frank Castle',
    email: 'frank@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add weapon inventory system'
  },
  {
    name: 'Gwen Stacy',
    email: 'gwen@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Web shooter malfunction'
  },
  {
    name: 'Harry Potter',
    email: 'harry@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add spell checker'
  },
  {
    name: 'Iris West',
    email: 'iris@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Speed force not connecting'
  },
  {
    name: 'John Connor',
    email: 'john@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include future prediction feature'
  },
  {
    name: 'Kate Bishop',
    email: 'kate@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Arrows missing targets'
  },
  {
    name: 'Loki Odinson',
    email: 'loki@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add mischief tracker'
  },
  {
    name: 'Matt Murdock',
    email: 'matt@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Radar sense malfunctioning'
  },
  {
    name: 'Natasha Romanoff',
    email: 'natasha@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Include stealth mode'
  },
  {
    name: 'Otto Octavius',
    email: 'otto@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Mechanical arms unresponsive'
  },
  {
    name: 'Peter Parker',
    email: 'spidey@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add web fluid calculator'
  },
  {
    name: 'Reed Richards',
    email: 'reed@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Stretching physics broken'
  },
  {
    name: 'Sue Storm',
    email: 'sue@example.com',
    feedbackType: FeedbackType.SUGGESTION,
    message: 'Add invisibility toggle'
  },
  {
    name: 'Thor Odinson',
    email: 'thor@example.com',
    feedbackType: FeedbackType.BUG,
    message: 'Lightning effects missing'
  },
  {
    name: 'Tony Stark',
    email: 'tony@example.com',
    feedbackType: FeedbackType.SUGGESTION,
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
