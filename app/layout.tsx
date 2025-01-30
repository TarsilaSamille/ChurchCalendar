import { Playfair_Display } from "next/font/google"
import type React from "react"
import Script from "next/script"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={playfair.className}>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/locale/pt-br.min.js"
          integrity="sha512-1IpxmBdyZx3okPiZ14mzw6+pOGa690uDmcdjqvT310Kwv3NRcjvL/aOtoSprEyvkDdAb7ZtM2um6KrLqLOY97w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'