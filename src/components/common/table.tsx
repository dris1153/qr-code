'use client'

import { cn } from '@/libs'
import * as React from 'react'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative -mt-3 w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(
          'w-full caption-bottom border-separate border-spacing-x-0 border-spacing-y-3 px-4 text-sm',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('relative', className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={cn('group', className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t font-medium [&>tr]:last:border-b-1', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        '[tbody_&]:hover:bg-secondary-light [tbody_&:first-of-type]:bg-secondary-light relative',
        '[tbody_&:first-of-type]:transition-none',
        '[tbody_&]:hover:bg-secondary-light',
        '[tbody_&]:first:bg-secondary-light',
        '[tbody_&]:group-hover:first:bg-transparent',
        '[tbody_&]:first:hover:bg-secondary-light',
        '[tbody_&]:first:transition-none',
        'bg-transparent before:absolute before:-bottom-3 before:left-0 before:h-3 before:w-full before:content-[""]',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn('h-10 px-4 text-left text-xs font-medium whitespace-nowrap uppercase', className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return <td data-slot="table-cell" className={cn('h-18 px-4 py-3', className)} {...props} />
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption data-slot="table-caption" className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
