<?php


// $smtpHost = 'smtp.gmail.com';
// $smtpPort = 587;
// $smtpUsername = getenv('mensah1stephen@gmail.com'); // Use environment variable for your email
// $smtpPassword = getenv('JuventusFC'); // Use environment variable for your password

// if (!$smtpUsername || !$smtpPassword) {
//     die('SMTP credentials not configured. Please set the SMTP_USERNAME and SMTP_PASSWORD environment variables.');
// }

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $recipient = "mensah1stephen@gmail.com"; // Replace with your email address
//     $subject = "Enquiry from Website";
    
//     $name = sanitizeInput($_POST["Name"]);
//     $email = sanitizeInput($_POST["Email"]);
//     $phone = sanitizeInput($_POST["phone"]);
//     $qualificationSubject = sanitizeInput($_POST["QualificationSubject"]);
//     $enquirySubject = sanitizeInput($_POST["Title"]);
//     $message = sanitizeInput($_POST["Message"]);
    
//     if (validateEmail($email) && validateMessage($message)) {
//         $headers = "From: $email" . "\r\n" .
//                    "Reply-To: $email" . "\r\n" .
//                    "X-Mailer: PHP/" . phpversion();
        
//         $emailContent = "Name: $name\n" .
//                         "Email: $email\n" .
//                         "Phone: $phone\n" .
//                         "Qualification Subject: $qualificationSubject\n" .
//                         "Enquiry Subject: $enquirySubject\n" .
//                         "Message:\n$message";
        
//         require 'PHPMailer/PHPMailer.php';
//         require 'PHPMailer/SMTP.php';
//         require 'PHPMailer/Exception.php';

//         $mail = new PHPMailer\PHPMailer\PHPMailer();
//         $mail->IsSMTP();
//         $mail->Host = $smtpHost;
//         $mail->Port = $smtpPort;
//         $mail->SMTPAuth = true;
//         $mail->Username = $smtpUsername;
//         $mail->Password = $smtpPassword;

//         $mail->SetFrom($email);
//         $mail->AddAddress($recipient);
//         $mail->Subject = $subject;
//         $mail->Body = $emailContent;

//         if ($mail->Send()) {
//             // Redirect to thank you page using JavaScript
//             echo '<script>window.location.href = "http://127.0.0.1:5500/Tuition/thanks.html";</script>';
//             exit();
//         } else {
//             echo "There was a problem sending your enquiry. Please try again later.";
//         }
//     } else {
//         echo "Invalid email address or message. Please provide valid details.";
//     }
// }

// function sanitizeInput($input) {
//     $input = trim($input);
//     $input = stripslashes($input);
//     $input = htmlspecialchars($input);
//     return $input;
// }

// function validateEmail($email) {
//     return filter_var($email, FILTER_VALIDATE_EMAIL);
// }

// function validateMessage($message) {
//     return !empty($message);
// }

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $mailFrom = $_POST['mail'];
    $phone = $_POST['phone'];
    $qualificationSubject = $_POST['QualificationSubject'];
    $subject = $_POST['Title'];
    $enquiry = $_POST['message'];

    $mailTo = "contact@sytuition.co.uk";
    // look out for gmail method, as google blocks it //
    $headers = "From: ".$mailFrom;
    $txt = "You have received a new enquiry from ".$name.".\n\n".$message;

    mail($mailTo, $subject, $qualificationSubject, $txt, $headers);
    header("Location: contact.html?mailsend");
}
?>
