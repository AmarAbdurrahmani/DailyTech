<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // 1. Send email
    $to = "your-email@example.com"; // Change to your email
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $fullMessage = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    $mailSent = mail($to, $subject, $fullMessage, $headers);

    // 2. Save to file
    $file = "messages.txt";
    $entry = "Date: " . date("Y-m-d H:i:s") . "\n"
           . "Name: $name\n"
           . "Email: $email\n"
           . "Subject: $subject\n"
           . "Message: $message\n"
           . "------------------------------\n";

    file_put_contents($file, $entry, FILE_APPEND | LOCK_EX);

    // 3. Return response
    if ($mailSent) {
        echo "✅ Message sent successfully!";
    } else {
        echo "⚠️ Message saved but failed to send email.";
    }
}
?>
