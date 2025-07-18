import Image from "next/image";

interface ImageCardWithBgProps {
    src: string;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    width: number;
    height?: number;
    borderRadius: number;
    alt?: string;
}

const ImageCardWithBg = ({
    src,
    left,
    right,
    top,
    bottom,
    width,
    height,
    borderRadius,
    alt
}: ImageCardWithBgProps) => {
    return (
        <div 
            className="absolute z-20"
            style={{
                left: left ? `${left}%` : undefined,
                right: right ? `${right}%` : undefined,
                top: top ? `${top}%` : undefined,
                bottom: bottom ? `${bottom}%` : undefined,
                width: `${width}%`,
                height: height ? `${height}%` : undefined,
                aspectRatio: 100 / 129,
                borderRadius: `${borderRadius}px`,
            }}
        >
            <Image
                src={src}
                fill={true}
                alt={alt ?? "image card"}
            />
        </div>
    );
}

export default ImageCardWithBg;