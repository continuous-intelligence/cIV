import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';

const builder = imageUrlBuilder(client);

interface SanityImageSource {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function for responsive images
export function getImageDimensions(image: SanityImageSource) {
  if (!image?.asset?._ref) return null;

  const ref = image.asset._ref;
  const dimensions = ref.split('-')[2];
  const [width, height] = dimensions.split('x').map(Number);

  return { width, height };
}

// Helper function for optimized images
export function getOptimizedImageUrl(
  image: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
) {
  if (!image) return null;

  const { width, height, quality = 80, format } = options;

  let url = urlFor(image);

  if (width) url = url.width(width);
  if (height) url = url.height(height);
  if (quality) url = url.quality(quality);
  if (format) url = url.format(format);

  return url.url();
}
