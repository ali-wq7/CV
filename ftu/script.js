/* =====================================================
   Smart University Event Management System
   Frontend only: localStorage is used instead of a database.
   ===================================================== */

/* ---------- 1. Helpers ---------- */
const $ = (id) => document.getElementById(id);

// Read / write localStorage safely
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

// Prevents user text from being treated as HTML
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 2. Translations (English / Arabic) ---------- */
const TEXT = {
  en: {
    brand: "Smart Uni Events", lang_btn: "العربية",
    nav_home: "Home", nav_events: "Events", nav_calendar: "Calendar", nav_dashboard: "Dashboard",
    nav_about: "About", nav_contact: "Contact", nav_login: "Login", nav_logout: "Logout",
    hero_tag: "UNIVERSITY EVENT PLATFORM",
    hero_title: "Discover and join university events",
    hero_text: "Browse upcoming events, follow them on the calendar, and register in one click.",
    hero_btn: "Browse Events", upcoming: "Upcoming Events", view_all: "View all",
    why_title: "Why use this system",
    ft1_t: "Easy discovery", ft1: "Search events and filter them by category.",
    ft2_t: "Clear calendar", ft2: "See every event by date in one place.",
    ft3_t: "Quick registration", ft3: "Register or cancel with a single click.",
    events_title: "All Events", events_sub: "Search and filter university events.",
    search_ph: "Search by title, location or description...", all_cat: "All",
    academic: "Academic", sports: "Sports", cultural: "Cultural", technology: "Technology",
    details: "View details", register: "Register", cancel_reg: "Cancel registration",
    full: "Event is full", no_events: "No events found.",
    calendar_title: "Events Calendar", calendar_sub: "Click any event to see its details.",
    dash_title: "Dashboard", login_first: "Please login first.",
    welcome: "Welcome", st_events: "Total events", st_regs: "Registrations", st_upcoming: "Upcoming events",
    st_my: "My registrations", st_cats: "Categories",
    my_events: "My registered events", all_events: "Manage events",
    add_event: "Add event", edit: "Edit", delete: "Delete", cancel: "Cancel", actions: "Actions", seats: "Seats",
    f_title: "Title", f_category: "Category", f_date: "Date", f_time: "Time",
    f_location: "Location", f_capacity: "Capacity", f_desc: "Description",
    save: "Save", close: "Close", edit_event: "Edit event",
    about_title: "About the System",
    about_text: "A simple web platform that helps universities organize events and lets students register easily.",
    about_1_t: "For students", about_1: "View events and register for them.",
    about_2_t: "For administrators", about_2: "Add, edit and delete events securely.",
    about_3_t: "Calendar view", about_3: "See all events by date using FullCalendar.",
    contact_title: "Contact Us", contact_sub: "We would be happy to hear from you.",
    addr: "University Campus, Main Building", hours: "Sunday – Thursday, 8:00 – 16:00",
    name: "Name", email: "Email", c_msg: "Message", send: "Send message",
    sent: "Thank you! Your message was sent.",
    login_title: "Sign in", login_sub: "Access your dashboard and registrations.",
    role: "Role", student: "Student", admin: "Admin", password: "Password",
    login_btn: "Sign in", wrong_pass: "Wrong admin password.",
    confirm_del: "Delete this event?", reg_ok: "You are registered successfully.",
    saved: "Event saved.", deleted: "Event deleted.",
    footer_about: "A university event management platform built for a Web Programming course using HTML, CSS, JavaScript, Bootstrap and FullCalendar.",
    quick_links: "Quick links",
    footer: "© 2026 Smart University Event Management System"
  },
  ar: {
    brand: "فعاليات الجامعة الذكية", lang_btn: "English",
    nav_home: "الرئيسية", nav_events: "الفعاليات", nav_calendar: "التقويم", nav_dashboard: "لوحة التحكم",
    nav_about: "عن النظام", nav_contact: "اتصل بنا", nav_login: "تسجيل الدخول", nav_logout: "تسجيل الخروج",
    hero_tag: "منصة فعاليات الجامعة",
    hero_title: "اكتشف فعاليات الجامعة وشارك فيها",
    hero_text: "تصفح الفعاليات القادمة، تابعها في التقويم، وسجّل بضغطة واحدة.",
    hero_btn: "تصفح الفعاليات", upcoming: "الفعاليات القادمة", view_all: "عرض الكل",
    why_title: "لماذا هذا النظام؟",
    ft1_t: "اكتشاف سهل", ft1: "ابحث عن الفعاليات وصنّفها حسب النوع.",
    ft2_t: "تقويم واضح", ft2: "شاهد جميع الفعاليات حسب التاريخ في مكان واحد.",
    ft3_t: "تسجيل سريع", ft3: "سجّل أو ألغِ تسجيلك بضغطة واحدة.",
    events_title: "جميع الفعاليات", events_sub: "ابحث في فعاليات الجامعة وصنّفها.",
    search_ph: "ابحث بالعنوان أو المكان أو الوصف...", all_cat: "الكل",
    academic: "أكاديمية", sports: "رياضية", cultural: "ثقافية", technology: "تقنية",
    details: "عرض التفاصيل", register: "تسجيل", cancel_reg: "إلغاء التسجيل",
    full: "الفعالية مكتملة", no_events: "لا توجد فعاليات.",
    calendar_title: "تقويم الفعاليات", calendar_sub: "اضغط على أي فعالية لعرض تفاصيلها.",
    dash_title: "لوحة التحكم", login_first: "الرجاء تسجيل الدخول أولاً.",
    welcome: "مرحباً", st_events: "إجمالي الفعاليات", st_regs: "التسجيلات", st_upcoming: "الفعاليات القادمة",
    st_my: "تسجيلاتي", st_cats: "التصنيفات",
    my_events: "فعالياتي المسجلة", all_events: "إدارة الفعاليات",
    add_event: "إضافة فعالية", edit: "تعديل", delete: "حذف", cancel: "إلغاء", actions: "إجراءات", seats: "المقاعد",
    f_title: "العنوان", f_category: "التصنيف", f_date: "التاريخ", f_time: "الوقت",
    f_location: "المكان", f_capacity: "السعة", f_desc: "الوصف",
    save: "حفظ", close: "إغلاق", edit_event: "تعديل الفعالية",
    about_title: "عن النظام",
    about_text: "منصة ويب بسيطة تساعد الجامعات على تنظيم الفعاليات وتتيح للطلاب التسجيل بسهولة.",
    about_1_t: "للطلاب", about_1: "عرض الفعاليات والتسجيل فيها.",
    about_2_t: "للمشرفين", about_2: "إضافة الفعاليات وتعديلها وحذفها بأمان.",
    about_3_t: "عرض التقويم", about_3: "عرض كل الفعاليات حسب التاريخ باستخدام FullCalendar.",
    contact_title: "اتصل بنا", contact_sub: "يسعدنا تواصلك معنا.",
    addr: "الحرم الجامعي، المبنى الرئيسي", hours: "الأحد – الخميس، 8:00 – 16:00",
    name: "الاسم", email: "البريد الإلكتروني", c_msg: "الرسالة", send: "إرسال الرسالة",
    sent: "شكراً لك! تم إرسال رسالتك.",
    login_title: "تسجيل الدخول", login_sub: "ادخل إلى لوحة التحكم وتسجيلاتك.",
    role: "الدور", student: "طالب", admin: "مشرف", password: "كلمة المرور",
    login_btn: "دخول", wrong_pass: "كلمة مرور المشرف غير صحيحة.",
    confirm_del: "هل تريد حذف هذه الفعالية؟", reg_ok: "تم تسجيلك بنجاح.",
    saved: "تم حفظ الفعالية.", deleted: "تم حذف الفعالية.",
    footer_about: "منصة لإدارة فعاليات الجامعة، تم تطويرها لمقرر برمجة الويب باستخدام HTML وCSS وJavaScript وBootstrap وFullCalendar.",
    quick_links: "روابط سريعة",
    footer: "© 2026 نظام إدارة فعاليات الجامعة الذكي"
  }
};

