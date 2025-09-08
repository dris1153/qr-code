import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/libs'

export const inputVariants = cva(
  cn(
    'bg-secondary-light ring-offset-background peer text-primary font-medium placeholder:font-medium placeholder:text-secondary-foreground-light transition-colors transition-shadow transition-transform duration-300 ease-in-out duration-300 caret-tertiary-foreground-light',
    'focus-visible:border focus-visible:border-[#9C9FA63D] focus-visible:bg-primary-foreground focus-visible:outline-none',
    'focus:border focus:border-[#9C9FA63D] focus:bg-primary-foreground',
    'focus-within:border focus-within:border-[#9C9FA63D] focus-within:bg-primary-foreground focus-within:outline-none focus-within:shadow-[0_0_0_4px_rgba(156,159,166,0.08))]',
  ),
  {
    variants: {
      variant: {
        default: 'text-2xl',
      },
      size: {
        default: 'h-15 px-3',
      },
      rounded: {
        default: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      rounded: 'default',
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'>,
    VariantProps<typeof inputVariants> {
  errorClassName?: string
  inputClassName?: string
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, variant = 'default', fullWidth, size, type, suffix, prefix, id, ...props }, ref) => {
    return (
      <div
        className={cn(
          'border-box relative flex items-center justify-between overflow-hidden',
          fullWidth && 'w-full',
          inputVariants({ variant, size, className }),
        )}
      >
        {prefix && <div className="flex shrink-0 items-center">{prefix}</div>}
        <input
          id={id}
          type={type}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none',
            prefix && 'pl-3',
            suffix && 'pr-3',
            inputClassName,
          )}
          ref={ref}
          {...props}
        />
        {suffix && <div className="flex shrink-0 items-center">{suffix}</div>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
