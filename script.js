// testimonial swiperr



var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  
  // function sendEmail() {
  //   Email.send({
  //     Host: "smtp.elasticemail.com",
  //     Username: "mensah1stephen",
  //     Password: "JuventusFC22220?",
  //     To: "mensah1stephen@gmail.com",
  //     From: document.getElementById("Email").value,
  //     Subject: "New SYTuition Form Enquiry",
  //     Body:
  //       "Name: " +
  //       document.getElementById("Name").value +
  //       "<br> Email: " +
  //       document.getElementById("Email").value +
  //       "<br> Phone Number: " +
  //       document.getElementById("phone").value +
  //       "<br> Qualification: " +
  //       document.getElementById("qualification").value +
  //       "<br> Enquiry Subject: " +
  //       document.getElementById("Title").value +
  //       "<br> Message: " +
  //       document.getElementById("Message").value,
  //   }).then((message) => alert(message));
  // }




  // scroll for contact page submission form


  
  // document.addEventListener("DOMContentLoaded", function() {
  //   const scrollLinks = document.querySelectorAll("a[href^='#']");
  
  //   for (const scrollLink of scrollLinks) {
  //     scrollLink.addEventListener("click", function(event) {
  //       event.preventDefault();
  //       const targetId = scrollLink.getAttribute("href");
  //       const targetElement = document.querySelector(targetId);
  //       const headerHeight = 0; // Adjust this value if you have a fixed header
  
  //       // Scroll smoothly to the target element
  //       window.scroll({
  //         behavior: "smooth",
  //         left: 0,
  //         top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight
  //       });
  //     });
  //   }
  // });


  function scrollToForm() {
    const formSection = document.querySelector('#scrollToSection');
    formSection.scrollIntoView({ behavior: 'smooth' });
  }


// send emails backend



  const express = require("express");
  const bodyParser = require("body-parser");
  const nodemailer = require("nodemailer");
  
  const app = express();
  const port = 3000; // Replace with your desired port
  
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // API endpoint to handle the form submission and send email
  app.post("/send-enquiry", (req, res) => {
    const formData = req.body;
  
    // Create a transporter with your email service provider's SMTP configuration
    const transporter = nodemailer.createTransport({
      service: "your_email_service_provider",
      auth: {
        user: "your_email_address",
        pass: "your_email_password",
      },
    });
  
    // Email details
    const mailOptions = {
      from: formData.email,
      to: "your_email_address", // Replace with your email address where you want to receive enquiries
      subject: formData.subject,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
    };
  
    // Send the email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "An error occurred while sending the email." });
      } else {
        console.log("Email sent: ", info.messageId);
        res.json({ message: "Enquiry sent successfully!" });
      }
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });







//   function submitForm() {
//     // Get form data
//     var formData = new FormData(document.getElementById("enquiryForm"));

//     // Perform AJAX form submission
//     fetch("send-email.php", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => {
//         if (response.ok) {
//             // Show thank you popup
//             alert("Thank you for your enquiry! Please contact us at mensah1stephen@gmail.com.");
//             // Redirect to thank you page
//             window.location.href = "http://127.0.0.1:5500/Tuition/thanks.html";
//         } else {
//             console.error("Error submitting form.");
//         }
//     })
//     .catch(error => {
//         console.error("Error submitting form:", error);
//     });
// } 



function submitForm() {
  var formData = new FormData(document.getElementById("enquiryForm"));

  fetch("send-email.php", {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
          return response.text(); // Extract text from response
      } else {
          throw new Error("Error submitting form.");
      }
  })
  .then(result => {
      if (result === "success") {
          alert("Thank you for your enquiry! Please contact us at mensah1stephen@gmail.com.");
          window.location.href = "http://127.0.0.1:5500/Tuition/thanks.html";
      } else {
          console.error("Error processing form.");
      }
  })
  .catch(error => {
      console.error("Error submitting form:", error);
  });
}
  