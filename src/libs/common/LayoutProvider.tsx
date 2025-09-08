'use client'

import { FCC } from '@/types'
import { memo } from 'react'
import { Toaster } from 'sonner'

const LayoutProvider: FCC = ({ children }) => {
  return (
    <>
      <div className="flex h-screen w-full">
        <main className="max-w-full flex-1">{children}</main>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className: 'sonner',
            classNames: {
              icon: '!w-5 !h-5',
            },
          }}
          // icons={{
          //   success: <FillCheckIcon className="*:fill-success" />,
          //   error: <FillXIcon className="*:fill-error" />,
          //   loading: <LoadingIcon />,
          // }}
        />
      </div>
    </>
  )
}

export default memo(LayoutProvider)
