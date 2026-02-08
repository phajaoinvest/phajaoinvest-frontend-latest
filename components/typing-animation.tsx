"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  staticText: string
  phrases: string[]
  className?: string
}

export function TypingAnimation({ staticText, phrases, className = "" }: TypingAnimationProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Pause for 2 seconds before deleting

      return () => clearTimeout(pauseTimer)
    }

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentPhrase.length) {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1))
          } else {
            setIsPaused(true)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 80 : 200, // Slower deletion and much slower typing
    )

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, phrases, currentPhraseIndex])

  return (
    <span className={className}>
      <span className="text-white">{staticText} </span>
      <span className="text-primary">{currentText}</span>
      <span className="animate-pulse text-white">|</span>
    </span>
  )
}
