// ---------- 1. CERTIFICATIONS DATA ----------
// Add your courses here later, in this exact format:
// { title: "Course name", platform: "Platform name", date: "Month Year" },
const certifications = [
  // Example format (remove the // to use):
  // { title: "Data Analysis with Python", platform: "Coursera", date: "June 2025" },
];

const certGrid = document.getElementById("certGrid");
const certSection = document.getElementById("certifications");
const navCerts = document.getElementById("navCerts");

if (certifications.length === 0) {
  certSection.style.display = "none";
  navCerts.style.display = "none";
} else {
  certifications.forEach(function (c) {
    const div = document.createElement("div");
    div.className = "cert reveal";
    div.innerHTML = "<h3>" + c.title + "</h3><p>" + c.platform + "</p><p>Issued: " + c.date + "</p>";
    certGrid.appendChild(div);
  });
}

// ---------- 2. TYPING EFFECT ----------
const roles = ["Aspiring AI Engineer", "Python Developer", "Data Enthusiast", "Lifelong Learner"];
const typed = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting && charIndex === word.length) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// ---------- 3. THEME TOGGLE (light / dark) ----------
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  themeBtn.textContent = mode === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", mode); } catch (e) {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("theme") || "light"; } catch (e) {}
setTheme(savedTheme);

themeBtn.addEventListener("click", function () {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ---------- 4. MOBILE MENU ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// ---------- 5. SCROLL REVEAL, SKILL BARS, COUNTERS ----------
function countUp(el) {
  const target = Number(el.dataset.count);
  const plus = el.dataset.plus === "true" ? "+" : "";
  let n = 0;
  const timer = setInterval(function () {
    n++;
    el.textContent = n + plus;
    if (n >= target) clearInterval(timer);
  }, 120);
}

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("visible");

    el.querySelectorAll(".fill").forEach(function (bar) {
      bar.style.width = bar.dataset.width + "%";
    });
    el.querySelectorAll("[data-count]").forEach(countUp);

    observer.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (el) {
  observer.observe(el);
});

// ---------- 6. NAVBAR, PROGRESS BAR, BACK TO TOP, ACTIVE LINK ----------
const navbar = document.getElementById("navbar");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;

  progress.style.width = (scrollTop / height) * 100 + "%";
  navbar.classList.toggle("scrolled", scrollTop > 20);
  toTop.classList.toggle("show", scrollTop > 500);

  let current = "home";
  sections.forEach(function (sec) {
    if (scrollTop >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- 7. CONTACT FORM (opens your email app) ----------
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");

  window.location.href = "mailto:ramsha.rameez64@gmail.com?subject=" + subject + "&body=" + body;
  formNote.textContent = "Thank you, " + name + "! Your email app is opening.";
  form.reset();
});

// ---------- 8. FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();
