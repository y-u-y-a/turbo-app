"use client"

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error)

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button type="button">Try again</button>
    </div>
  )
}
