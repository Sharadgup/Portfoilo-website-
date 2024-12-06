'use client'

import { useEffect } from 'react'

export default function AttributeRemover() {
  useEffect(() => {
    // Remove any attributes added by browser extensions
    const html = document.documentElement;
    const attributesToRemove = ['data-qb-installed'];
    
    attributesToRemove.forEach(attr => {
      if (html.hasAttribute(attr)) {
        html.removeAttribute(attr);
      }
    });
  }, []);

  return null;
}

