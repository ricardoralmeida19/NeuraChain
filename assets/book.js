/* Discovery-call request form.
 * Every "Book a discovery call" link (the mailto links, or any link to #book) opens this form.
 *
 * Where submissions go:
 *  - If FORM_ENDPOINT is set (e.g. a Formspree or Web3Forms URL), the form is sent there and the
 *    visitor sees a confirmation. Nothing else to change.
 *  - If it is empty, submitting opens the visitor's email app with every answer already filled in,
 *    addressed to EMAIL. Visitors can also skip the form and email directly.
 */
(() => {
  const FORM_ENDPOINT = "";            // e.g. "https://formspree.io/f/xxxxxxxx"
  const EMAIL = "ricardo.almeida@neurachainsolutions.com";
  const CAL_URL = "https://calendly.com/ricardo-almeida-neurachainsolutions/30min";   // Calendly booking page ("" hides the calendar buttons)
  const me = document.currentScript;
  const BASE = (me && me.dataset.base) || "";          // path to site root from this page
  const SERVICES = ["Strategic sourcing & supply chain", "LEAN process optimization", "Engineering & value", "Smart Factory (IoT)", "NeuraChain AI platform", "Not sure yet"];

  const html = `
<div class="bk-ov" id="bk-ov" hidden>
  <div class="bk" role="dialog" aria-modal="true" aria-labelledby="bk-t">
    <button class="bk-x" type="button" aria-label="Close">×</button>
    <div class="bk-h">
      <div class="bk-k">Free · 90 minutes · no commitment</div>
      <h2 id="bk-t">Book a discovery call</h2>
      <p>Tell us a little about your operation so the call is useful from the first minute. On site or remote, anywhere in the U.S.</p>
      ${CAL_URL ? `<ol class="bk-steps"><li class="on"><b>1</b>Your details</li><li><b>2</b>Pick a time</li></ol>` : ""}
    </div>
    <form novalidate>
      <div class="f"><label for="bk-name">Full name <i>*</i></label><input id="bk-name" name="name" type="text" autocomplete="name" required></div>
      <div class="f"><label for="bk-email">Work email <i>*</i></label><input id="bk-email" name="email" type="email" autocomplete="email" required></div>
      <div class="f"><label for="bk-co">Company <i>*</i></label><input id="bk-co" name="company" type="text" autocomplete="organization" required></div>
      <div class="f"><label for="bk-role">Your role <i>*</i></label><input id="bk-role" name="role" type="text" autocomplete="organization-title" required></div>
      <div class="f"><label for="bk-ph">Phone <i>*</i></label><input id="bk-ph" name="phone" type="tel" autocomplete="tel" required></div>
      <div class="f"><label for="bk-ind">Industry <i>*</i></label><select id="bk-ind" name="industry" required><option value="">Select…</option><option>Manufacturing</option><option>Electric utility</option><option>Water utility</option><option>Infrastructure / construction</option><option>Data center</option><option>Other</option></select></div>
      <div class="f"><label for="bk-size">Company size <i>*</i></label><select id="bk-size" name="size" required><option value="">Select…</option><option>1–9 people</option><option>10–75 people</option><option>76–250 people</option><option>251–500 people</option><option>500+ people</option></select></div>
      <div class="f"><label for="bk-st">State <i>*</i></label><input id="bk-st" name="state" type="text" autocomplete="address-level1" placeholder="e.g. California" required></div>
      <fieldset id="bk-svc"><legend>What would you like to talk about? <i>*</i></legend><div class="chips">${SERVICES.map((s,i)=>`<label><input type="checkbox" name="services" value="${s}">${s}</label>`).join("")}</div></fieldset>
      <div class="f w"><label for="bk-msg">Your biggest operational challenge right now <i>*</i></label><textarea id="bk-msg" name="message" required placeholder="e.g. supplier costs rising, long lead times on switchgear, too much WIP…"></textarea></div>
      ${CAL_URL ? "" : `<div class="f w"><label for="bk-when">Best days and times for a call</label><input id="bk-when" name="availability" type="text" placeholder="e.g. Tue or Thu mornings, Pacific time"></div>`}
      <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
      <label class="consent"><input type="checkbox" name="consent" required><span>I agree that NeuraChain Solutions may use these details to contact me about my request, as described in the <a href="${BASE}privacy.html" target="_blank" rel="noopener">Privacy Policy</a>. <i style="color:#ffb547;font-style:normal">*</i></span></label>
      <p class="err" role="alert"></p>
      <div class="acts">
        <button class="go" type="submit">${CAL_URL ? "Continue to pick a time →" : "Request my discovery call"}</button>
        <span class="alt">Prefer email? Write to <a href="mailto:${EMAIL}?subject=Discovery%20call%20request">${EMAIL}</a></span>
      </div>
    </form>
    <div class="bk-done" hidden>
      <div class="ok" aria-hidden="true">✓</div>
      <h3 tabindex="-1">${CAL_URL ? "Thanks! One more step." : "Thanks, we've got it."}</h3>
      <p class="msg"></p>
      ${CAL_URL ? `<a class="go bk-now" href="${CAL_URL}" target="_blank" rel="noopener">Pick a time on the calendar →</a>` : ""}
    </div>
  </div>
</div>`;

  let ov, dlg, form, err, done, lastFocus;
  function mount(){
    if (ov) return;
    document.body.insertAdjacentHTML("beforeend", html);
    ov = document.getElementById("bk-ov"); dlg = ov.querySelector(".bk"); form = ov.querySelector("form");
    err = ov.querySelector(".err"); done = ov.querySelector(".bk-done");
    ov.querySelector(".bk-x").addEventListener("click", close);
    ov.addEventListener("mousedown", e => { if (e.target === ov) close(); });
    ov.addEventListener("keydown", e => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const f = [...dlg.querySelectorAll("a[href],button,input:not([tabindex='-1']),select,textarea,[tabindex='0']")].filter(x => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); f[f.length-1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length-1]){ e.preventDefault(); f[0].focus(); }
    });
    form.addEventListener("submit", submit);
  }
  function open(){
    mount(); lastFocus = document.activeElement;
    form.hidden = false; done.hidden = true; err.textContent = "";
    ov.querySelectorAll(".bk-steps li").forEach((l,i) => { l.classList.toggle("on", i===0); l.classList.remove("ok"); });
    ov.hidden = false; document.documentElement.classList.add("bk-lock");
    requestAnimationFrame(() => ov.classList.add("on"));
    setTimeout(() => form.querySelector("input").focus(), 60);
  }
  function close(){
    if (!ov || ov.hidden) return;
    ov.classList.remove("on"); document.documentElement.classList.remove("bk-lock");
    setTimeout(() => { ov.hidden = true; }, 180);
    if (location.hash === "#book") history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function data(){
    const fd = new FormData(form), o = {};
    for (const [k,v] of fd.entries()){ if (k === "services") (o.services = o.services || []).push(v); else o[k] = String(v).trim(); }
    o.services = (o.services || []).join(", ");
    return o;
  }
  function validate(){
    let bad = null;
    form.querySelectorAll("[required]").forEach(i => {
      const ok = i.type === "checkbox" ? i.checked : i.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.trim()) : i.value.trim() !== "";
      i.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !bad) bad = i;
    });
    const svc = form.querySelector("#bk-svc"), svcOk = !!form.querySelector("[name=services]:checked");
    svc.classList.toggle("bad", !svcOk);
    if (!svcOk && (!bad || bad.name === "consent")){ err.textContent = "Please choose at least one topic you'd like to talk about."; svc.querySelector("input").focus(); return false; }
    if (bad){
      err.textContent = bad.type === "checkbox" ? "Please tick the consent box so we can contact you." : bad.type === "email" ? "Please enter a valid email address." : "Please fill in all the fields marked *.";
      bad.focus(); return false;
    }
    err.textContent = ""; return true;
  }
  function mailBody(o){
    const L = [["Name",o.name],["Email",o.email],["Company",o.company],["Role",o.role],["Phone",o.phone],["Industry",o.industry],["Company size",o.size],["State",o.state],["Interested in",o.services],["Biggest challenge",o.message],["Best times",o.availability]];
    return L.filter(x => x[1]).map(x => `${x[0]}: ${x[1]}`).join("\n");
  }
  function showDone(msg, o){
    form.hidden = true; done.hidden = false; done.querySelector(".msg").innerHTML = msg;
    const now = done.querySelector(".bk-now");
    if (now && o){ const u = new URL(CAL_URL); u.searchParams.set("name", o.name); u.searchParams.set("email", o.email); u.searchParams.set("a1", [o.company, o.services].filter(Boolean).join(" · ")); now.href = u.toString(); }
    const st = ov.querySelectorAll(".bk-steps li"); if (st.length){ st[0].classList.remove("on"); st[0].classList.add("ok"); st[1].classList.add("on"); }
    done.querySelector("h3").focus();
  }
  async function submit(e){
    e.preventDefault();
    if (form.querySelector("[name=_gotcha]").value) return;   // bot
    if (!validate()) return;
    const o = data(), btn = form.querySelector(".go");
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Discovery call request: " + o.company)}&body=${encodeURIComponent(mailBody(o))}`;
    if (FORM_ENDPOINT){
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch(FORM_ENDPOINT, {method:"POST", headers:{"Accept":"application/json","Content-Type":"application/json"}, body: JSON.stringify({...o, _subject:"Discovery call request: " + o.company})});
        if (!r.ok) throw new Error(r.status);
        showDone(CAL_URL ? `Step 2: choose a time that works for you. Your name and email are already filled in.` : `We'll reply to <b>${o.email.replace(/</g,"&lt;")}</b> within one business day to set a time.`, o);
      } catch (x){
        err.innerHTML = `Something went wrong sending the form. You can <a href="${mailto}">send it by email instead</a>.`;
      } finally { btn.disabled = false; btn.textContent = "Request my discovery call"; }
      return;
    }
    location.href = mailto;
    showDone(CAL_URL ? `Your email app should open with your answers filled in. Press <b>Send</b>, then <b>step 2:</b> choose a time on the calendar below. Your name and email are already filled in.` : `Your email app should open with your answers filled in. Just press <b>Send</b>. If nothing opened, email us at <a href="mailto:${EMAIL}">${EMAIL}</a>.`, o);
  }

  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="mailto:"][href*="Discovery%20call"], a[href="#book"], a[href$="#book"], .js-book');
    if (!a || (ov && ov.contains(a))) return;
    e.preventDefault(); open();
  });
  if (location.hash === "#book") addEventListener("load", open);
})();
