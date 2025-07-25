# Setting Up EmailJS for Newsletter Subscription Emails

Follow these steps to set up EmailJS for sending confirmation emails when users subscribe to your newsletter:

## 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## 2. Add an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Name your service `service_efresh` (or update the name in newsletter.js)

## 3. Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Name your template `template_newsletter` (or update the name in newsletter.js)
4. Design your email template or use the HTML from `email-templates/newsletter-welcome.html`
5. Make sure to include the following template variables:
   - `{{to_email}}` - Subscriber's email address
   - `{{to_name}}` - Subscriber's name (extracted from email)
   - `{{subject}}` - Email subject
   - `{{unsubscribe_link}}` - Link to unsubscribe

## 4. Get Your User ID

1. In your EmailJS dashboard, go to "Account" > "API Keys"
2. Copy your "Public Key"
3. Open `js/newsletter.js` and replace `YOUR_EMAILJS_USER_ID` with your public key

## 5. Test the Integration

1. Fill out the newsletter form on your website
2. Check if the email is sent successfully
3. Verify that the subscriber is added to your Firebase database

## Notes

- The free plan of EmailJS allows 200 emails per month
- For production use with higher volume, consider upgrading to a paid plan
- Make sure your email template is mobile-responsive
- Test the emails on different email clients to ensure proper display