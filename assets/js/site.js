(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const year = document.querySelector("[data-year]");
  const form = document.querySelector("#beta-form");
  const status = document.querySelector("#beta-status");
  const androidNote = document.querySelector("#android-note");
  const androidGate = document.querySelector("#android-gate");
  const iosDone = document.querySelector("#ios-done");
  const ackCheck = document.querySelector("#ack-copied");
  const ackBtn = document.querySelector("#ack-btn");
  const copyBtn = document.querySelector("#copy-url");
  const copyStatus = document.querySelector("#copy-status");

  const APP_NAME = "Snap Media";
  const BETA_INBOX = "admin@snapcollectibles.com";
  const BETA_ENDPOINT = `https://formsubmit.co/ajax/${BETA_INBOX}`;
  const ANDROID_TEST_URL = "https://play.google.com/apps/internaltest/4700993420542853350";
  const GATE_KEY = "snapmedia.androidGate";

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  const sectionIds = ["snap", "collection", "trades", "faq", "privacy", "download"];
  const navLinks = [...document.querySelectorAll(".nav a[href^='#'], .nav a[href*='index.html#']")];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            link.classList.toggle("is-active", href.endsWith(`#${id}`));
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((section) => io.observe(section));
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;
      const open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  const shot = new URLSearchParams(window.location.search).get("shot");
  if (shot) {
    document.querySelectorAll("main > section, main > .strip, main > .ember-band").forEach((el) => {
      el.hidden = el.id !== shot;
    });
  }

  const selectedOs = () => form?.querySelector('input[name="Phone OS"]:checked')?.value || "";

  const syncAndroidNote = () => {
    if (!androidNote) return;
    androidNote.hidden = selectedOs() !== "Android";
  };

  form?.querySelectorAll('input[name="Phone OS"]').forEach((input) => {
    input.addEventListener("change", syncAndroidNote);
  });
  syncAndroidNote();

  const readGate = () => {
    try {
      return JSON.parse(sessionStorage.getItem(GATE_KEY) || "null");
    } catch {
      return null;
    }
  };

  const writeGate = (state) => {
    sessionStorage.setItem(GATE_KEY, JSON.stringify(state));
  };

  const showAndroidGate = (email, acknowledged) => {
    if (!androidGate || !form) return;
    form.hidden = true;
    if (iosDone) iosDone.hidden = true;
    androidGate.hidden = false;
    androidGate.querySelectorAll("[data-gate-email]").forEach((el) => {
      el.textContent = email;
    });
    if (ackCheck) {
      ackCheck.checked = Boolean(acknowledged);
      ackCheck.disabled = Boolean(acknowledged);
    }
    if (ackBtn) {
      ackBtn.disabled = !acknowledged;
      ackBtn.hidden = Boolean(acknowledged);
    }
    const confirmed = androidGate.querySelector("#ack-confirmed");
    if (confirmed) confirmed.hidden = !acknowledged;
    androidGate.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const showIosDone = (email) => {
    if (iosDone) {
      iosDone.hidden = false;
      iosDone.textContent = `Request sent. We'll follow up at ${email} for the iOS beta.`;
    }
    if (androidGate) androidGate.hidden = true;
  };

  const preview = new URLSearchParams(window.location.search).get("preview");
  if (preview === "android-gate") {
    writeGate({ os: "Android", email: "you@shelf.local", acknowledged: false, url: ANDROID_TEST_URL });
    showAndroidGate("you@shelf.local", false);
  }

  const pending = readGate();
  if (pending?.os === "Android" && pending.email && !pending.acknowledged) {
    showAndroidGate(pending.email, false);
  } else if (pending?.os === "Android" && pending.acknowledged) {
    showAndroidGate(pending.email, true);
  }

  window.addEventListener("beforeunload", (event) => {
    const state = readGate();
    if (state?.os === "Android" && !state.acknowledged && androidGate && !androidGate.hidden) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(ANDROID_TEST_URL);
      if (copyStatus) copyStatus.textContent = "Copied to clipboard.";
      if (copyBtn) copyBtn.textContent = "Copied";
      window.setTimeout(() => {
        if (copyBtn) copyBtn.textContent = "Copy URL";
      }, 1800);
    } catch {
      if (copyStatus) copyStatus.textContent = "Select the URL above and copy it yourself.";
    }
  };

  copyBtn?.addEventListener("click", copyUrl);

  ackCheck?.addEventListener("change", () => {
    if (ackBtn) ackBtn.disabled = !ackCheck.checked;
  });

  ackBtn?.addEventListener("click", () => {
    if (!ackCheck?.checked) return;
    const state = readGate() || { os: "Android", email: androidGate?.querySelector("[data-gate-email]")?.textContent || "" };
    state.acknowledged = true;
    writeGate(state);
    if (ackBtn) ackBtn.hidden = true;
    if (ackCheck) ackCheck.disabled = true;
    const confirmed = androidGate?.querySelector("#ack-confirmed");
    if (confirmed) confirmed.hidden = false;
    if (status) {
      status.dataset.state = "ok";
      status.textContent = "Saved. Keep that URL — it stays inactive until we add your email.";
    }
  });

  if (form && status) {
    const submitBtn = form.querySelector('button[type="submit"]');

    const mailtoFallback = (appName, os, email) => {
      const subject = `${APP_NAME} beta tester request`;
      const body = [
        `App Name: ${appName}`,
        `Phone OS: ${os}`,
        `Email: ${email}`,
      ].join("\n");
      window.location.href = `mailto:${BETA_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const emailInput = form.querySelector("#email");
      const appInput = form.querySelector("#app-name");
      const osInput = form.querySelector('input[name="Phone OS"]:checked');
      const honey = form.querySelector('input[name="_honey"]');
      const email = (emailInput?.value || "").trim().toLowerCase();
      const appName = (appInput?.value || APP_NAME).trim();
      const os = osInput?.value || "";

      if (honey?.value) return;

      if (!os) {
        status.dataset.state = "err";
        status.textContent = "Pick iOS or Android.";
        return;
      }

      if (!email || !emailInput?.checkValidity()) {
        status.dataset.state = "err";
        status.textContent = "Need a valid email so we can add you to the tester list.";
        return;
      }

      status.dataset.state = "";
      status.textContent = "Sending request…";
      if (submitBtn) submitBtn.disabled = true;
      if (iosDone) iosDone.hidden = true;

      const payload = {
        "App Name": appName,
        "Phone OS": os,
        email,
        _subject: `${APP_NAME} beta tester request`,
        _template: "table",
        _captcha: "false",
      };

      try {
        const response = await fetch(BETA_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        status.dataset.state = "ok";
        if (os === "Android") {
          writeGate({ os, email, acknowledged: false, url: ANDROID_TEST_URL });
          status.textContent = "Request sent. Copy the Play test URL below and confirm you have kept it.";
          showAndroidGate(email, false);
        } else {
          sessionStorage.removeItem(GATE_KEY);
          status.textContent = `Request sent. We'll follow up at ${email} for the iOS beta.`;
          showIosDone(email);
          form.reset();
          if (appInput) appInput.value = APP_NAME;
          syncAndroidNote();
        }
      } catch {
        mailtoFallback(appName, os, email);
        status.dataset.state = "ok";
        if (os === "Android") {
          writeGate({ os, email, acknowledged: false, url: ANDROID_TEST_URL });
          status.textContent = `Couldn't reach the mail service. Your mail app should open a message to ${BETA_INBOX}. Still copy the Play test URL below.`;
          showAndroidGate(email, false);
        } else {
          status.textContent = `Couldn't reach the mail service. Your mail app should open a message to ${BETA_INBOX} with App name, phone OS, and email.`;
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
})();
