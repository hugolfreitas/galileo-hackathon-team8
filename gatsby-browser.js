// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css"

import React from "react"
import { MantineProvider } from "@mantine/core"
import { theme } from "./src/components/theme"
import secproBg from "./src/images/secpro-bg.png"

export const wrapPageElement = ({ element }) => {
  return (
    <MantineProvider theme={theme}>
      <div
        style={{
          backgroundColor: "#181c24",
          backgroundImage: `url(${secproBg}) `,
          backgroundSize: `cover, auto, auto, auto, auto, auto, auto, auto, auto, auto`,
          backgroundPosition: `center, 20px 40px, 60px 80px, 120px 160px, 200px 100px, 300px 200px, 400px 300px, 500px 150px, 600px 250px, 700px 350px`,
        }}
      >
        {element}
      </div>
    </MantineProvider>
  )
}
