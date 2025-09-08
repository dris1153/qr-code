'use client'
import { Button, Input } from '@/components/common'
import { changeLanguage } from '@/utils/helper'
import { FC, useState } from 'react'

const HomePage: FC = () => {
  const [value, setValue] = useState('')
  return (
    <div className="flex h-screen w-screen flex-col gap-2">
      <section className="flex items-center gap-4 pt-8 pr-4 pl-4 lg:pl-8 xl:pr-18">
        <Button onClick={() => changeLanguage('zh')}>Chinese</Button>
        <Button onClick={() => changeLanguage('en')}>English</Button>
      </section>
      <section className="flex w-full flex-col gap-4 px-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập URL QRCode..."
          className="w-full md:max-w-1/2 lg:max-w-1/3"
        />
        <Button
          className="w-max text-lg"
          size="default"
          onClick={() => {
            if (!value) {
              alert('Vui lòng nhập URL để tạo mã QRCode')
            }
          }}
        >
          Generate QRCode
        </Button>
      </section>
    </div>
  )
}

export default HomePage
