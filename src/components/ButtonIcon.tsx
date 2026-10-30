import Link from "next/link";
import { Icon } from "./Icon";

type ButtonIconProps = {
  icon: "chevron-left" | "pin-lg" | "share" | "more";
  label: string;
  href?: string;
};

const className =
  "flex size-10 items-center justify-center rounded-sm text-text-primary";

// 40×40 누르는 영역 가운데에 24px 아이콘
export function ButtonIcon({ icon, label, href }: ButtonIconProps) {
  const content = <Icon name={icon} className="size-6" />;

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} className={className}>
      {content}
    </button>
  );
}
