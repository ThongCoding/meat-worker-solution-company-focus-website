const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute("data-overlay");
});

const slider = new A11YSlider(document.querySelector(".slider"), {
  adaptiveHeight: false,
  dots: true,
  centerMode: true,
  arrows: false,
  responsive: {
    480: {
      dots: false, // dots enabled 1280px and up
    },
  },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// slider functions
let slide = document.querySelector(".slide .listMeat");
let items = document.querySelectorAll(".slide .listMeat .itemMeat");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slide .dotsMeat li");

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};
let refreshInterval = setInterval(() => {
  next.click();
}, 3000);
function reloadSlider() {
  slide.style.left = -items[active].offsetLeft + "px";

  let last_active_dot = document.querySelector(".slide .dotsMeat li.active");
  last_active_dot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};

// form handlers
// Find the form and add an event listener for submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Get the values from the form fields
  const firstName = document.querySelector('input[name="firstName"]').value;
  const lastName = document.querySelector('input[name="lastName"]').value;
  const contactNumber = document.querySelector(
    'input[name="contactNumber"]'
  ).value;
  const company = document.querySelector('input[name="company"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const areaOfInterest = document.querySelector(
    'input[name="areaOfInterest"]'
  ).value;
  const businessChallenge = document.querySelector(
    'textarea[name="businessChallenge"]'
  ).value;

  // Get the checkboxes
  const termsCheckbox = document.querySelector('input[name="terms"]').checked; // The T&C checkbox
  const newsletterCheckbox = document.querySelector(
    'input[name="newsletter"]'
  ).checked; // The optional checkbox

  // Check if the T&C checkbox is checked
  if (!termsCheckbox) {
    alert("You must agree to the T&C and Privacy Policy before submitting.");
    return; // Stop the form from submitting if the checkbox is not checked
  }

  // Email address where the form will be sent
  const recipientEmail = "jordan@meatworkersolution.com.au"; // Replace with your actual email

  // Build the mailto URL
  const mailtoLink =
    `mailto:${recipientEmail}?subject=Contact Form Submission&body=` +
    `First Name: ${firstName}%0D%0A` +
    `Last Name: ${lastName}%0D%0A` +
    `Contact Number: ${contactNumber}%0D%0A` +
    `Company: ${company}%0D%0A` +
    `Email: ${email}%0D%0A` +
    `Area of Interest: ${areaOfInterest}%0D%0A` +
    `Business Challenge: ${businessChallenge}`;

  // Open the email client with the form data
  window.location.href = mailtoLink;
});
