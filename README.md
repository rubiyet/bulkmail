# Bulk Email Sender

## Overview
The **Bulk Email Sender** is a simple and efficient tool designed to send multiple emails with rotating subjects and email bodies. It supports both **HTML and plain text emails** and provides the ability to send attachments as **PDF, JPEG, or PNG**.

## Features
- **Bulk Email Sending**: Send multiple emails in one go with rotating subjects and email bodies.
- **Supports HTML & Plain Text**: Automatically detects if the email content is HTML or plain text.
- **Attachment Options**: Convert email content into PDF, JPEG, or PNG attachments.
- **Email Personalization**: Use dynamic tags to insert recipient details.
- **Test Email Feature**: Send a test email before bulk sending.
- **Real-Time Email Count**: Monitor sent email progress.
- **Error Handling & Alerts**: Displays success/failure messages.
- **Reset & Open New Tab**: Easily clear input fields and open new tabs for reference.

---

## How to Use
### 1. Input Fields
#### Emails (Required)
- Enter recipient emails, **each on a new line**.
- Example:
  ```
  example1@gmail.com
  example2@yahoo.com
  example3@hotmail.com
  ```

#### Subject (Required)
- Enter multiple subjects, **each on a new line**.
- If emails exceed subjects, subjects rotate.
- Example:
  ```
  Subject 1
  Subject 2
  ```

#### Email Body (Box 1 - 3)
- Enter email content (HTML or plain text).
- If emails exceed available bodies, bodies rotate.

#### Your Email (Required)
- Enter the **Gmail** address used to send emails.

#### Your Gmail App Password (Required)
- Provide the **Gmail app password** (generated via Google's security settings).

#### Attachment Type
- **None**: No attachment.
- **PDF, JPEG, PNG**: Converts email body into selected file format.

---

### 2. Buttons & Actions
- **Send Emails**: Sends bulk emails with rotating subjects and bodies.
- **Test Email**: Sends a single test email to verify setup.
- **Reset**: Clears all input fields.
- **Open New Tab**: Opens a new tab for reference.

---

### 3. Additional Functionalities
#### Alerts
- "Email, Subject, User Email, and User Password are required."
- "Email sent successfully!"
- "Username and App Password not accepted."
- "Email failed to send."

#### Real-Time Email Count
- Displays progress: `Send Count: X of Y`.

#### File Naming for Attachments
- Random filenames (numbers & uppercase letters) are generated.

#### Tags for Email Personalization
| Tag  | Description |
|------|------------|
| `$email` | Inserts recipient’s email. |
| `$ran` | Generates an 8-character string (mix of numbers & uppercase letters). |
| `$id` | Generates an 8-character string (mix of numbers & lowercase letters). |
| `$num` | Generates a random 3-digit number with 2 decimal places. |
| `$name` | Inserts a random name. |

---

## Contact
For support or feedback, please reach out to the project maintainer.

---

Enjoy sending emails efficiently! 🚀
