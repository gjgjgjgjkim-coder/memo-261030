import Link from "next/link";
import { Icon } from "./Icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  actionHref?: string;
};

export function CardHeader({ title, pin = false, actionHref }: CardHeaderProps) {
  return (
    <div className="flex h-10 items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && <Icon name="pin" className="size-4 text-primary" />}
      <h2 className="min-w-0 flex-1 text-label-md text-text-primary">{title}</h2>
      {actionHref && (
        <Link
          href={actionHref}
          className="flex items-center gap-space-4 text-caption-md whitespace-nowrap text-text-muted"
        >
          전체 보기
          <Icon name="chevron-right" className="size-4" />
        </Link>
      )}
    </div>
  );
}
