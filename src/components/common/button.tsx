import { cn } from '@/libs'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type MotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import useIsMount from '@/hooks/useIsMount'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-md font-medium ring-offset-background transition-all duration-[550] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ',
  {
    variants: {
      variant: {
        // default: 'bg-primary text-primary-foreground disabled:text-primary-foreground-light',
        default:
          'bg-transparent border border-solid border-primary text-secondary-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-[0.8]',
        white:
          'bg-transparent border border-solid border-white text-white hover:bg-white hover:text-primary disabled:opacity-[0.8]',
      },
      size: {
        default: 'h-8 px-4 text-[10px] leading-[18px]',
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        '4xl': 'rounded-4xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  },
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  motionProps?: MotionProps
  children?: React.ReactNode
}

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant,
        size,
        rounded,
        asChild = false,
        loading = false,
        motionProps,
        children,
        disabled,
        ...props
      },
      ref,
    ) => {
      const Comp = asChild ? Slot : 'button'

      const isMount = useIsMount()

      if (!isMount) return null

      const MotionComp = motion.create(Comp as React.ElementType)

      return (
        <MotionComp
          className={cn(
            'font-pp-neue-montreal hover:bg-primary hover:text-primary-foreground font-medium',
            buttonVariants({ variant, size, rounded, className }),
          )}
          disabled={disabled || loading}
          ref={ref}
          {...motionProps}
          {...props}
        >
          {children}
        </MotionComp>
      )
    },
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
