import clsx from 'clsx'
import { ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

import bigDecimal from 'js-big-decimal'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import Big from 'big.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toBig(value: string | number | bigint): Big {
  return new Big(typeof value === 'bigint' ? value.toString() : value)
}

const EXCEEDING_LIMIT_VALUE = 1.79769313 * Math.pow(10, 308)

export function formatShortNumber(number: number | string | bigint | undefined | null, decimals: number = 2): string {
  const value = Number(number || 0)
  if (!number) {
    return '0'
  }

  if (value < 1) {
    let r = 1
    for (let i = 0; i < decimals; i++) {
      r = r * 10
    }
    return (Math.floor(Number(value) * r) / r).toString()
  }

  // Special case: Exceeding limits
  if (value > EXCEEDING_LIMIT_VALUE) {
    return '999cz'
  }

  // Define suffixes for standard and extended notation
  const standardSuffixes = ['', 'K', 'M', 'B', 'T']
  const extendedSuffixes = []
  const englishAlphabetLength = 26
  const firstCharacterASCIICode = 97
  for (let i = 0; i < englishAlphabetLength; i++) {
    for (let j = 0; j < englishAlphabetLength; j++) {
      extendedSuffixes.push(
        String.fromCharCode(firstCharacterASCIICode + i) + String.fromCharCode(firstCharacterASCIICode + j),
      )
    }
  }

  // Determine the suffix and calculate the formatted value
  let suffix = ''
  let formattedValue = value

  if (value < 1000) {
    suffix = ''
  } else if (value < 1e15) {
    // Standard notation (K, M, B, T)
    let exponent = Math.floor(Math.log10(value) / 3)

    exponent = Math.min(exponent, standardSuffixes.length - 1)
    suffix = standardSuffixes[exponent]
    formattedValue = value / Math.pow(10, exponent * 3)
  } else {
    // Extended notation (aa, ab, ac, ..., cz)
    let exponent = Math.floor(Math.log10(value) / 3)
    exponent -= 4 // Since 1aa = 1e15 (10^15)
    if (exponent >= extendedSuffixes.length) {
      return '999cz'
    }
    suffix = extendedSuffixes[exponent]
    formattedValue = value / Math.pow(10, (exponent + 4) * 3)
  }

  // Limit to 2 decimal places
  formattedValue = Math.floor(formattedValue * 100) / 100

  return `${formattedValue}${suffix}`
}

export function formatNumber(
  number: number | bigint | string | undefined | null,
  config?: {
    maxLength?: number
    decimals?: number
    limitNoShortNumber?: number
  },
): string {
  const defaultConfig = {
    maxLength: 10,
    decimals: 18,
    limitNoShortNumber: 100_000_000,
  }

  config = { ...defaultConfig, ...config }

  // Convert the number to a string
  if (Number(number) < 0.000001 && Number(number) > -0.000001) {
    return '0'
  }
  if (Number(number) > Number(config?.limitNoShortNumber)) {
    return formatShortNumber(number)
  }
  const numberString = Number(Number(number || 0).toFixed(config?.decimals)).toString()
  // Split the string into integer and decimal parts
  const parts = numberString.split('.')
  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Check if the total length exceeds the specified maxLength
  const totalLength = parts.join('').length
  if (totalLength > Number(config?.maxLength || 10)) {
    // Truncate the decimal part to fit within the maxLength
    let remainingLength = Number(config?.maxLength || 10) - parts[0].length
    if (remainingLength < 0) {
      remainingLength = 0
    }
    parts[1] = parts[1]?.substring?.(0, remainingLength).replace(/([1-9])0+/g, '$1')
  }
  // Join the parts with a dot and check if the result ends with a dot
  let result = /^0+$/.test(parts[1]) ? parts[0] : parts.join('.')
  if (result.endsWith('.')) {
    result = result.slice(0, -1) // Remove the trailing dot
  }

  // Display the result
  return result
}

export const prettyNumber = (number: number | string, digits = 3, separator = ',') =>
  bigDecimal.getPrettyValue(number, digits, separator)

export const convertToUCTTime = (timestamp: string, tz: string, format: string = 'HH:mm'): string => {
  return `${dayjs.utc(timestamp).tz(tz).format(format)} UCT`
}

