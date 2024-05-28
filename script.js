// on load
$(window).on("load", function() {
  // preloader
  $(".dtr-preloader").delay(200).fadeOut(250);
  
  
}); // close on load
       
$(document).ready(function () {
//sticky Header
var wind = $(window);
var sticky = $(".header-wrap");
wind.on("scroll", function () {
  var scroll = wind.scrollTop();
  if (scroll < 100) {
    sticky.removeClass("sticky");
  } else {
    sticky.addClass("sticky");
  }
});

// Responsive mmenu

$('[data-owl-slider]').each(function() {
  const slider = $(this);
  slider.owlCarousel({
    nav: false,
    dots: true,
    loop: true,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    margin: 0,
    items: 1,
    thumbs: false,
    smartSpeed: 1300,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    autoHeight: false,
  });
});

$(".service-slider-one").owlCarousel({
  nav: false,
  dots: false,
  loop: false,
  navText: [
    '<i class="fa fa-arrow-left"></i>',
    '<i class="fa fa-arrow-right"></i>',
  ],
  margin: 25,
  items: 1,
  thumbs: false,
  smartSpeed: 1300,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  responsiveClass: true,
  autoHeight: false,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 4,
    },
  },
});
  $(".quick-slider").owlCarousel({
  nav: false,
  dots: false,
  loop: false,
  margin: 25,
  items: 1,
  thumbs: false,
  smartSpeed: 1300,
  autoplay: true,
  autoplayTimeout: 5500,
  autoplayHoverPause: true,
  responsiveClass: true,
  autoHeight: false,
  responsive: {
    0: {
      items: 1,
      loop:true
    },
    768: {
      items: 3,
      loop:true
    },
    1200: {
      items: 4,
    },
  },
});
$(".product-slider").owlCarousel({
  nav: false,
  dots: false,
  loop: true,
  navText: [
    '<i class="fa fa-arrow-left"></i>',
    '<i class="fa fa-arrow-right"></i>',
  ],
  margin: 25,
  items: 1,
  thumbs: false,
  smartSpeed: 1300,
  autoplay: true,
  autoplayTimeout: 5500,
  autoplayHoverPause: true,
  responsiveClass: true,
  autoHeight: false,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});

//Partner Slider
$(".partner-slider-one").owlCarousel({
  nav: false,
  dots: false,
  loop: true,
  margin: 15,
  items: 1,
  thumbs: false,
  smartSpeed: 3500,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  responsiveClass: true,
  autoHeight: true,
  responsive: {
    0: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 4,
    },
    1400: {
      items: 4,
    },
  },
});

$(".promo-slider").owlCarousel({
  nav: false,
  dots: false,
  loop: true,
  margin: 16,
  items: 1,
  thumbs: false,
  smartSpeed: 3500,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  responsiveClass: true,
  autoHeight: true,
  responsive: {
    0: {
      items: 1,
      margin: 16,
      autoplay: true,
      smartSpeed: 2500,
    },
    768: {
      items: 2,
      autoplay: true,
    },
    992: {
      items: 3,
    },
    1200: {
      items: 3,
    },
    1400: {
      items: 3,
    },
  },
});

// Check if the current page URL is the thankyou.php
if (window.location.pathname.endsWith("thankyou.php")) {
  const countdownElement = $("#countdown");
  let countdown = 3;

  function startCountdown() {
    countdownElement.text(countdown);
    countdown--;
    if (countdown < 0) {
      window.location.href = "index.php"; // Redirect to index.html
    } else {
      setTimeout(startCountdown, 1000); // Call the function every 1000ms (1 second)
    }
  }

  startCountdown(); // Start the countdown
}
});

// contact page form

