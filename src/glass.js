// The hero glass: murky "mistake" words get pushed out as clear words pour in.
// Words are physics bodies (Matter.js) drawn as DOM pills with a jelly wobble.
import Matter from "matter-js";
const { Engine, Bodies, Body, Composite } = Matter;

const BAD_WORDS = ["Boosted posts", "Random posting", "No clear offer", "Same ad for months", "No follow-up", "Generic ads", "Weak creative", "Low-quality leads", "Stock photos", "Guesswork", "Stale content", "No tracking", "DIY ads", "Cheap leads"];
const GOOD_WORDS = ["Clear offer", "Real people on camera", "Hooks that fit", "Fresh creative", "Calls & bookings", "Fast follow-up", "Focused growth", "Proof that sells", "Local buyers", "A real plan", "Ads that convert", "Booked calendar"];

// Stage geometry in px (must match the .glass box in index.html)
const W = 420, H = 600, CX = 210, L = 60, R = 360, RIM = 230, FLOOR = 570, G = 0.001;
const POUR_START = 1600, POUR_EVERY = 1000, HOLD = 6500;
// Collision groups: a clear word sinks *through* the murk (SINK), then turns solid (GOOD) and shoves it up and out.
const WALL = 1, BAD = 2, GOOD = 4, SINK = 8;

const stage = document.getElementById("glass");
const layer = stage.querySelector(".pills");
const caps = stage.parentElement.querySelectorAll(".g-cap");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function pill(text, kind) {
  const el = document.createElement("span");
  el.className = "pill " + kind;
  el.textContent = text;
  layer.appendChild(el);
  return el;
}

if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // No motion: show the finished glass, full of the clear words.
  stage.classList.add("static");
  GOOD_WORDS.slice(0, 8).forEach((t) => pill(t, "good"));
  setCaption(1);
} else {
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(start);
}

function setCaption(i) {
  caps.forEach((c, n) => c.classList.toggle("on", n === i));
}

