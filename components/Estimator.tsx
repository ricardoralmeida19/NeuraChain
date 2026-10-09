"use client";

import { useId, useState } from "react";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function parseMoney(v: string) {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function Estimator() {
  const id = useId();
  const [spendText, setSpendText] = useState("5,000,000");
  const [addressable, setAddressable] = useState(40);
  const [rate, setRate] = useState(5);

  const spend = parseMoney(spendText);
  const inScope = spend * (addressable / 100);
  const savings = inScope * (rate / 100);

  return (
    <div className="estimator">
      <div className="est-inputs">
        <label htmlFor={`${id}-spend`}>Annual spend on parts, material and outside services</label>
        <div className="money">
          <span aria-hidden="true">$</span>
          <input
            id={`${id}-spend`}
            inputMode="numeric"
            value={spendText}
            onChange={(e) => setSpendText(e.target.value)}
            onBlur={() => setSpendText(spend ? spend.toLocaleString("en-US") : "")}
          />
        </div>

        <label htmlFor={`${id}-addr`}>
          Share of that spend you'd be willing to re-quote or renegotiate
          <output htmlFor={`${id}-addr`}>{addressable}%</output>
        </label>
        <input
          id={`${id}-addr`}
          type="range"
          min={5}
          max={100}
          step={5}
          value={addressable}
          onChange={(e) => setAddressable(Number(e.target.value))}
        />

        <label htmlFor={`${id}-rate`}>
          Savings rate you'd expect on that share
          <output htmlFor={`${id}-rate`}>{rate}%</output>
        </label>
        <input
          id={`${id}-rate`}
          type="range"
          min={1}
          max={15}
          step={1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>

      <div className="est-result" aria-live="polite">
        <p className="est-label">Estimated savings per year</p>
        <p className="est-value">{usd.format(savings)}</p>
        <dl className="est-math">
          <div>
            <dt>Spend in scope</dt>
            <dd>{usd.format(inScope)}</dd>
          </div>
          <div>
            <dt>Savings rate</dt>
            <dd>{rate}%</dd>
          </div>
        </dl>
        <p className="est-note">
          This is arithmetic on your own numbers, not a quote. The free assessment replaces your
          guesses with your actual parts, prices and suppliers.
        </p>
        <a className="btn btn-solid" href="#assessment">
          Book a free assessment
        </a>
      </div>
    </div>
  );
}