$(document).ready(function () {
  // Function to validate phone number
function validatePhoneNumber(phoneNumber) {
    // Remove any non-numeric characters
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Check if the phone number has 10 or 11 digits
    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
        // Display error message
        $("#phone").siblings(".invalid-feedback").text("Please enter a valid phone number with 10 or 11 digits.");
        $("#phone").addClass("is-invalid"); // Add is-invalid class to indicate invalid input
        return false;
    }
    
    // If validation passes, remove any existing validation classes
    $("#phone").removeClass("is-invalid");
    $("#phone").siblings(".invalid-feedback").text("");
    
    return true;
}

// Validate phone number on form submission
$("#contactForm").on("submit", function (e) {
    // Prevent default form submission
    e.preventDefault();
    
    // Check if the select field has a valid option selected
    if (!$("select[name='contact_service_subject']").val()) {
        // If not, show an alert and return
        alert("Please select a reason for contact.");
        return;
    }
    
    // Collect form data
    let formData = $(this).serialize();
    
    // Get the phone number value
    var phoneNumber = $("#phone").val().trim();

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
        // If validation fails, return without submitting the form
        return;
    }

    // Disable the button and show the loader
    $("#contactSubmitBtn").prop("disabled", true);
    $("#loader").removeClass("d-none");

    // Send an Ajax request
    $.ajax({
        type: "POST",
        url: "generalContactMail.php",
        data: formData,
        success: function (response) {
            // Handle the response from the server
            alert('Thanks for Contacting Us. We will be in touch with you'); // Show a success message
            window.location.href = "/"; // Redirect to the homepage
        },
        error: function () {
            // Handle errors here
            alert('An error occurred while sending the message.');
        },
        complete: function () {
            // Re-enable the button and hide the loader regardless of success or error
            $("#contactSubmitBtn").prop("disabled", false);
            $("#loader").addClass("d-none");
        },
    });
});

 
});

// wizards
$(document).ready(function () {
  // Initialize a variable to count the steps
let totalSteps = 0;
// Loop to find elements with IDs starting with "step-"
for (let i = 1; ; i++) {
  const elementId = `step-${i}`;
  const stepElement = $(`#${elementId}`);
  // Check if the element with the current ID exists
  if (stepElement.length === 0) {
    break; // Exit the loop if no more elements are found
  }
  // Increment the totalSteps count
  totalSteps++;
  // Create a navigation link for the current step
  const navLink = ` <li class="nav-item"><a class="nav-link" href="#${elementId}"><span class="num">${i}</span></a></li>`;
  // Append the navigation link to the ul with id "step-navigation"
  $("#step-navigation").append(navLink);
}

// Initialize the SmartWizard plugin
$("#smartwizard").smartWizard({
  selected: 0, // Initial selected step, 0 = first step
  autoAdjustHeight: false,
  enableAllSteps: true,
  transitionEffect: "fade", // Set the transition effect ('slide', 'fade', 'slideleft', 'slideright', 'slideup', 'slidedown')
  transitionSpeed: "400", // Set the transition speed in milliseconds
  easing: "easeInOutExpo",
  enableUrlHash: false,
  theme: "dots",
  backButtonSupport: true,
  toolbarSettings: {
    toolbarPosition: "bottom", // Show the toolbar at the bottom
    showNextButton: false,
  },
  onLeaveStep: function (anchorObject, stepIndex, stepDirection) {
    // Disable the "Submit" button by default
    $('.dtr-btn[name="quote_submit"]').prop("disabled", true);

    // Enable the "Submit" button on the last step
    if (stepIndex === totalSteps - 1) {
      $('.dtr-btn[name="quote_submit"]').prop("disabled", false);
    }
    return true;
  },
});

// Handle step change event
$("#smartwizard").on(
  "showStep",
  function (e, anchorObject, stepNumber, stepDirection) {
    if (stepNumber === 0) {
      $(".sw-btn-prev").hide(); // Hide the previous button on the first step
    } else {
      $(".sw-btn-prev").show(); // Show the previous button on other steps
    }
  }
);


// For demonstration purposes, simulate next button click on radio change
for (let i = 1; i <= 18; i++) {
  $(`input[name="q${i}"], select[name="q${i}"]`).on("change", function () {
    // Get the current step content
    const currentStepContent = $(`#step-${i}`);

    // Hide the current step content with a fade-out animation
    currentStepContent.fadeOut(400, function () {
      // Move to the next step after the fade-out animation is complete
      $("#smartwizard").smartWizard("next");

      // Get the next step content
      const nextStepContent = $(`#step-${i + 1}`);

      // Show the next step content with a fade-in animation
      nextStepContent.fadeIn(400);
    });
  });
}


//quote form ajax
$("#quote-form").on("submit", function (e) {
e.preventDefault(); // Prevent the default form submission

// Check Parsley validation
if ($("#quote-form").parsley().isValid()) {
    // If the form is valid, continue with submission

    // Disable the submit button and show the loader
    const submitButton = $('.btn-quote[name="quote_submit"]');
    submitButton.prop("disabled", true);
    $("#loader").css("display", "inline-block");

    // Get the dynamic URL from the hidden input field
    const dynamicURL = $("#formAction").val();

    // Perform AJAX form submission with the dynamic URL
    $.ajax({
        type: "POST",
        url: dynamicURL, // Use the dynamic URL
        data: $("#quote-form").serialize(), // Serialize the form data
        dataType: "json", // Expect JSON response from the server
        success: function (response) {
            // Hide the loader
            $("#loader").hide();

            // Re-enable the submit button
            submitButton.prop("disabled", false);

            // Check the response status
            if (response.status === "success") {
                alert(response.message); // Display success message

                // Redirect to index.php or any other desired URL
                window.location.href = "/";
            } else {
                alert(response.message); // Display error message
            }
        },
        error: function (error) {
            // Handle the AJAX error
            console.error(error);

            // Hide the loader
            $("#loader").hide();

            // Re-enable the submit button
            submitButton.prop("disabled", false);
            alert("Form submission failed. Please try again.");
        },
    });
}


});

}); //document.ready

