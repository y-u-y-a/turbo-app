import { render as testingLibraryRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MantineUIProvider } from "./mantine"

/**
 * @see https://mantine.dev/guides/vitest/
 * @see https://github.com/mantinedev/vite-template
 */
export * from "@testing-library/react"
export { userEvent }

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<div>{ui}</div>, {
    wrapper: ({ children }: { children: React.ReactNode }) => <MantineUIProvider>{children}</MantineUIProvider>,
  })
}
