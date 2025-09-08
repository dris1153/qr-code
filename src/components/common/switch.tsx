'use client'

import type * as React from 'react'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/libs'

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        `peer focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-success-light inline-flex h-6 w-[43px] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-[#E1E2E4] dark:data-[state=unchecked]:bg-[#E1E2E4]`,
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          `bg-background pointer-events-none ml-0.5 block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-white dark:data-[state=unchecked]:bg-white`,
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
