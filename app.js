let airlines = [];
let selectedIndex = null;
const tableBody = document.querySelector("#airlineTable tbody");
const modal = document.getElementById("modal");
const form = document.getElementById("airlineForm");

// === Load JSON data ===
async function loadData() {
  const res = await fetch("airlineData_final.json");
  const data = await res.json();
  airlines = data.airlines || data;
  populateDropdowns();
  renderTable();
}

// === Populate dropdowns ===
function populateDropdowns() {
  const unique = (field) => [...new Set(airlines.map(a => a[field]).filter(Boolean))].sort();

  const types = unique("type");
  const regions = unique("region");
  const subregions = unique("subregion");

  const fillSelect = (id, list, defaultLabel) => {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="">${defaultLabel}</option>`;
    list.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      sel.appendChild(opt);
    });
  };

  fillSelect("typeFilter", types, "All Types");
  fillSelect("regionFilter", regions, "All Regions");
  fillSelect("subregionFilter", subregions, "All Subregions");
}

// === Render table ===
function renderTable() {
  const nameQ = document.getElementById("nameFilter").value.toLowerCase();
  const countryQ = document.getElementById("countryFilter").value.toLowerCase();
  const typeQ = document.getElementById("typeFilter").value;
  const regionQ = document.getElementById("regionFilter").value;
  const subregionQ = document.getElementById("subregionFilter").value;
  const categoryQ = document.getElementById("categoryFilter").value;
  const statusQ = document.getElementById("statusFilter").value;

  tableBody.innerHTML = "";

  const filtered = airlines.filter(a => {
    const name = (a.name || "").toLowerCase();
    const country = (a.country || "").toLowerCase();
    const type = (a.type || "").toLowerCase();
    const fleet = Array.isArray(a.fleet) ? a.fleet.join(" ").toLowerCase() : "";
    const region = a.region || "";
    const subregion = a.subregion || "";
    const cat = a.category || "";
    const status = a.status || "";

    const matchName = !nameQ || name.startsWith(nameQ);
    const matchCountry = !countryQ || country.includes(countryQ);
    const matchType = !typeQ || type.toLowerCase().includes(typeQ.toLowerCase()) || cat.toLowerCase().includes(typeQ.toLowerCase()) || fleet.includes(typeQ.toLowerCase());
    const matchRegion = !regionQ || region === regionQ;
    const matchSubregion = !subregionQ || subregion === subregionQ;
    const matchCat = !categoryQ || cat === categoryQ;
    const matchStatus = !statusQ || status === statusQ;

    return matchName && matchCountry && matchType && matchRegion && matchSubregion && matchCat && matchStatus;
  });

  filtered.forEach(a => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.name}</td>
      <td>${a.iata || ""}</td>
      <td>${a.icao || ""}</td>
      <td>${a.country || ""}</td>
      <td>${a.category || ""}</td>
      <td>${a.status || ""}</td>`;
    row.onclick = () => openModal(airlines.indexOf(a)); // correct mapping
    tableBody.appendChild(row);
  });
}

// === Modal logic ===
function openModal(index = null) {
  modal.classList.remove("hidden");
  form.innerHTML = "";
  selectedIndex = index;
  const data = index != null ? airlines[index] : {};
  document.getElementById("modalTitle").textContent = index != null ? "Edit Airline" : "Add Airline";

  const fields = [
    "name","iata","icao","type","status","location","country","numberOfAircraft",
    "email_sales","phone_sales","email_ops","phone_ops","category","region","subregion"
  ];

  fields.forEach(f => {
    const label = document.createElement("label");
    label.textContent = f;
    const input = document.createElement("input");
    input.name = f;
    input.value = data[f] || "";
    form.appendChild(label);
    form.appendChild(input);
  });
}

document.getElementById("cancelBtn").onclick = () => modal.classList.add("hidden");

form.onsubmit = e => {
  e.preventDefault();
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((v, k) => obj[k] = v);
  if (selectedIndex != null) airlines[selectedIndex] = obj;
  else airlines.push(obj);
  modal.classList.add("hidden");
  populateDropdowns();
  renderTable();
};

// === Add new airline ===
document.getElementById("addBtn").onclick = () => openModal(null);

// === Save file ===
document.getElementById("saveBtn").onclick = () => {
  const blob = new Blob([JSON.stringify({ airlines }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "airlineData_updated.json";
  a.click();
};

// === Filters ===
["nameFilter","countryFilter","typeFilter","regionFilter","subregionFilter","categoryFilter","statusFilter"]
  .forEach(id => document.getElementById(id).oninput = renderTable);
["typeFilter","regionFilter","subregionFilter","categoryFilter","statusFilter"]
  .forEach(id => document.getElementById(id).onchange = renderTable);

// === Initialize ===
loadData();
