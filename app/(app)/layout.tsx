import { ThemeProvider } from 'next-themes'
import React, { PropsWithChildren } from 'react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { load } from 'outstatic/server'
import { Project } from '@/lib/types'

export default async function RootLayout({ children }: PropsWithChildren) {
  const db = await load()
  const projects = await db
    .find<Project>({
      collection: 'projects',
    })
    .project([
      'title',
      'description',
      'slug',
      'publishedAt',
      'coverImage',
      'techStack',
    ])
    .sort({ publishedAt: -1 })
    .toArray()

    

  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
      storageKey="theme"
      defaultTheme="system"
    >
      <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
        <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
