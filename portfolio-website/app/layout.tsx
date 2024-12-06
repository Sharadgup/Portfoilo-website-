import './globals.css'
import { Inter } from 'next/font/google'
import AttributeRemover from './components/AttributeRemover'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AttributeRemover />
        {children}
      </body>
    </html>
  )
}

