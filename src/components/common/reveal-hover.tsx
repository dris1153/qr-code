'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { type FCC } from '@/types'
import { cn } from '@/libs'

interface Props {
  duration?: number
  children: React.ReactNode
  revealClassName?: string
}

export const RevealHover: FCC<Props> = ({ duration = 0.5, children, revealClassName }) => {
  return (
    <motion.div initial="initial" whileHover="hovered" className="relative w-full overflow-hidden">
      <motion.div
        className="w-full"
        variants={{
          initial: {
            y: 0,
          },
          hovered: {
            y: '-100%',
          },
        }}
        transition={{
          duration,
          ease: 'easeInOut',
        }}
      >
        <div className={cn('flex items-center justify-center', revealClassName)}>{children}</div>
      </motion.div>

      <motion.div
        className="absolute inset-0 w-full"
        variants={{
          initial: {
            y: '100%',
          },
          hovered: {
            y: 0,
          },
        }}
        transition={{
          duration,
          ease: 'easeInOut',
        }}
      >
        <div className={cn('flex items-center justify-center', revealClassName)}>{children}</div>
      </motion.div>
    </motion.div>
  )
}
