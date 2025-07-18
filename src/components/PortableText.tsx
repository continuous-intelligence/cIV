import { PortableText as BasePortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '../lib/image';

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

const components = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string; _type: 'reference' }; alt?: string };
    }) => {
      const imageUrl = urlFor(value).width(800).height(600).url();
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
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-xl font-bold mb-2 text-gray-900">{children}</h4>
    ),
    h5: ({ children }: { children?: React.ReactNode }) => (
      <h5 className="text-lg font-bold mb-2 text-gray-900">{children}</h5>
    ),
    h6: ({ children }: { children?: React.ReactNode }) => (
      <h6 className="text-base font-bold mb-2 text-gray-900">{children}</h6>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 text-gray-800">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 text-gray-800">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
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
};

export default function PortableText({
  value,
  className = '',
}: PortableTextProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
