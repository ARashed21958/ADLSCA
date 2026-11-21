// ADLSCA site: chart + timeline. Numbers are copied exactly from the ADLSCA v4.9.3 Report (PDF).

// ---------- Held-out results, seeds 8000-8015 (Section 4 of the v4.9.3 report) ----------
const ARMS = [
  { name: "Oracle",              color: "#9aa5b5" },
  { name: "v4.6 snapshots",      color: "#c3cad4" },
  { name: "v4.9.2 adapter",      color: "#6f7c90" },
  { name: "Final bank (v4.9.3)", color: "#1f4e8c" },
];
const METRICS = [
  { name: "Overall",                       short: "Overall",      values: ["0.834", "0.833", "0.697", "0.638"] },
  { name: "After return (first 30 steps)", short: "After return", values: ["0.361", "0.411", "0.667", "0.440"] },
  { name: "First visits",                  short: "First visits", values: ["0.997", "0.988", "1.075", "0.997"] },
  { name: "Novel D",                       short: "Novel D",      values: ["1.483", "1.308", "1.149", "0.924"] },
  { name: "D on return",                   short: "D on return",  values: ["0.410", "0.404", "0.786", "0.437"] },
];

// ---------- Timeline (newest first) ----------
// "pdf: null" shows "Report coming soon". Add a path such as "reports/ADLSCA_v4.6_Report.pdf" when a rewritten report is ready.
const TIMELINE = [
  {
    version: "v5",
    title: "Next stage: connecting the memory to a language model",
    tag: "Planned", kind: "planned",
    summary: "Package v5.0 rebuilds the same bank as one PyTorch module and reproduces the v4.9.3 results exactly. It also adds options for late and sparse labels. The next step, connecting the memory to a language model, is planned and has not been tested.",
    numbers: [
      "Labels 5 steps late: overall ratio 0.641 (better on 16 of 16 seeds)",
      "Labels on only 30% of steps: overall ratio 0.667 (better on 16 of 16 seeds)",
      "Language model connection: not tested yet",
    ],
    pdf: null,
  },
  {
    version: "v4.9.3",
    title: "Final memory design: the keyed memory bank",
    tag: "Final design", kind: "final",
    summary: "A plain keyed memory bank. Each slot stores a key and a copy of the output head. Slots with keys close to the current input get more say in the prediction, and the slots that were used learn a little after the answer is revealed. Every add-on I tried on top of it tied or lost.",
    numbers: [
      "Overall: 0.638 of the baseline (held-out seeds 8000-8015, better on 16 of 16)",
      "After return (first 30 steps): 0.440",
      "Novel group D: 0.924",
    ],
    pdf: "reports/ADLSCA_v4.9.3_Report.pdf",
  },
  {
    version: "v4.8 – v4.9.2",
    title: "From saved snapshots to key-value slots",
    tag: "Report",
    summary: "[Placeholder: a short summary in your own words.] These versions replaced saved network snapshots with key-value memory slots, plus a class prior and a counterfactual gate. Later testing showed the prior and the gate hurt, so they were removed in v4.9.3.",
    numbers: [
      "v4.9.2 adapter in the v4.9.3 held-out comparison: 0.697 overall, 0.667 after return",
    ],
    pdf: null,
  },
  {
    version: "v4.6",
    title: "Snapshot restoring",
    tag: "Report",
    summary: "[Placeholder: a short summary in your own words.] v4.6 saved and restored snapshots of the network's top layers when an old situation returned. It recovers quickly after a return, but it forces old weights back into the network.",
    numbers: [
      "v4.6 snapshots in the v4.9.3 held-out comparison: 0.833 overall, 0.411 after return",
    ],
    pdf: null,
  },
  {
    version: "v1.0 – v4.6",
    title: "Comprehensive research paper",
    tag: "Report",
    summary: "[Placeholder: a short summary in your own words of the paper that covers v1.0 to v4.6.]",
    numbers: [],
    pdf: null,
  },
  {
    version: "v2.2",
    title: "Technical report",
    tag: "Report",
    summary: "[Placeholder: a short summary in your own words.]",
    numbers: [],
    pdf: null,
  },
  {
    version: "v1.1",
    title: "NN2 Handshake",
    tag: "Report",
    summary: "[Placeholder: a short summary in your own words.]",
    numbers: [],
    pdf: null,
  },
  {
    version: "v1.0",
    title: "The first memory system",
    tag: "Start",
    summary: "Version 1.0 was my system built fully on my own math. It compared the network's prediction with the true answer, and used that gap as a surprise signal to decide when to save a memory. When an old situation came back, it restored the matching memory. It worked on four tiny curve tasks across ten seeds, even though the test was very small.",
    numbers: ["All tasks improved in all four task orders, across 10 seeds"],
    pdf: "reports/ADLSCA_v1.0_Report.pdf",
  },
];

