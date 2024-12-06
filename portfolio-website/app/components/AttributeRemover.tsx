'use client'

import { useEffect } from 'react'

export default function AttributeRemover() {
  useEffect(() => {
    const html = document.documentElement
    if (html.hasAttribute('data-qb-installed')) {
      html.removeAttribute('data-qb-installed')
    }
  }, [])

  return null
}

