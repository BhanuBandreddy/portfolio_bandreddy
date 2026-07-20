import Link from "next/link";

export function Header() {
  return <header className="site-header">
    <Link href="/" className="brand">BH<span>↗</span></Link>
    <nav aria-label="Primary navigation">
      <Link href="/work">Work</Link><Link href="/approach">Approach</Link><Link href="/about">About</Link>
    </nav>
    <a className="header-contact" href="mailto:hareesh.b3@gmail.com">Start a conversation</a>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div><span className="kicker">CHENNAI · ENTERPRISE TRANSFORMATION ACROSS GLOBAL MARKETS</span><h2>Need product strategy,<br/>solution architecture or an <em>AI transformation roadmap?</em></h2></div>
    <a className="footer-cta" href="mailto:hareesh.b3@gmail.com">hareesh.b3@gmail.com <span>↗</span></a>
    <div className="footer-meta"><span>Bhanu Harish Bandreddy</span><span>VP · Product Innovation & AI Solutions</span><a href="https://linkedin.com/in/bhanu-h-bandreddy-32251572">LinkedIn ↗</a><span>© 2026</span></div>
  </footer>;
}

export function PageShell({children}:{children:React.ReactNode}) { return <><Header/><main>{children}</main><Footer/></>; }

export function ArrowLink({href,children}:{href:string;children:React.ReactNode}) { return <Link className="arrow-link" href={href}>{children}<span>↗</span></Link>; }
