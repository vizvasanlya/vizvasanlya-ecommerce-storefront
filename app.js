const cards = [{"label": "Revenue", "value": "$84.2K", "delta": "+22%"}, {"label": "Orders", "value": "2,418", "delta": "+15%"}, {"label": "Conversion", "value": "4.8%", "delta": "+0.7%"}, {"label": "AOV", "value": "$76", "delta": "+8%"}];
const rows = [{"title": "Wireless earbuds", "status": "In stock", "detail": "Featured product with strong add-to-cart activity."}, {"title": "Smart bottle", "status": "Trending", "detail": "Social campaign drove a 31% traffic lift."}, {"title": "Travel backpack", "status": "Low stock", "detail": "Reorder trigger reached for the navy colorway."}, {"title": "Desk lamp", "status": "Bundle ready", "detail": "New accessory bundle is prepared for launch."}];
const insights = ["Checkout abandonment dropped after simplifying shipping options.", "Bundle offers increased average order value.", "Mobile traffic now represents 68% of sessions."];
const storageKey = 'vizvasanlya-ecommerce-storefront-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
