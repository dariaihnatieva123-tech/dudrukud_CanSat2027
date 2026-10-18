(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Sulge menüü" : "Ava menüü");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  // Pages CMS stores news as JSON files in content/news.
  // GitHub's public Contents API lets this static GitHub Pages site list them.
  const owner = "dariaihnatieva123-tech";
  const repo = "PurkSatelliit2027";
  const branch = "main";
  const newsContainer = document.getElementById("news-list");
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/news?ref=${branch}`;

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function formatDate(value) {
    if (!value) return "Düdrukud · CanSat 2027";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return escapeHTML(value);
    return new Intl.DateTimeFormat("et-EE", { day: "numeric", month: "long", year: "numeric" }).format(date);
  }

  function renderNews(items) {
    if (!items.length || !newsContainer) return;
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const [featured, ...rest] = items.slice(0, 4);
    newsContainer.innerHTML = `
      <article class="news-feature">
        <div class="news-feature-art" ${featured.image ? `style="background-image:linear-gradient(0deg,rgba(16,40,63,.18),rgba(16,40,63,.05)),url('${escapeHTML(featured.image)}');background-size:cover;background-position:center"` : ""}>
          <span class="feature-number">${escapeHTML(featured.category || "PROJEKTI PÄEVIK")}</span>
          ${featured.image ? "" : '<span class="feature-star">✳</span>'}
          <span class="feature-caption">DÜDRUKUD · CANSAT 2027</span>
        </div>
        <div class="news-feature-copy">
          <p class="eyebrow">${escapeHTML(featured.category || "PROJEKTI PÄEVIK")}</p>
          <h3>${escapeHTML(featured.title || "Meie projektipäevik")}</h3>
          <p>${escapeHTML(featured.excerpt || "")}</p>
          <span class="news-date">${formatDate(featured.date)}</span>
          ${featured.body ? `<details class="news-details"><summary class="text-link">Loe uudist <span>↘</span></summary><div class="news-body">${escapeHTML(featured.body).replace(/\n/g, "<br>")}</div></details>` : ""}
        </div>
      </article>
      ${rest.map(item => `
        <article class="news-card">
          ${item.image ? `<img src="${escapeHTML(item.image)}" alt="" loading="lazy">` : '<div class="news-feature-art"><span class="feature-star">✳</span></div>'}
          <div>
            <p class="eyebrow">${escapeHTML(item.category || "UUDISED")}</p>
            <h3>${escapeHTML(item.title || "Uudis")}</h3>
            <p>${escapeHTML(item.excerpt || "")}</p>
            <time>${formatDate(item.date)}</time>
            ${item.body ? `<details class="news-details"><summary class="text-link">Loe edasi <span>↗</span></summary><div class="news-body">${escapeHTML(item.body).replace(/\n/g, "<br>")}</div></details>` : ""}
          </div>
        </article>`).join("")}
    `;
  }

  async function loadNews() {
    if (!newsContainer) return;
    try {
      const response = await fetch(apiUrl, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) return;
      const files = await response.json();
      const jsonFiles = files.filter(file => file.type === "file" && file.name.endsWith(".json"));
      const posts = await Promise.all(jsonFiles.map(async file => {
        const response = await fetch(file.download_url);
        if (!response.ok) return null;
        return response.json();
      }));
      renderNews(posts.filter(Boolean).filter(post => post.published !== false));
    } catch (error) {
      // The starter message stays visible if the API is unavailable.
    }
  }
  loadNews();
})();