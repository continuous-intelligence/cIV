import { PortableText as BasePortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '../lib/image'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Article image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.alt && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    codeBlock: ({ value }: any) => {
      return (
        <div className="my-8">
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code className={`language-${value.language || 'text'}`}>
              {value.code}
            </code>
          </pre>
        </div>
      )
    },
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-base leading-relaxed text-gray-700">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 bg-gray-50 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <BasePortableText value={value} components={components} />
    </div>
  )
} 