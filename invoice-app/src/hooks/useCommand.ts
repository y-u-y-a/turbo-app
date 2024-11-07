import { useEffect, useState } from "react"

export const useCommand = (key: string, initialState = false) => {
  const [enabledEditor, setEnabledEditor] = useState(initialState)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === key) {
        e.preventDefault()
        setEnabledEditor((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [key])

  return enabledEditor
}