function start() {
  let engine, items, t, poured, visible = false;

  function add(text, kind, x, y) {
    const el = pill(text, kind);
    const w = el.offsetWidth, h = el.offsetHeight;
    const body = Bodies.rectangle(x, y, w, h, {
      chamfer: { radius: h / 2 - 1 },
      restitution: 0.25, friction: 0.02, frictionAir: 0.012,
      density: kind === "good" ? 0.006 : 0.0015,
      angle: (Math.random() - 0.5) * 0.5,
      collisionFilter: kind === "good" ? { category: SINK, mask: WALL | GOOD | SINK } : { category: BAD, mask: WALL | BAD | GOOD },
    });
    const it = { el, body, kind, w, h, s: 0, sv: 0, pvx: 0, pvy: 0, leaving: false, dir: 0, sunk: 0 };
    items.push(it);
    Composite.add(engine.world, body);
    return it;
  }

  function build() {
    layer.textContent = "";
    engine = Engine.create();
    items = []; t = 0; poured = 0;
    const wall = { isStatic: true, friction: 0.02, collisionFilter: { category: WALL } };
    Composite.add(engine.world, [
      Bodies.rectangle(L - 6, (RIM + FLOOR) / 2, 12, FLOOR - RIM, wall),
      Bodies.rectangle(R + 6, (RIM + FLOOR) / 2, 12, FLOOR - RIM, wall),
      Bodies.rectangle(CX, FLOOR + 10, R - L + 24, 20, wall),
    ]);
    BAD_WORDS.forEach((txt, i) => add(txt, "bad", CX + (i % 2 ? 55 : -55) + (Math.random() - 0.5) * 30, FLOOR - 30 - i * 46));
    for (let i = 0; i < 260; i++) Engine.update(engine, 1000 / 60); // start already settled
    items.forEach((it) => { it.pvx = it.body.velocity.x; it.pvy = it.body.velocity.y; });
    setCaption(0);
    layer.style.opacity = 1;
  }

  function leave(it) {
    // A leaving murky word ghosts past the clear ones so it can never get stuck.
    it.leaving = true;
    it.dir = it.body.position.x < CX ? -1 : 1;
    it.body.collisionFilter.mask = WALL | BAD;
  }

  function step() {
    t += 1000 / 60;

    // Pour schedule
    const due = Math.floor((t - POUR_START) / POUR_EVERY) + 1;
    if (due > poured && poured < GOOD_WORDS.length) {
      add(GOOD_WORDS[poured], "good", CX + (Math.random() - 0.5) * 40, -30);
      poured++;
      if (poured === Math.ceil(GOOD_WORDS.length / 2)) setCaption(1);
    }

    // Forces
    const purge = t > POUR_START + GOOD_WORDS.length * POUR_EVERY + 1800; // whatever murk is left goes now
    for (const it of items) {
      const b = it.body, p = b.position, m = b.mass * G, off = Math.abs(p.x - CX);
      if (it.kind === "bad" && !it.leaving && poured > 0 && (p.y < RIM + 6 || purge)) leave(it);
      if (it.kind === "good" && !it.sunk && p.y > RIM) {
        // sinking through the murk like jelly: slow, then solid once it comes to rest
        b.frictionAir = 0.08;
        it.under = (it.under || 0) + 1;
        if ((it.under > 25 && b.speed < 0.7) || it.under > 110) {
          it.sunk = 1; b.frictionAir = 0.012;
          b.collisionFilter = { category: GOOD, mask: WALL | BAD | GOOD | SINK, group: 0 };
          // one in, one out: the murky word nearest the top heads for the rim
          const top = items.filter((o) => o.kind === "bad" && !o.leaving).sort((x, y) => x.body.position.y - y.body.position.y)[0];
          if (top) leave(top);
        }
      }
      if (it.leaving) {
        if (off < 195 && p.y > RIM - 40) Body.applyForce(b, p, { x: it.dir * m * 0.5, y: -m * 2.3 });      // float up out of the glass
        else if (off < 195) Body.applyForce(b, p, { x: it.dir * m * 1.6, y: -m * 1.0 });                    // drift over the rim
        else if (p.y < FLOOR) Body.applyForce(b, p, { x: it.dir * m * 0.35, y: 0 });                        // tip over and fall
      } else if (it.kind === "good" && p.y < RIM) {
        Body.applyForce(b, p, { x: (CX - p.x) * m * 0.03, y: 0 });                                          // keep the pour centred
      }
    }

    Engine.update(engine, 1000 / 60);

    // Draw, with a spring "jelly" squash driven by impacts
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i], b = it.body, p = b.position, v = b.velocity;
      const impact = Math.hypot(v.x - it.pvx, v.y - it.pvy);
      it.pvx = v.x; it.pvy = v.y;
      if (impact > 0.6) it.sv += Math.min(impact * 0.022, 0.2);
      it.sv += -0.2 * it.s - 0.12 * it.sv;
      it.s = clamp(it.s + it.sv, -0.22, 0.28);
      const outside = p.x < L || p.x > R;
      // spilled words fade as they fall, and before they can drift over the page copy
      const edge = Math.max(0, it.w / 2 - p.x, p.x + it.w / 2 - W);
      it.el.style.opacity = outside ? Math.min(clamp(1 - (p.y - 380) / 200, 0, 1), clamp(1 - edge / 70, 0, 1)) : 1;
      it.el.style.transform = `translate(${p.x - it.w / 2}px,${p.y - it.h / 2}px) rotate(${b.angle}rad) scale(${1 + it.s},${1 - it.s * 0.8})`;
      if (p.y > H + 80 || p.x < -260 || p.x > W + 260) {
        Composite.remove(engine.world, b);
        it.el.remove();
        items.splice(i, 1);
      }
    }

    // Loop
    const end = POUR_START + GOOD_WORDS.length * POUR_EVERY + HOLD;
    if (t > end) layer.style.opacity = 0;
    if (t > end + 700) build();
  }

  build();
  step();
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.15 }).observe(stage);
  let last = performance.now(), acc = 0;
  (function frame(now) {
    // fixed 60Hz steps whatever the screen refresh rate
    acc = Math.min(acc + (now - last), 50); last = now;
    for (; acc >= 1000 / 60; acc -= 1000 / 60) if (visible && !document.hidden) step();
    requestAnimationFrame(frame);
  })(last);
}
