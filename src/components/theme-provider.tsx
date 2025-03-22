"use client"

import * as React from "react"
import {ThemeProvider as NextThemesProvider} from "next-themes"

export default function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider forcedTheme="light"  // Force light theme always
  attribute="class"
  defaultTheme="light"
  enableSystem={false}
  disableTransitionOnChange {...props}>{children}</NextThemesProvider>
}