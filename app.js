"use strict";

/**
 * Xmatkuil Ticket Booth - base application script.
 * Business logic (validation, price calculation, purchase registry)
 * will be implemented in the feature/logic branch.
 */

// ===== Application state =====
const state = {
  purchases: [],
};

// ===== DOM references =====
// Elements are added by feature/ui. Query them here once they exist.
const dom = {
  formSection: document.getElementById("ticket-form-section"),
  purchasesSection: document.getElementById("purchases-section"),
};

// ===== Initialization =====
function init() {
  // TODO (feature/logic): attach form event listeners
  // TODO (feature/logic): render the purchases table from state
  console.log("Xmatkuil ticket booth loaded");
}

document.addEventListener("DOMContentLoaded", init);