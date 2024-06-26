import Image from "next/image";
import { cn } from "./utils";

const isKnownProvider = (imageUrl: string) => {
  const url = new URL(imageUrl);
  const domain = url.hostname;
  return knownDomains.includes(domain);
};
function ImageProvider({ imageUrl, alt, className }: { imageUrl: string, alt: string, className?: string }) {
  const hasProvider = isKnownProvider(imageUrl);
  console.log(hasProvider)
console.log('current image: ', imageUrl)
  if (hasProvider) {
    // WITH PROVIDER
    return (
      <Image
        src={imageUrl}
        objectFit="cover"
        layout="fill"
        alt={alt}
        className={cn("z-0", className)}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = event.target as HTMLImageElement;
          // prevent broken image
          target.src = '/user-empty.webp';
        }}
      />
    );
  } else {
    // NOT PROVIDER
    return (
      <img
        src={`${imageUrl}`}
        alt={alt}
        className={cn("w-full h-full", className)}
        width={100}
        height={100}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = event.target as HTMLImageElement;
          // prevent broken image
          target.src = '/user-empty.webp';
          // target.src = `${imageUrl}`;
        }}
      />
    );
  }
};


export const knownDomains = [
  "instagram.fuio19-1.fna.fbcdn.net",
  "m.media-amazon.com",
  "http2.mlstatic.com",
  "images.fastcompany.net",
  "1dh5zqw7u0xfdger.public.blob.vercel-storage.com",
  "scontent-lax3-1.cdninstagram.com",
  "scontent-ams2-1.cdninstagram.com",
  "instagram.fcpv15-1.fna.fbcdn.net",
  'instagram.fuio35-1.fna.fbcdn.net',
  "books.toscrape.com",
  "cloudflare-ipfs.com",
  "avatars.githubusercontent.com",
  'instagram.fuio32-1.fna.fbcdn.net'
];

export default ImageProvider;