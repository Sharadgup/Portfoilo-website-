'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const AnimatedBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const colors = []

    for (let i = 0; i < 15000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000))
      vertices.push(THREE.MathUtils.randFloatSpread(2000))
      vertices.push(THREE.MathUtils.randFloatSpread(2000))

      colors.push(Math.random() * 0.5 + 0.5)
      colors.push(Math.random() * 0.5 + 0.5)
      colors.push(Math.random() * 0.5 + 0.5)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({ size: 3, vertexColors: true })
    const points = new THREE.Points(geometry, material)

    scene.add(points)
    camera.position.z = 1000

    let mouseX = 0
    let mouseY = 0

    const animate = () => {
      requestAnimationFrame(animate)

      const time = Date.now() * 0.00005

      points.rotation.x = time * 0.5
      points.rotation.y = time * 0.3

      points.position.x += (mouseX - points.position.x) * 0.05
      points.position.y += (-mouseY - points.position.y) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100
      mouseY = (event.clientY - window.innerHeight / 2) / 100
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 -z-10" />
}

export default AnimatedBackground

