type IconName =
  | "plus"
  | "note"
  | "pin"
  | "pin-lg"
  | "chevron-right"
  | "chevron-left"
  | "share"
  | "more";

type IconProps = {
  name: IconName;
  className?: string;
};

// 아이콘 색은 글자색을 따른다: 원본 SVG를 마스크로 쓰고 currentColor로 칠한다.
export function Icon({ name, className = "" }: IconProps) {
  const url = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
