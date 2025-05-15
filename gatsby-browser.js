// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"

import React from "react"
import { MantineProvider } from "@mantine/core"
import { theme } from "./src/components/theme"

export const wrapPageElement = ({ element }) => {
  return <MantineProvider theme={theme}>{element}</MantineProvider>
}
