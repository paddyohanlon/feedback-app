import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getRelativeTimeString } from '../utils/relative-time-formatter'

// These tests are AI generated, I haven't double-checked the tests
describe('getRelativeTimeString', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats seconds correctly', () => {
    const date = new Date('2024-01-01T11:59:30')
    expect(getRelativeTimeString(date)).toBe('30s ago')
  })

  it('formats minutes correctly', () => {
    const date = new Date('2024-01-01T11:45:00')
    expect(getRelativeTimeString(date)).toBe('15m ago')
  })

  it('formats hours correctly', () => {
    const date = new Date('2024-01-01T08:00:00')
    expect(getRelativeTimeString(date)).toBe('4h ago')
  })

  it('formats days correctly', () => {
    const date = new Date('2023-12-29T12:00:00')
    expect(getRelativeTimeString(date)).toBe('3d ago')
  })

  it('formats weeks correctly', () => {
    const date = new Date('2023-12-15T12:00:00')
    expect(getRelativeTimeString(date)).toBe('2w ago')
  })
})
