import Link from "next/link";
import { Icon } from "./Icon";

type ButtonPrimaryProps = {
  label: string;
  href?: string;
  icon?: boolean;
  onClick?: () => void;
};

const className =
  "flex h-14 w-full items-center justify-center gap-space-8 rounded-md bg-primary px-space-24 text-button-md text-text-on-primary";

export function ButtonPrimary({ label, href, icon = false, onClick }: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Icon name="plus" className="size-5" />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
