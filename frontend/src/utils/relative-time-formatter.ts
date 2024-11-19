export function getRelativeTimeString(timestamp: Date) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const formatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
    style: 'narrow',
  })

  if (diffInSeconds < 60) {
    return formatter.format(-diffInSeconds, 'seconds')
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return formatter.format(-diffInMinutes, 'minutes')
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return formatter.format(-diffInHours, 'hours')
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return formatter.format(-diffInDays, 'days')
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return formatter.format(-diffInWeeks, 'weeks')
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return formatter.format(-diffInMonths, 'months')
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return formatter.format(-diffInYears, 'years')
}
