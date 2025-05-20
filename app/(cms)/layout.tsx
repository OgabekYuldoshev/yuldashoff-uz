import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body id="outstatic">{children}</body>
    </html>
  )
}