// ---------- Chart ----------
function buildChart() {
  const host = document.getElementById("chart");
  const tip = document.getElementById("tooltip");
  const card = host.closest(".card");
  const legend = document.getElementById("legend");
  const NS = "http://www.w3.org/2000/svg";

  legend.innerHTML = ARMS.map(a => `<span><i style="background:${a.color}"></i>${a.name}</span>`).join("");

  const W = 900, H = 340, L = 44, R = 12, T = 16, B = 40;
  const pw = W - L - R, ph = H - T - B, yMax = 1.6;
  const y = v => T + ph - (v / yMax) * ph;

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const el = (tag, attrs, text) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    svg.appendChild(n);
    return n;
  };

  [0, 0.4, 0.8, 1.2, 1.6].forEach(t => {
    el("line", { x1: L, x2: W - R, y1: y(t), y2: y(t), stroke: "#e3e8ef" });
    el("text", { x: L - 8, y: y(t) + 4, "font-size": 12, fill: "#5a6678", "text-anchor": "end" }, t.toFixed(1));
  });

  const gw = pw / METRICS.length, bw = Math.min(30, (gw * 0.78) / ARMS.length);
  const bars = [];
  METRICS.forEach((m, gi) => {
    const cx = L + gw * (gi + 0.5), x0 = cx - (bw * ARMS.length) / 2;
    m.values.forEach((txt, ai) => {
      const v = parseFloat(txt);
      const r = el("rect", {
        class: "bar", x: x0 + ai * bw, y: y(v), width: bw - 3, height: y(0) - y(v),
        fill: ARMS[ai].color, rx: 2, tabindex: 0,
        "aria-label": `${m.name}, ${ARMS[ai].name}: ${txt}`,
      });
      r.dataset.metric = m.name; r.dataset.arm = ARMS[ai].name; r.dataset.value = txt;
      bars.push(r);
    });
    el("text", { x: cx, y: H - B + 22, "font-size": 13.5, fill: "#16202c", "text-anchor": "middle" }, m.short);
  });

  el("line", { x1: L, x2: W - R, y1: y(1), y2: y(1), stroke: "#c0392b", "stroke-dasharray": "5 4", "stroke-width": 1.4 });
  el("text", { x: W - R, y: y(1) - 6, "font-size": 12, fill: "#c0392b", "text-anchor": "end" }, "baseline = 1.0");
  el("line", { x1: L, x2: W - R, y1: y(0), y2: y(0), stroke: "#8793a5" });
  host.appendChild(svg);

  const show = r => {
    bars.forEach(b => b.classList.toggle("active", b === r));
    host.classList.add("hovering");
    tip.innerHTML = `${r.dataset.metric}<br>${r.dataset.arm}: <b>${r.dataset.value}</b>`;
    tip.hidden = false;
    const rb = r.getBoundingClientRect(), cb = card.getBoundingClientRect();
    tip.style.left = (rb.left - cb.left + rb.width / 2) + "px";
    tip.style.top = (rb.top - cb.top - 8) + "px";
  };
  const hide = () => { host.classList.remove("hovering"); bars.forEach(b => b.classList.remove("active")); tip.hidden = true; };

  bars.forEach(r => {
    r.addEventListener("mouseenter", () => show(r));
    r.addEventListener("focus", () => show(r));
    r.addEventListener("click", e => { e.stopPropagation(); show(r); });
  });
  svg.addEventListener("mouseleave", hide);
  document.addEventListener("click", hide);

  // Table version of the same numbers
  document.getElementById("heldout-table").innerHTML = METRICS.map(m =>
    `<tr><td>${m.name}</td>${m.values.map((v, i) => `<td>${i === 3 ? `<strong>${v}</strong>` : v}</td>`).join("")}</tr>`
  ).join("");
}

// ---------- Timeline ----------
function buildTimeline() {
  const list = document.getElementById("timeline-list");
  list.innerHTML = TIMELINE.map((t, i) => {
    const nums = t.numbers.length ? `<ul>${t.numbers.map(n => `<li>${n}</li>`).join("")}</ul>` : "";
    const links = t.pdf
      ? `<div class="pdf-actions"><a class="btn primary" href="${t.pdf}" target="_blank" rel="noopener">Read</a><a class="btn" href="${t.pdf}" download>Download PDF</a></div>`
      : `<p class="small muted">${t.kind === "planned" ? "No report yet." : "Report coming soon."}</p>`;
    return `<li class="tl-item ${t.kind || ""}">
      <button class="tl-head" aria-expanded="false" aria-controls="tl-${i}">
        <span class="tl-version">${t.version}</span>
        <span class="tl-title">${t.title}</span>
        <span class="tl-tag ${t.kind || ""}">${t.tag}</span>
        <span class="tl-chev" aria-hidden="true">›</span>
      </button>
      <div class="tl-body" id="tl-${i}"><p>${t.summary}</p>${nums}${links}</div>
    </li>`;
  }).join("");

  list.querySelectorAll(".tl-head").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  });
  // Open the final design by default
  const finalBtn = list.querySelector(".tl-item.final .tl-head");
  if (finalBtn) finalBtn.click();
}

buildChart();
buildTimeline();
