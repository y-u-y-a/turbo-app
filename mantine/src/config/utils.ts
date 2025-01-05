export async function waitSecondsAsync() {
  console.log("Start wait timer.")

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Passed 3 seconds.")
      resolve()
    }, 3000)
  })
  return true
}
