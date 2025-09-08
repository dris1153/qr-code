'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/libs'

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center gap-3 rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  variant?: 'default' | 'ghost'
}

function TabsTrigger({ className, variant = 'default', ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-button-secondary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:ring-button-primary ring-button-linear-border inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap ring-1 transition-all hover:opacity-80 focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm data-[state=active]:ring-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        variant === 'default' &&
          'data-[state=active]:text-button-secondary-foreground min-h-[34px] min-w-[92px] bg-[linear-gradient(180deg,_rgba(39,_37,_56,_0.20)_-25%,_rgba(96,_112,_149,_0.20)_75%)] text-white shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]',
        variant === 'ghost' &&
          'data-[state=active]:text-neutral-1 min-h-auto min-w-auto rounded-lg px-2 py-1 text-[9px] leading-4 font-normal text-[#9E9FA6] ring-0 data-[state=active]:ring-0',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