/* ---------- 3. Data (saved in localStorage) ---------- */
const COLORS = { academic: "#2563eb", sports: "#16a34a", cultural: "#9333ea", technology: "#ea580c" };

const SAMPLE_EVENTS = [
  { id: "e1", title: "Welcome Week", category: "cultural", date: "2026-10-10", time: "10:00", location: "Main Hall", capacity: 200, description: "Meet new students, clubs and staff." },
  { id: "e2", title: "Programming Contest", category: "technology", date: "2026-10-15", time: "09:00", location: "Computer Lab 2", capacity: 50, description: "Solve problems and win prizes." },
  { id: "e3", title: "Football Tournament", category: "sports", date: "2026-10-20", time: "16:00", location: "University Stadium", capacity: 100, description: "Faculties compete for the cup." },
  { id: "e4", title: "Research Seminar", category: "academic", date: "2026-10-25", time: "11:30", location: "Room A-101", capacity: 80, description: "Graduate students present their research." },
  { id: "e5", title: "Cultural Night", category: "cultural", date: "2026-11-05", time: "19:00", location: "Open Theater", capacity: 150, description: "Music, food and traditions." },
  { id: "e6", title: "AI Workshop", category: "technology", date: "2026-11-12", time: "13:00", location: "Lab 5", capacity: 40, description: "Hands-on introduction to AI." }
];

