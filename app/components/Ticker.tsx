const ITEMS = [
  "OPEN TO SELECT PRODUCT & ADVISORY ENGAGEMENTS",
  "15+ YEARS ENTERPRISE DELIVERY",
  "PRODUCT · SOLUTION ARCHITECTURE · APPLIED AI",
  "5 LIVE CRM MARKETS · AFRICA & ASIA",
  "CHENNAI — WORKING GLOBALLY",
];

export function Ticker() {
  const run = (key: string) =>
    ITEMS.map((t, i) => (
      <span className={`tick tick-${i % 5}`} key={`${key}-${i}`}>
        {t}
        <b aria-hidden="true">◆</b>
      </span>
    ));
  return (
    <div className="ticker" aria-label="Announcements">
      <div className="ticker-track">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
