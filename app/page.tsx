import ServiceTabs from "@/components/ServiceTabs";
import Estimator from "@/components/Estimator";
import { AssessmentForm, WaitlistForm } from "@/components/Forms";
import {
  CONTACT,
  CREDENTIALS,
  INDUSTRIES,
  PRINCIPLES,
  ROUTING,
  SHOP_TYPES,
} from "@/components/content";

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="NeuraChain Solutions, home">
      <svg viewBox="0 0 32 20" width="32" height="20" aria-hidden="true">
        <rect x="1.2" y="1.2" width="13" height="17.6" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <rect x="17.8" y="0" width="14.2" height="20" rx="2.6" className="logo-fill" />
      </svg>
      <span>
        NeuraChain<span className="logo-sub"> Solutions</span>
      </span>
    </a>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  return (
    <>
      <header className="site-header" id="top">
        <div className="wrap header-row">
          <Logo />
          <nav aria-label="Main">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#estimate">Savings estimate</a>
            <a href="#about">About</a>
          </nav>
          <a className="btn btn-solid btn-small" href="#assessment">
            Book a free assessment
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1>Lower costs on the factory floor you already have.</h1>
              <p className="lede">
                NeuraChain helps California machine shops, forging operations and assembly plants
                with 10 to 500 people pay less for parts, remove waste from the floor, and see what
                their machines are doing. The work is led by a supply chain manager who spent six
                years at Tesla across the Gigafactory network.
              </p>
              <div className="hero-actions">
                <a className="btn btn-solid" href="#assessment">
                  Book a free assessment
                </a>
                <a className="btn btn-line" href="#services">
                  See the services
                </a>
              </div>
            </div>

            <figure className="traveler" aria-labelledby="traveler-cap">
              <div className="traveler-head">
                <div>
                  <span className="th-k">Traveler</span>
                  <span className="th-v">Your engagement</span>
                </div>
                <div>
                  <span className="th-k">Customer</span>
                  <span className="th-v">Your shop</span>
                </div>
                <div>
                  <span className="th-k">Rev</span>
                  <span className="th-v">A</span>
                </div>
              </div>
              <table className="routing">
                <caption id="traveler-cap">How an engagement runs, one operation at a time</caption>
                <thead>
                  <tr>
                    <th scope="col">Op</th>
                    <th scope="col">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTING.map((r, i) => (
                    <tr key={r.op} style={{ ["--i" as string]: i }} className={r.op === "50" ? "future" : undefined}>
                      <td className="op">{r.op}</td>
                      <td>
                        <strong>{r.name}</strong>
                        <span>{r.detail}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stamp" aria-hidden="true">
                Op 10<br />is free
              </div>
            </figure>
          </div>
        </section>

        {/* Credentials */}
        <section className="creds" aria-labelledby="creds-h">
          <div className="wrap">
            <h2 id="creds-h" className="creds-h">
              Where the playbook comes from
            </h2>
            <dl className="creds-list">
              {CREDENTIALS.map((c) => (
                <div key={c.key}>
                  <dt>{c.key}</dt>
                  <dd>{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Services */}
        <section className="section" id="services" aria-labelledby="services-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="services-h">Four services. Use one, or run them in order.</h2>
              <p>
                Each one works on its own. Run together, the savings from sourcing pay for the floor
                and machine work that follows.
              </p>
            </div>
            <ServiceTabs />
          </div>
        </section>

        {/* Industries */}
        <section className="section section-alt" id="industries" aria-labelledby="ind-h">
          <div className="wrap ind-grid">
            <div className="section-head">
              <h2 id="ind-h">Built for shops that make physical parts</h2>
              <p>We work with manufacturers between 10 and 500 employees, starting in California.</p>
              <ul className="shoptypes">
                {SHOP_TYPES.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <ul className="ind-list">
              {INDUSTRIES.map((i) => (
                <li key={i.name}>
                  <h3>{i.name}</h3>
                  <p>{i.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Estimator */}
        <section className="section" id="estimate" aria-labelledby="est-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="est-h">Run your own numbers</h2>
              <p>
                Put in your spend and your own assumptions. The math is shown, so you can check it.
              </p>
            </div>
            <Estimator />
          </div>
        </section>

        {/* Principles */}
        <section className="section section-alt" aria-labelledby="pr-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="pr-h">How we work with you</h2>
            </div>
            <ul className="principles">
              {PRINCIPLES.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Platform */}
        <section className="section platform" aria-labelledby="plat-h">
          <div className="wrap plat-grid">
            <div>
              <h2 id="plat-h">The NeuraChain platform is in development</h2>
              <p>
                We're building software that pulls your ERP, machine and supplier data into one
                place: should-cost models for negotiations, supplier rankings, and production
                schedules that account for machine time and supplier lead times.
              </p>
              <p>
                It's being built from real client engagements, not in a vacuum. Join the list to
                hear when the beta opens.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        {/* About */}
        <section className="section section-alt" id="about" aria-labelledby="about-h">
          <div className="wrap about-grid">
            <div className="portrait" aria-hidden="true">
              <span>RA</span>
            </div>
            <div className="about-copy">
              <h2 id="about-h">Ricardo Almeida, founder</h2>
              <p>
                Ricardo has spent more than 15 years in strategic sourcing and supply chain. At
                Tesla he was a Global Supply Manager and then Supply Chain Manager for capital
                equipment, working with suppliers and factory teams across the Gigafactory network.
                Before that he led procurement for the Rio 2016 Olympic Organizing Committee and
                held sourcing roles at Enel Green Power, Restaurant Brands International and Webb
                Supply Chain Consulting.
              </p>
              <p>
                He started NeuraChain because small manufacturers face the same supplier, cost and
                capacity problems large ones do, with far fewer people to solve them. He holds an
                M.S. in Global Supply Chain Management from USC, is VP of Programs for the CSCMP San
                Francisco Roundtable, and works in English, Spanish and Portuguese, on the shop
                floor and with suppliers.
              </p>
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section className="section assess" id="assessment" aria-labelledby="as-h">
          <div className="wrap assess-grid">
            <div className="section-head">
              <h2 id="as-h">Book a free assessment</h2>
              <p>
                We'll visit your shop, review your spend and supplier data, and walk the floor. You
                get a written list of savings opportunities, ranked by size and effort. It's yours to
                keep whether or not we work together.
              </p>
              <p className="assess-direct">
                Prefer email? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
            </div>
            <AssessmentForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <Logo />
            <p className="foot-note">Operations consulting for small and mid-size manufacturers.</p>
          </div>
          <address>
            {CONTACT.addressLines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <div className="foot-contact">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
        <div className="wrap foot-legal">© {year} NeuraChain Solutions, LLC</div>
      </footer>
    </>
  );
}
