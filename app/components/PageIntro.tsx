import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children ? <div className="page-copy">{children}</div> : null}
    </div>
  );
}
