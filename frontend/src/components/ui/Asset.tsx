type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function Asset({ src, alt = "", width, height, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
