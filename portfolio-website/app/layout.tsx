import './globals.css'
import { Inter } from 'next/font/google'
import AttributeRemover from './components/AttributeRemover'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Animated Portfolio',
  description: 'A single-page animated portfolio website',
}

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

