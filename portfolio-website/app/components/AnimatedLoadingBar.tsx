'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const DronomonSVG = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="27" fill="#4A90E2" />
    <circle cx="21" cy="24" r="4.5" fill="white" />
    <circle cx="39" cy="24" r="4.5" fill="white" />
    <path d="M21 39C21 39 25.5 43.5 30 43.5C34.5 43.5 39 39 39 39" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 27C12 27 6 21 6 15" stroke="#4A90E2" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 27C48 27 54 21 54 15" stroke="#4A90E2" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

const AnimatedLoadingBar = () => {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const newProgress = oldProgress + 1
        controls.start({ x: `${newProgress}%` })
        return newProgress
      })
    }, 50)

    return () => clearInterval(timer)
  }, [controls])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-11/12 max-w-3xl">
        <div className="relative h-16 overflow-hidden bg-gray-700 rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            initial={{ x: '-50%' }}
            animate={controls}
          >
            <DronomonSVG />
          </motion.div>
        </div>
        <motion.p
          className="mt-6 text-center text-white text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading... {progress}%
        </motion.p>
      </div>
    </div>
  )
}

export default AnimatedLoadingBar

