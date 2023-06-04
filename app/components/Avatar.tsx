'use client';
import Image from "next/image";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
        className="rounded-full"
        width={32}
        height={32}
        alt="avatar"
        src={ src ? src : '/images/avatar.png'}
    />
  )
}

export default Avatar