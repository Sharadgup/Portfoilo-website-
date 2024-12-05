'use client'

import { useState, useEffect } from 'react'
import AnimatedLoadingBar from './components/AnimatedLoadingBar'
import AnimatedBackground from './components/AnimatedBackground'
import Content from './components/Content'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000) // Increased to 6 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      {loading ? (
        <AnimatedLoadingBar />
      ) : (
        <Content />
      )}
    </main>
  )
}

