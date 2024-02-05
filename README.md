Notification Task

Backend:-
Socket.io is used to send real time notification
On every visit lastLogin is updated to check when user is logged in
Cron Job is scheduled at morning 9 AM every day to check whom to send notification and mail for not visiting more than 5 days.
Nodemailer is used for sending mail. (For now I have used my personal mail id for smtp server)
JWT is used for token generation and bcrypt is used for password encryption.
For cart is taken as boolan to check if need to send the notification or not


Frontend:-
When user visit the website, it check for token if not present redirect to login.
User will get the notification after 5 minutes. If user clicked on make Payment then notification will disable for him
User will get the notification at 9 AM if he has not visited webapp for 5 days.
