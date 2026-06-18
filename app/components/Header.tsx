import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" data-cursor>
        pr15ha
      </Link>
    </header>
  );
}
