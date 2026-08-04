import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
}: ProfileImageProps) {
  console.log("ProfileImage props:", { imageUrl, firstName, lastName });
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-4 border-primary/20 sm:max-w-sm md:max-w-md lg:max-w-lg ">
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 600px"
      />

      {/* Online Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-medium text-white">Online</span>
      </div>
    </div>
  );
}
