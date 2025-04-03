<?php
// Ensure no output has been sent before the header redirect
ob_start();

// Identify which form was submitted based on the fields
if (isset($_POST['arrival-date'])) {
    // This is the contact form at the bottom of the page
    processContactForm();
} else if (isset($_POST['check_in'])) {
    // This is the tour search form at the top of the page
    processTourSearchForm();
} else {
    // Unknown form submission
    echo "Error: Unknown form submission";
    header('Location: index.html?status=error');
    exit();
}

// Process the main contact form
function processContactForm() {
    // Retrieve and sanitize form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $from = isset($_POST['from']) ? htmlspecialchars($_POST['from']) : '';
    $to = isset($_POST['to']) ? htmlspecialchars($_POST['to']) : '';
    $arrivalDate = isset($_POST['arrival-date']) ? htmlspecialchars($_POST['arrival-date']) : '';
    $duration = isset($_POST['duration']) ? htmlspecialchars($_POST['duration']) : '';
    $people = isset($_POST['people']) ? htmlspecialchars($_POST['people']) : '';

    // Set email addresses
    $fromEmail = $email; // Use the email address provided in the form
    $toEmail = 'info@skywings.com'; // Recipient's email address
    $subject = 'New Travel Information Request';

    // Prepare email body
    $body = "Name: $name<br>" .
            "Phone: $phone<br>" .
            "Email: $email<br>" .
            "From: $from<br>" .
            "To: $to<br>" .
            "Arrival Date: $arrivalDate<br>" .
            "Duration: $duration<br>" .
            "Number of People: $people";

    // Send email and handle success or failure
    sendEmail($fromEmail, $toEmail, $subject, $body);
}

// Process the tour search form
function processTourSearchForm() {
    // Retrieve and sanitize form data
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $country = isset($_POST['country']) ? htmlspecialchars($_POST['country']) : '';
    $destination = isset($_POST['destination']) ? htmlspecialchars($_POST['destination']) : '';
    $checkIn = isset($_POST['check_in']) ? htmlspecialchars($_POST['check_in']) : '';
    $checkOut = isset($_POST['check_out']) ? htmlspecialchars($_POST['check_out']) : '';
    $duration = isset($_POST['duration']) ? htmlspecialchars($_POST['duration']) : '';
    $members = isset($_POST['members']) ? htmlspecialchars($_POST['members']) : '';

    // Set email addresses
    $fromEmail = $email; // Use the email address provided in the form
    $toEmail = 'info@skywings.com'; // Recipient's email address
    $subject = 'New Tour Search Request';

    // Prepare email body
    $body = "Email: $email<br>" .
            "Country: $country<br>" .
            "Destination: $destination<br>" .
            "Check-in Date: $checkIn<br>" .
            "Check-out Date: $checkOut<br>" .
            "Duration: $duration days<br>" .
            "Number of Travelers: $members";

    // Send email and handle success or failure
    sendEmail($fromEmail, $toEmail, $subject, $body);
}

// Common function to send email
function sendEmail($fromEmail, $toEmail, $subject, $body) {
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $fromEmail" . "\r\n";

    // Log the email attempt (helpful for debugging)
    error_log("Attempting to send email: To: $toEmail, Subject: $subject");

    // Send email and handle success or failure
    if (mail($toEmail, $subject, $body, $headers)) {
        error_log("Email sent successfully");
        header('Location: index.html?status=success#thank-you');
        exit();
    } else {
        error_log("Email sending failed");
        header('Location: index.html?status=error#contact');
        exit();
    }
}
?>
