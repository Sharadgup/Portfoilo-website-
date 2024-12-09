'use client'

import { useState, useEffect } from 'react'
import AnimatedLoadingBar from './components/AnimatedLoadingBar'
import AnimatedBackground from './components/AnimatedBackground'
import Content from './components/Content'
import TextToSpeech from './components/TextToSpeech'; // Adjust path to where you store the component

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setContent("Content.tsx!");
    }, 6000); // Increased to 6 seconds  
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
     {/* Include the TextToSpeech component and pass dynamic content */}
     <TextToSpeech content={content} />
    </main>
  )
}

