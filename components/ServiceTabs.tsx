"use client";

import { useRef, useState } from "react";
import { SERVICES } from "./content";

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % SERVICES.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + SERVICES.length) % SERVICES.length;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const s = SERVICES[active];

  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="Services">
        {SERVICES.map((svc, i) => (
          <button
            key={svc.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${svc.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${svc.id}`}
            tabIndex={i === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {svc.tab}
          </button>
        ))}
      </div>
      <div
        className="tabpanel"
        role="tabpanel"
        id={`panel-${s.id}`}
        aria-labelledby={`tab-${s.id}`}
        key={s.id}
      >
        <div className="tabpanel-main">
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
          <p className="starts">
            <span>Where it usually starts:</span> {s.startsWith}
          </p>
        </div>
        <ul className="worklist">
          {s.work.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
