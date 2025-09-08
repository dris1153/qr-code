'use client'

import type * as React from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/libs'
import { CheckIcon } from '@/assets/icons/check'

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        `peer border-table-border focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:bg-tertiary-foreground-light data-[state=checked]:text-primary-foreground dark:bg-background dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-tertiary-foreground-light size-4 shrink-0 rounded-full border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-none`,
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={`flex items-center justify-center text-current transition-none`}
        data-slot="checkbox-indicator"
      >
        <CheckIcon className="text-primary-foreground size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