let lang = store.get("lang", "en");
let events = store.get("events", null) || SAMPLE_EVENTS;
let regs = store.get("regs", []);   // each item: { eventId, email }
let user = store.get("user", null); // { name, email, role }
let calendar = null;
let currentEventId = null;
let currentCat = "all";             // selected category filter

const t = (key) => TEXT[lang][key] || key;
const saveEvents = () => store.set("events", events);
const saveRegs = () => store.set("regs", regs);
const countRegs = (id) => regs.filter((r) => r.eventId === id).length;
const isRegistered = (id) => user && regs.some((r) => r.eventId === id && r.email === user.email);
const locale = () => (lang === "ar" ? "ar" : "en-GB");
const toDate = (d) => new Date(d + "T00:00");
const fmtDate = (d) => toDate(d).toLocaleDateString(locale(), { day: "numeric", month: "long", year: "numeric" });

// Small notification message (Bootstrap toast)
function notify(message) {
  $("toastMsg").textContent = message;
  bootstrap.Toast.getOrCreateInstance($("toast"), { delay: 3000 }).show();
}

/* ---------- 4. Pages / navigation ---------- */
function showPage(name) {
  document.querySelectorAll(".page").forEach((p) => p.classList.add("d-none"));
  $("page-" + name).classList.remove("d-none");
  document.querySelectorAll("#menu .nav-link").forEach((a) =>
    a.classList.toggle("active", a.dataset.page === name));

  if (name === "calendar") {
    if (!calendar) initCalendar(); else calendar.updateSize();
  }
  if (name === "dashboard") renderDashboard();

  // Close the mobile menu after clicking a link
  bootstrap.Collapse.getOrCreateInstance($("menu"), { toggle: false }).hide();
  window.scrollTo(0, 0);
}

/* ---------- 5. Event cards ---------- */
function cardHTML(e) {
  const d = toDate(e.date);
  const percent = Math.min(100, Math.round((countRegs(e.id) / e.capacity) * 100));
  return `
    <article class="col-md-6 col-lg-4">
      <article class="event-card">
        <section class="event-top">
          <section class="date-block">
            <strong>${d.getDate()}</strong>
            <small>${d.toLocaleDateString(locale(), { month: "short" })}</small>
          </section>
          <section>
            <span class="pill pill-${e.category}">${t(e.category)}</span>
            <h5>${esc(e.title)}</h5>
          </section>
        </section>
        <section class="event-body">
          <p class="event-meta"><i class="bi bi-clock"></i>${e.time}</p>
          <p class="event-meta"><i class="bi bi-geo-alt"></i>${esc(e.location)}</p>
          <section class="seats" title="${t("seats")}"><span style="width:${percent}%"></span></section>
        </section>
        <footer class="event-foot">
          <button class="btn btn-outline-primary btn-sm w-100" data-details="${e.id}">${t("details")}</button>
        </footer>
      </article>
    </article>`;
}

