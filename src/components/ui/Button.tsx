import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium no-underline transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

// variant → class 매핑을 한 곳에서. 새 variant 는 여기만 고치면 됨.
const VARIANT: Record<Variant, string> = {
  primary: "bg-fill text-fg-onfill hover:bg-fill-hover",
  secondary: "border border-line text-fg hover:bg-bg-dim",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-6 text-body",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };
type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };

/** href 를 주면 <a>, 안 주면 <button> 으로 렌더. */
export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const cls = `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`;

  if ("href" in rest && typeof rest.href === "string") {
    return <a className={cls} {...(rest as ComponentPropsWithoutRef<"a">)} />;
  }
  return (
    <button
      type="button"
      className={cls}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    />
  );
}
