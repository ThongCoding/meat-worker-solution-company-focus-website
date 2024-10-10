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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// form handlers
// Find the form and add an event listener for submit
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submission prevented, handling via JS"); // Test it in the browser console

  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const contactNumber = document.querySelector(
    'input[name="contact_number"]'
  ).value;
  const company = document.querySelector('input[name="company"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const areaOfInterest = document.querySelector(
    'input[name="area_of_interest"]'
  ).value;
  const businessChallenge = document.querySelector(
    'textarea[name="business_challenge"]'
  ).value;

  const termsCheckbox = document.querySelector('input[name="terms"]').checked;
  if (!termsCheckbox) {
    alert("You must agree to the T&C and Privacy Policy before submitting.");
    return;
  }

  // Send email via EmailJS
  emailjs
    .send("service_kzj73uw", "template_nv7sh55", {
      from_name: firstName + " " + lastName,
      contact_number: contactNumber,
      company: company,
      email: email,
      area_of_interest: areaOfInterest,
      business_challenge: businessChallenge,
    })
    .then(
      function (response) {
        alert("SUCCESS! Your message has been sent.");
      },
      function (error) {
        alert("FAILED to send message. Please try again later.");
      }
    );
});