function renderCards(target, list) {
  target.innerHTML = list.length ? list.map(cardHTML).join("") : `<p class="text-muted">${t("no_events")}</p>`;
}

function renderHome() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  renderCards($("homeEvents"), sorted.slice(0, 3));

  // Statistics strip
  const today = new Date().toISOString().slice(0, 10);
  const items = [
    [events.length, t("st_events")],
    [events.filter((e) => e.date >= today).length, t("st_upcoming")],
    [regs.length, t("st_regs")],
    [4, t("st_cats")]
  ];
  $("homeStats").innerHTML = items.map((i) =>
    `<article class="col-6 col-lg-3 stat-item"><strong>${i[0]}</strong><small>${i[1]}</small></article>`).join("");
}

// Search + category filter
function renderEvents() {
  const q = $("searchInput").value.trim().toLowerCase();
  const list = events
    .filter((e) => (currentCat === "all" || e.category === currentCat) &&
      (e.title + " " + e.location + " " + e.description).toLowerCase().includes(q))
    .sort((a, b) => a.date.localeCompare(b.date));
  renderCards($("eventsList"), list);
}

/* ---------- 6. Event details + registration ---------- */
function openDetails(id) {
  currentEventId = id;
  fillDetails();
  bootstrap.Modal.getOrCreateInstance($("detailsModal")).show();
}

function fillDetails() {
  const e = events.find((x) => x.id === currentEventId);
  if (!e) return;
  $("dTitle").textContent = e.title;
  $("dBody").innerHTML = `
    <p><span class="pill pill-${e.category}">${t(e.category)}</span></p>
    <p>${esc(e.description)}</p>
    <p class="event-meta"><i class="bi bi-calendar-event"></i>${fmtDate(e.date)}</p>
    <p class="event-meta"><i class="bi bi-clock"></i>${e.time}</p>
    <p class="event-meta"><i class="bi bi-geo-alt"></i>${esc(e.location)}</p>
    <p class="event-meta mb-0"><i class="bi bi-people"></i>${t("seats")}: ${countRegs(e.id)} / ${e.capacity}</p>`;

  const btn = $("dRegister");
  const full = countRegs(e.id) >= e.capacity;
  if (isRegistered(e.id)) {
    btn.textContent = t("cancel_reg"); btn.className = "btn btn-outline-danger"; btn.disabled = false;
  } else if (full) {
    btn.textContent = t("full"); btn.className = "btn btn-secondary"; btn.disabled = true;
  } else {
    btn.textContent = t("register"); btn.className = "btn btn-primary"; btn.disabled = false;
  }
}

function toggleRegistration() {
  if (!user) {
    bootstrap.Modal.getOrCreateInstance($("detailsModal")).hide();
    showPage("login");
    notify(t("login_first"));
    return;
  }
  if (isRegistered(currentEventId)) {
    regs = regs.filter((r) => !(r.eventId === currentEventId && r.email === user.email));
  } else {
    regs.push({ eventId: currentEventId, email: user.email });
    notify(t("reg_ok"));
  }
  saveRegs();
  fillDetails();
  refreshAll();
}

/* ---------- 7. Calendar (FullCalendar) ---------- */
function initCalendar() {
  calendar = new FullCalendar.Calendar($("calendar"), {
    initialView: "dayGridMonth",
    locale: lang,
    direction: lang === "ar" ? "rtl" : "ltr",
    height: "auto",
    headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth,listMonth" },
    // FullCalendar asks for events through this function
    events: (info, success) => success(events.map((e) => ({
      id: e.id, title: e.title, start: e.date + "T" + e.time, color: COLORS[e.category]
    }))),
    eventClick: (info) => openDetails(info.event.id)
  });
  calendar.render();
}

