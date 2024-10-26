const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");
const toggleIcon = body.querySelector(".toggle");
const navLinks = sidebar.querySelectorAll(".nav-links a");


let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
  sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  }else{
    localStorage.setItem("mode", "light");
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  sidebarToggle.classList.toggle("fa-angles-left");
  sidebarToggle.classList.toggle("fa-angles-right");
  if (sidebar.classList.contains("close")) {
    localStorage.setItem("status", "close");
  } else {
    localStorage.setItem("status", "open");
  }
});

toggleIcon.addEventListener("click", () => {
  sidebar.classList.toggle("mobile-open");
  toggleIcon.classList.toggle("fa-bars");
  toggleIcon.classList.toggle("fa-x");
});

// Close sidebar on link click in mobile view
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 785) {
      sidebar.classList.remove("mobile-open");
      toggleIcon.classList.remove("fa-x");
      toggleIcon.classList.add("fa-bars");
    }
  });
});

function toggleDetails(row) {
  const detailsRow = row.nextElementSibling;
  const icon = row.querySelector(".event-icon");
  if (detailsRow.style.display === "none" || detailsRow.style.display === "") {
    detailsRow.style.display = "table-row";
    icon.classList.add("open");
  } else {
    detailsRow.style.display = "none";
    icon.classList.remove("open");
  }
}

document.getElementById("searchInput").addEventListener("input", filterTable);

const filterCriteria = {
  search: "",
  date: "",
  status: "",
  name: "",
};

// Event listeners for each filter toggle (e.g., Date, Status, Name)
document.querySelectorAll(".history-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const filterType = toggle.getAttribute("data-filter");
    // Here you could set up a dropdown or a simple prompt for simplicity
    const filterValue = prompt(`Enter ${filterType} filter value:`);

    filterCriteria[filterType] = filterValue ? filterValue.toLowerCase() : "";
    filterTable();
  });
});

function filterTable() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  filterCriteria.search = searchInput;

  document.querySelectorAll(".event-row").forEach((row) => {
    const name = row.getAttribute("data-name").toLowerCase();
    const date = row.getAttribute("data-date");
    const status = row.getAttribute("data-status").toLowerCase();

    const matchesSearch = name.includes(filterCriteria.search);
    const matchesDate = !filterCriteria.date || date === filterCriteria.date;
    const matchesStatus =
      !filterCriteria.status || status.includes(filterCriteria.status);
    const matchesName =
      !filterCriteria.name || name.includes(filterCriteria.name);

    if (matchesSearch && matchesDate && matchesStatus && matchesName) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}


// Open popup when 'Completed' status is clicked
document.querySelectorAll(".status.progress").forEach((status) => {
  status.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevents triggering row click event
    document.getElementById("popupOverlay").classList.remove("hidden");
  });
});

// Close popup
function closePopup() {
  document.getElementById('popupOverlay').classList.add('hidden');
}

// Optional: Close popup when clicking outside content
document.getElementById('popupOverlay').addEventListener('click', function (e) {
  if (e.target === this) {
    closePopup();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".left-arrow");
  const nextButton = document.querySelector(".right-arrow");
  const navLinks = document.querySelectorAll(".slider-nav a");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
    navLinks.forEach((link, i) => {
      link.classList.toggle("active", i === index);
    });
  }

  prevButton.addEventListener("click", () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  });

  // Optionally, add click functionality to nav links
  navLinks.forEach((link, i) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // Initial display
  showSlide(currentSlide);
});
