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
    // Show error modal
    const errorModal = document.getElementById("errorModal");
    errorModal.style.display = "block";
    console.log("Terms not accepted, showing error modal...");
    return;
  }

  // Generate the message field by concatenating form data
  const message = `
    Name: ${firstName} ${lastName}
    Company: ${company}
    Contact Number: ${contactNumber}
    Email: ${email}
    Area of Interest: ${areaOfInterest}
    Business Challenge: ${businessChallenge}
  `;

  // Send email via EmailJS
  emailjs
    .send("service_zhbt7jj", "template_nv7sh55", {
      from_name: firstName + " " + lastName,
      contact_number: contactNumber,
      company: company,
      email: email,
      area_of_interest: areaOfInterest,
      business_challenge: businessChallenge,
      message: message,
    })
    .then(
      function (response) {
        // Show success modal
        const successModal = document.getElementById("successModal");
        successModal.style.display = "block";
        console.log("Form submitted successfully, showing success modal...");
      },
      function (error) {
        alert("FAILED to send message. Please try again later.");
      }
    );
});

// Close the modals when the close buttons are clicked
document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".modal");
    modal.style.display = "none";
  });
});