export const getCountdownToUCT = (
  endTime: string,
  tz: string = 'UTC',
  format: 'HH:mm' | 'HH:mm:ss' = 'HH:mm',
  prefix = 'UCT',
): string => {
  const now = dayjs.utc()
  const end = dayjs.utc(endTime).tz(tz)

  const diff = end.diff(now)

  const prefixText = !!prefix ? ` ${prefix}` : ''

  if (diff <= 0) {
    return `00:00${prefixText}`
  }

  const duration = dayjs.duration(diff)
  const hours = Math.floor(duration.asHours()).toString().padStart(2, '0')
  const minutes = duration.minutes().toString().padStart(2, '0')
  const seconds = duration.seconds().toString().padStart(2, '0')

  if (format === 'HH:mm:ss') {
    return `${hours}:${minutes}:${seconds}${prefixText}`
  }

  return `${hours}:${minutes}${prefixText}`
}

export const formatElapsedTime = (datetime: string): string => {
  const now = new Date()
  const date = new Date(datetime)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const days = Math.floor(diffInSeconds / (3600 * 24))
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((diffInSeconds % 3600) / 60)
  const seconds = diffInSeconds % 60

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`)

  return parts.join(' ')
}

export const formatRelativeTime = (datetime: string): string => {
  const time = dayjs(datetime)
  const now = dayjs()

  if (time.isAfter(now)) {
    console.warn(`Future timestamp detected: ${datetime}`)
    return 'just now'
  }

  return time.fromNow()
}

export function shortenString(str?: string, before = 4, after = 5) {
  if (!str) return ''
  if (str?.length <= before + after) return str
  return `${str.substring(0, before)}...${str.substring(str.length - after)}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onMutateError(error: any) {
  return toast.error(error?.message || error?.meta?.message || error?.statusText)
}

export interface FormattedNumberParts {
  prefix: string
  zeroCount: number
  rest: string
  isNegative: boolean
  formatted: string
}

export function parseLeadingZerosDecimal(input: string) {
  // Validate input
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('Input must be a non-empty string')
  }

  // Regex for valid inputs: optional negative sign, followed by either:
  // 1. Whole number (e.g., '123', '-123')
  // 2. Decimal number (e.g., '0.000123', '0.0123')
  const validFormatRegex = /^(-)?(\d+|\d*\.\d+)$/

  // Initialize result object
  const result = {
    prefix: '',
    zeroCount: 0,
    rest: '',
    isNegative: false,
    formatted: '',
  }

  // Check if input matches the valid format
  if (!validFormatRegex.test(input)) {
    throw new Error('Invalid number format')
  }

  // Handle negative sign
  if (input.startsWith('-')) {
    result.isNegative = true
    input = input.slice(1) // Remove negative sign for processing
  }

  // Handle whole numbers (e.g., '123')
  if (!input.includes('.')) {
    result.formatted = `${result.isNegative ? '-' : ''}${input}`
    return result
  }

  // Split into integer and decimal parts
  const parts = input.split('.')
  if (parts.length === 2 && parts[0] === '0') {
    const decimalPart = parts[1]
    let zeroCount = 0
    let i = 0

    // Count leading zeros
    while (i < decimalPart.length && decimalPart[i] === '0') {
      zeroCount++
      i++
    }

    // Get remaining digits
    const rest = decimalPart.slice(i) || ''

    // Throw error if only zeros after decimal
    if (rest === '') {
      throw new Error('Invalid number format')
    }

    // Special case for inputs with exactly one leading zero (e.g., '0.0123', '0.0216364363811')
    if (zeroCount === 1) {
      // Truncate to 6 decimal places
      const truncatedDecimal = decimalPart.slice(0, 5)
      result.formatted = `${result.isNegative ? '-' : ''}0.${truncatedDecimal}`
      return result
    }

    result.prefix = '0.'
    result.zeroCount = zeroCount - 1
    result.rest = rest.slice(0, 4)

    if (result.zeroCount > 8) {
      result.zeroCount = 8
    }

    // Format the output string
    result.formatted = `$0.${result.zeroCount > 0 ? `0(${result.zeroCount})${result.rest}` : result.rest}`
  } else {
    throw new Error('Invalid number format')
  }

  return result
}
