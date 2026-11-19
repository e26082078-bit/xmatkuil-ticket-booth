"use strict";

/**
* Xmatkuil Ticket Booth - application script.
* Day 5: form validation and price calculation.
* Day 6: purchase registry in the table.
 */

// ===== Business rules =====
const TICKET_PRICES = {
  general: 40,
  child: 20,
  senior: 20,
  student: 30,
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

// ===== Application state =====
const state = {
  purchases: [],
};

// ===== DOM references =====
const dom = {
  formSection: document.getElementById("ticket-form-section"),
  purchasesSection: document.getElementById("purchases-section"),
  form: document.getElementById("ticket-form"),
  fullName: document.getElementById("full-name"),
  email: document.getElementById("email"),
  visitDate: document.getElementById("visit-date"),
  ticketType: document.getElementById("ticket-type"),
  quantity: document.getElementById("quantity"),
  formError: document.getElementById("form-error"),
  totalPrice: document.getElementById("total-price"),
};

// ===== Price calculation =====
function calculateTotal(ticketType, quantity) {
  const unitPrice = TICKET_PRICES[ticketType];
  if (unitPrice === undefined || !Number.isInteger(quantity) || quantity < MIN_QUANTITY) {
    return 0;
  }
  return unitPrice * quantity;
}

function updateTotal() {
  const quantity = Number(dom.quantity.value);
  const total = calculateTotal(dom.ticketType.value, quantity);
  dom.totalPrice.textContent = currencyFormatter.format(total);
}

// ===== Validation =====
function getTodayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm() {
  const errors = [];

  const name = dom.fullName.value.trim();
  if (name === "") {
    errors.push("Escribe tu nombre completo.");
  } else if (name.length < 3) {
    errors.push("El nombre debe tener al menos 3 caracteres.");
  }

  const email = dom.email.value.trim();
  if (email === "") {
    errors.push("Escribe tu correo electrónico.");
  } else if (!isValidEmail(email)) {
    errors.push("El correo electrónico no es válido.");
  }

  const visitDate = dom.visitDate.value;
  if (visitDate === "") {
    errors.push("Selecciona la fecha de visita.");
  } else if (visitDate < getTodayISO()) {
    errors.push("La fecha de visita no puede ser anterior a hoy.");
  }

  if (dom.ticketType.value === "") {
    errors.push("Selecciona un tipo de boleto.");
  }

  const quantity = Number(dom.quantity.value);
  if (!Number.isInteger(quantity) || quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
    errors.push(`La cantidad debe ser un número entero entre ${MIN_QUANTITY} y ${MAX_QUANTITY}.`);
  }

  return errors;
}

function showErrors(errors) {
  dom.formError.textContent = errors.join(" ");
}

// ===== Event handlers =====
function handleSubmit(event) {
  event.preventDefault();

  const errors = validateForm();
  showErrors(errors);

  if (errors.length > 0) {
    return;
  }

  // TODO (Day 6): register the purchase in the table and reset the form
}

function handleReset() {
  // Wait for the browser to reset the fields before updating the total
  setTimeout(() => {
    showErrors([]);
    updateTotal();
  }, 0);
}

// ===== Initialization =====
function init() {
  dom.visitDate.min = getTodayISO();
  dom.quantity.max = MAX_QUANTITY;

  dom.ticketType.addEventListener("change", updateTotal);
  dom.quantity.addEventListener("input", updateTotal);
  dom.form.addEventListener("submit", handleSubmit);
  dom.form.addEventListener("reset", handleReset);

  updateTotal();
  console.log("Xmatkuil ticket booth loaded");
}

document.addEventListener("DOMContentLoaded", init);