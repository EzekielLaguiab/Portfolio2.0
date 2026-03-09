// Theme toggle
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("toggleIcon");
let isLight = false;

// Respect system preference on load
if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  isLight = true;
  document.body.classList.add("light");
  icon.textContent = "🌙";
}

toggle.addEventListener("click", () => {
  isLight = !isLight;
  document.body.classList.toggle("light", isLight);
  icon.textContent = isLight ? "🌙" : "☀️";
});

// Cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Update stats placeholders — animate numbers
// Animate stats numbers
document.querySelectorAll(".stat-num").forEach((el) => {
  const full = el.innerHTML;
  const num = parseInt(full);
  const suffix = full.replace(/[0-9]/g, "");
  let count = 0;

  const update = () => {
    count += Math.ceil(num / 40);

    if (count >= num) {
      el.innerHTML = num + suffix;
    } else {
      el.innerHTML = count + suffix;
      requestAnimationFrame(update);
    }
  };

  update();
});
