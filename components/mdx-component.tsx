import { cn } from '@/lib/utils'
import React from 'react'
import Markdown from 'react-markdown'

export function MdxComponent({ content }: { content: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children, className, ...props }) => (
          <h1
            {...props}
            className={cn(className, 'mb-4 text-4xl font-bold tracking-tight')}
          >
            {children}
          </h1>
        ),
        h2: ({ children, className, ...props }) => (
          <h2
            {...props}
            className={cn(
              className,
              'mb-3 text-3xl font-semibold tracking-tight',
            )}
          >
            {children}
          </h2>
        ),
        h3: ({ children, className, ...props }) => (
          <h3
            {...props}
            className={cn(
              className,
              'mb-2 text-2xl font-semibold tracking-tight',
            )}
          >
            {children}
          </h3>
        ),
        p: ({ children, className, ...props }) => (
          <p {...props} className={cn(className, 'mb-4 text-base leading-7')}>
            {children}
          </p>
        ),
        a: ({ children, className, ...props }) => (
          <a
            {...props}
            target="_blank"
            className={cn(className, 'text-blue-600 hover:underline')}
          >
            {children}
          </a>
        ),
        blockquote: ({ children, className, ...props }) => (
          <blockquote
            {...props}
            className={cn(
              className,
              'my-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic',
            )}
          >
            {children}
          </blockquote>
        ),
        ul: ({ children, className, ...props }) => (
          <ul {...props} className={cn(className, 'mb-4 list-disc pl-6')}>
            {children}
          </ul>
        ),
        ol: ({ children, className, ...props }) => (
          <ol {...props} className={cn(className, 'mb-4 list-decimal pl-6')}>
            {children}
          </ol>
        ),
        li: ({ children, className, ...props }) => (
          <li {...props} className={cn(className, 'mb-2 ml-6')}>
            {children}
          </li>
        ),
        img: ({ children, className, alt, ...props }) => (
          <img
            {...props}
            alt={alt}
            className={cn(className, 'my-4 w-full rounded-lg object-cover')}
          />
        ),
        code: ({ children, className, ...props }) => (
          <code
            {...props}
            className={cn(
              className,
              'rounded bg-gray-100 px-1 py-0.5 font-mono text-sm',
            )}
          >
            {children}
          </code>
        ),
        pre: ({ children, className, ...props }) => (
          <pre
            {...props}
            className={cn(
              className,
              'overflow-auto rounded-lg bg-gray-900 p-4 text-sm text-white',
            )}
          >
            {children}
          </pre>
        ),
        hr: ({ ...props }) => (
          <hr {...props} className="my-6 border-t border-gray-300" />
        ),
      }}
    >
      {content}
    </Markdown>
  )
}