// For Ideal postal codes uk
const postcodeInput = document.getElementById("postcode");
const addressSelect = document.getElementById("addressSelect");
const manualAddressInput = document.getElementById("manualAddressInput");

postcodeInput.addEventListener("input", () => {
    $(postcodeInput).parsley().validate(); // Trigger Parsley validation

    if ($(postcodeInput).parsley().isValid()) {
        const inputPostcode = postcodeInput.value.replace(/\s+/g, "").toUpperCase();
        fetchAddressSuggestions(inputPostcode);
    } else {
        clearAddressSuggestions();
    }
});

async function fetchAddressSuggestions(postcode) {
    try {
        const response = await fetch(
            `includes/ideal_postcodes_api.php?postcode=${encodeURIComponent(postcode)}`
        );
        if (response.ok) {
            const data = await response.json();
            console.log("Parsed Response:", data);

            const addressSuggestions = data.result;
            console.log("Address Suggestions:", addressSuggestions);
            if (addressSuggestions && addressSuggestions.length > 0) {
                // Display select options and exclude the input from Parsley validation
                addressSelect.style.display = "block";
                manualAddressInput.style.display = "none";
                addressSelect.setAttribute("data-parsley-excluded", false);
                manualAddressInput.setAttribute("data-parsley-excluded", true);
                populateSelectOptions(addressSuggestions);
            } else {
                // If no suggestions, show the manual address input field and exclude the select from Parsley validation
                addressSelect.style.display = "none";
                manualAddressInput.style.display = "block";
                addressSelect.setAttribute("data-parsley-excluded", true);
                manualAddressInput.setAttribute("data-parsley-excluded", false);
            }
        } else {
            console.error("Error fetching data:", response.status);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function populateSelectOptions(addressSuggestions) {
    console.log("Populating Select:", addressSuggestions);
    addressSelect.innerHTML = "";
    for (const suggestion of addressSuggestions) {
        const addressLine = `${suggestion.line_1}, ${suggestion.post_town}, ${suggestion.county}, ${suggestion.postcode}`;
        if (addressLine) {
            const option = document.createElement("option");
            option.value = addressLine;
            option.text = addressLine;

            addressSelect.appendChild(option);
        }
    }
}

function clearAddressSuggestions() {
    addressSelect.innerHTML = "";
}

// For Ideal postal codes uk : end

$(function () {
$("#getStartedForm")
  .parsley()
  .on("form:submit", function () {
    const form = document.getElementById("getStartedForm");

    // Check if the form is valid according to Parsley
    if ($(form).parsley().isValid()) {
      // Verify reCAPTCHA response
      const recaptchaResponse = grecaptcha.getResponse();

      if (recaptchaResponse === "") {
        // reCAPTCHA not completed, show an error message or take appropriate action
        //alert("Please complete the reCAPTCHA.");
      const recaptchaField = $("#recaptcha-field"); // Replace with the actual field ID
        recaptchaField.parsley().addError('custom', {
          message: 'Please complete the reCAPTCHA.',
          updateClass: true,
        });
        // Insert the error message into the recaptcha-field
        recaptchaField.append('<div class="error-message">Please complete the reCAPTCHA.</div>');
        return false; // Prevent form submission
      }

      // Continue with form submission
      const formData = new FormData(form);
      const submitButton = $("#submitFormButton");
      const loader = $("#loader");

      // Show loader and hide submit button text
      submitButton.prop("disabled", true); // Disable the button
      loader.removeClass("d-none").addClass("d-inline-block");

      // Include the reCAPTCHA response in the form data
      formData.append("recaptcha_response", recaptchaResponse);

      // Send form data using fetch and ES6 arrow functions
      fetch("initial_quote.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          // Hide loader and show submit button text
          submitButton.prop("disabled", false); // Enable the button again
          loader.removeClass("d-inline-block").addClass("d-none");
          // Store form data in local storage
          localStorage.setItem("formData", JSON.stringify(formData));

          // Redirect to the getquote.php page
        // window.location.href = "https://boilerquote.000webhostapp.com/offer-page?utm_source=meraboiler"; // Replace with the actual URL
         window.location.href = "quote";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    return false; // Don't submit form for this demo
  });
});

//parsley validation
const input = document.querySelector("#custMobile");
const iti = window.intlTelInput(input, {
onlyCountries: ["gb"],
});

window.Parsley.addValidator("phonenum", {
validateString: function (value) {
  const inputValue = value.replace(/\D/g, ""); // Remove non-numeric characters
  const startsWithDialCode =
    inputValue.startsWith("+44") || inputValue.startsWith("0");

  const isValidNumber = iti.isValidNumber();

  const ukPhoneNumberPattern =
    /^(?:(?:\+44)|(?:0))(?:(?:(?:1\d{3})|(?:7[1-9]\d{2})|(?:20\d{2})|(?:3(?:0[0-5]|[68]\d)\d)|(?:4[0-4]\d{2})|(?:5[0-5]\d{2})|(?:9(?:6[0-9]|7[0-2])\d))\s?\d{6,8}|((?:(?:1\d{2}|20\d{1}|3(?:0[0-5]|[68]\d{1})|4[0-4]\d{1}|5[0-5]\d{1}|9(?:6[0-9]|7[0-2])\d{1}))\s?\d{3,4}\s?\d{3,4}))$/;
  return isValidNumber || ukPhoneNumberPattern.test(inputValue);
},
});

input.addEventListener("input", () => {
$(input).parsley().validate(); // Trigger Parsley validation
});
//postal code validation
const postalcodeInput = document.querySelector("#postcode");

postalcodeInput.addEventListener("input", () => {
$(postalcodeInput).parsley().validate(); // Trigger Parsley validation
});