/* ---------- 8. Dashboards ---------- */
function statCard(icon, label, value) {
  return `<article class="col-6 col-lg-3">
    <section class="stat-card">
      <span class="icon"><i class="bi ${icon}"></i></span>
      <section><strong>${value}</strong><small>${label}</small></section>
    </section>
  </article>`;
}

function renderDashboard() {
  const box = $("dashboardContent");
  if (!user) {
    $("dashSub").textContent = "";
    box.innerHTML = `<p class="alert alert-info">${t("login_first")}</p>`;
    return;
  }
  $("dashSub").innerHTML = `${t("welcome")}, ${esc(user.name)} <span class="role-badge">${t(user.role)}</span>`;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).length;

  if (user.role === "admin") {
    const rows = [...events].sort((a, b) => a.date.localeCompare(b.date)).map((e) => `
      <tr>
        <td class="fw-semibold">${esc(e.title)}</td>
        <td><span class="pill pill-${e.category}">${t(e.category)}</span></td>
        <td>${e.date}</td>
        <td>${countRegs(e.id)} / ${e.capacity}</td>
        <td class="text-nowrap">
          <button class="btn btn-sm btn-outline-primary" data-edit="${e.id}"><i class="bi bi-pencil"></i> ${t("edit")}</button>
          <button class="btn btn-sm btn-outline-danger" data-delete="${e.id}"><i class="bi bi-trash"></i> ${t("delete")}</button>
        </td>
      </tr>`).join("");

    box.innerHTML = `
      <section class="row g-3 mb-4">
        ${statCard("bi-calendar-event", t("st_events"), events.length)}
        ${statCard("bi-people", t("st_regs"), regs.length)}
        ${statCard("bi-hourglass-split", t("st_upcoming"), upcoming)}
        ${statCard("bi-tags", t("st_cats"), 4)}
      </section>
      <section class="table-box">
        <section class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="m-0">${t("all_events")}</h5>
          <button class="btn btn-primary btn-sm" data-add="1"><i class="bi bi-plus-lg"></i> ${t("add_event")}</button>
        </section>
        <section class="table-responsive">
          <table class="table align-middle mb-0">
            <thead><tr><th>${t("f_title")}</th><th>${t("f_category")}</th><th>${t("f_date")}</th><th>${t("seats")}</th><th>${t("actions")}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      </section>`;
  } else {
    const mine = events.filter((e) => isRegistered(e.id));
    const myUpcoming = mine.filter((e) => e.date >= today).length;
    const items = mine.map((e) => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span><span class="fw-semibold">${esc(e.title)}</span> <small class="text-muted">· ${fmtDate(e.date)}</small></span>
        <button class="btn btn-sm btn-outline-danger" data-cancel="${e.id}">${t("cancel")}</button>
      </li>`).join("");

    box.innerHTML = `
      <section class="row g-3 mb-4">
        ${statCard("bi-calendar-event", t("st_events"), events.length)}
        ${statCard("bi-check2-circle", t("st_my"), mine.length)}
        ${statCard("bi-hourglass-split", t("st_upcoming"), myUpcoming)}
      </section>
      <section class="table-box">
        <h5 class="mb-3">${t("my_events")}</h5>
        ${mine.length ? `<ul class="list-group list-group-flush">${items}</ul>` : `<p class="text-muted m-0">${t("no_events")}</p>`}
      </section>`;
  }
}

/* ---------- 9. Admin: add / edit / delete ---------- */
function openForm(id) {
  const e = events.find((x) => x.id === id);
  $("eventForm").reset();
  $("formTitle").textContent = e ? t("edit_event") : t("add_event");
  $("fId").value = e ? e.id : "";
  if (e) {
    $("fTitle").value = e.title; $("fCategory").value = e.category;
    $("fDate").value = e.date; $("fTime").value = e.time;
    $("fLocation").value = e.location; $("fCapacity").value = e.capacity;
    $("fDesc").value = e.description;
  }
  bootstrap.Modal.getOrCreateInstance($("formModal")).show();
}

$("eventForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const data = {
    id: $("fId").value || "e" + Date.now(),
    title: $("fTitle").value.trim(), category: $("fCategory").value,
    date: $("fDate").value, time: $("fTime").value,
    location: $("fLocation").value.trim(), capacity: Number($("fCapacity").value),
    description: $("fDesc").value.trim()
  };
  const index = events.findIndex((x) => x.id === data.id);
  if (index >= 0) events[index] = data; else events.push(data); // edit or add
  saveEvents();
  bootstrap.Modal.getOrCreateInstance($("formModal")).hide();
  refreshAll();
  notify(t("saved"));
});

function deleteEvent(id) {
  if (!confirm(t("confirm_del"))) return;
  events = events.filter((e) => e.id !== id);
  regs = regs.filter((r) => r.eventId !== id);
  saveEvents(); saveRegs();
  refreshAll();
  notify(t("deleted"));
}

/* ---------- 10. Login / logout ---------- */
$("loginRole").addEventListener("change", () =>
  $("passwordBox").classList.toggle("d-none", $("loginRole").value !== "admin"));

$("loginForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const role = $("loginRole").value;
  if (role === "admin" && $("loginPass").value !== "admin123") {
    notify(t("wrong_pass"));
    return;
  }
  user = { name: $("loginName").value.trim(), email: $("loginEmail").value.trim().toLowerCase(), role };
  store.set("user", user);
  $("loginForm").reset();
  $("passwordBox").classList.add("d-none");
  refreshAll();
  showPage("dashboard");
});

function logout() {
  user = null;
  localStorage.removeItem("user");
  refreshAll();
  showPage("home");
}

$("contactForm").addEventListener("submit", (ev) => {
  ev.preventDefault();
  notify(t("sent"));
  ev.target.reset();
});

/* ---------- 11. Language switcher ---------- */
function applyLanguage() {
  const rtl = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";

  // Use the RTL version of Bootstrap for Arabic
  const base = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/";
  $("bootstrapCss").href = base + (rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css");

  // Replace every text marked with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  $("langBtn").textContent = t("lang_btn");

  if (calendar) {
    calendar.setOption("locale", lang);
    calendar.setOption("direction", rtl ? "rtl" : "ltr");
  }
  refreshAll();
}

$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "ar" : "en";
  store.set("lang", lang);
  applyLanguage();
});

/* ---------- 12. Refresh everything + click handling ---------- */
function refreshAll() {
  $("loginLink").textContent = user ? t("nav_logout") : t("nav_login");
  renderHome();
  renderEvents();
  renderDashboard();
  if (calendar) calendar.refetchEvents();
  if (currentEventId) fillDetails();
}

$("searchInput").addEventListener("input", renderEvents);
$("dRegister").addEventListener("click", toggleRegistration);

// One click listener for all buttons and links
document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-page],[data-details],[data-edit],[data-delete],[data-add],[data-cancel],[data-cat]");
  if (!el) return;
  ev.preventDefault();

  if (el.dataset.page) {
    if (el.dataset.page === "login" && user) logout(); else showPage(el.dataset.page);
  } else if (el.dataset.cat) {
    currentCat = el.dataset.cat;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === el));
    renderEvents();
  } else if (el.dataset.details) openDetails(el.dataset.details);
  else if (el.dataset.edit) openForm(el.dataset.edit);
  else if (el.dataset.add) openForm(null);
  else if (el.dataset.delete) deleteEvent(el.dataset.delete);
  else if (el.dataset.cancel) {
    regs = regs.filter((r) => !(r.eventId === el.dataset.cancel && r.email === user.email));
    saveRegs(); refreshAll();
  }
});

/* ---------- 13. Start ---------- */
saveEvents();
applyLanguage();
showPage("home");