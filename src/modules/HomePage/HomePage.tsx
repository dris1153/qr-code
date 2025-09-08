'use client'
import { Button, Input } from '@/components/common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { changeLanguage } from '@/utils/helper'
import { FC, useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import Image from 'next/image'

const QR_SIZE = 200
const LOGO_SIZE = 48

const HomePage: FC = () => {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const qrRef = useRef<SVGSVGElement | null>(null)

  // Helper to draw QR and logo on canvas
  const drawQrWithLogo = async (): Promise<HTMLCanvasElement> => {
    // Get SVG QR code as string
    const svg = qrRef.current!
    const svgData = new XMLSerializer().serializeToString(svg)
    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.width = QR_SIZE
    canvas.height = QR_SIZE
    const ctx = canvas.getContext('2d')!
    // Draw QR code
    const img = new window.Image()
    const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    await new Promise<void>((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, QR_SIZE, QR_SIZE)
        resolve()
      }
      img.src = svgUrl
    })
    // Draw logo in center
    await new Promise<void>((resolve) => {
      const logoImg = new window.Image()
      logoImg.crossOrigin = 'anonymous'
      logoImg.onload = () => {
        const x = (QR_SIZE - LOGO_SIZE) / 2
        const y = (QR_SIZE - LOGO_SIZE) / 2
        // Draw white rounded rect background
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x + 8, y)
        ctx.lineTo(x + LOGO_SIZE - 8, y)
        ctx.quadraticCurveTo(x + LOGO_SIZE, y, x + LOGO_SIZE, y + 8)
        ctx.lineTo(x + LOGO_SIZE, y + LOGO_SIZE - 8)
        ctx.quadraticCurveTo(x + LOGO_SIZE, y + LOGO_SIZE, x + LOGO_SIZE - 8, y + LOGO_SIZE)
        ctx.lineTo(x + 8, y + LOGO_SIZE)
        ctx.quadraticCurveTo(x, y + LOGO_SIZE, x, y + LOGO_SIZE - 8)
        ctx.lineTo(x, y + 8)
        ctx.quadraticCurveTo(x, y, x + 8, y)
        ctx.closePath()
        ctx.fillStyle = 'white'
        ctx.shadowColor = 'rgba(0,0,0,0.08)'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.restore()
        // Draw logo
        ctx.drawImage(logoImg, x, y, LOGO_SIZE, LOGO_SIZE)
        resolve()
      }
      logoImg.src = '/logo.jpg'
    })
    return canvas
  }

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
            } else {
              setIsOpen(true)
            }
          }}
        >
          Generate QRCode
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>QR CODE</DialogTitle>
                <DialogDescription>Content: {value}</DialogDescription>
              </DialogHeader>
              <div className="relative mx-auto w-max max-w-full">
                <QRCodeSVG
                  value={value}
                  size={QR_SIZE}
                  ref={qrRef}
                  includeMargin={false}
                  style={{ display: 'block' }}
                />
                {/* Overlay logo for preview only */}
                {value && (
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    style={{ width: QR_SIZE, height: QR_SIZE }}
                  >
                    <Image
                      src="/logo.jpg"
                      alt="Logo"
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                      style={{
                        width: LOGO_SIZE,
                        height: LOGO_SIZE,
                        borderRadius: '12px',
                        background: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={async () => {
                    try {
                      const canvas = await drawQrWithLogo()
                      canvas.toBlob(async (blob) => {
                        if (blob) {
                          await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
                          alert('Copied PNG image to clipboard!')
                        }
                      }, 'image/png')
                    } catch (err) {
                      alert('Failed to copy image: ' + err)
                    }
                  }}
                >
                  Copy Image
                </Button>
                <Button
                  type="button"
                  onClick={async () => {
                    try {
                      const canvas = await drawQrWithLogo()
                      const pngUrl = canvas.toDataURL('image/png')
                      const downloadLink = document.createElement('a')
                      downloadLink.href = pngUrl
                      downloadLink.download = 'qrcode.png'
                      document.body.appendChild(downloadLink)
                      downloadLink.click()
                      document.body.removeChild(downloadLink)
                    } catch (err) {
                      alert('Failed to download image: ' + err)
                    }
                  }}
                >
                  Download
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </section>
    </div>
  )
}

export default HomePage
