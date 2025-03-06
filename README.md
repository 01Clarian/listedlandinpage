# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Development Server
Run the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Editing Pages
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Fonts
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact Form & Email Handling

This project supports a contact form that can be used for user inquiries.

### **Using Netlify Functions (For Netlify Deployment)**
- If deploying on Netlify, the contact form uses **Netlify Functions**.
- Start the local Netlify server with:
  ```bash
  netlify dev
  ```
- The form submission will be handled via `netlify/functions/send-email.js`.
- Ensure you have a `.env` file with:
  ```env
  RESEND_API_KEY=your_resend_api_key_here
  ```

### **Using Next.js API Routes (For Local Development & Vercel Deployment)**
- If running locally with `npm run dev`, Netlify functions won’t work.
- Instead, the contact form uses a **Next.js API Route** at `pages/api/contact.js`.
- Make sure you have a `.env.local` file with:
  ```env
  RESEND_API_KEY=your_resend_api_key_here
  ```
- The API will send emails to `gunita@listedbookings.com`, with the sender’s email as the reply-to.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deploy on Netlify
- If using **Netlify Functions**, ensure your site is connected to Netlify.
- Deploy with:
  ```bash
  netlify deploy --prod
  ```
- Make sure your Netlify environment variables include `RESEND_API_KEY`.

## Environment Variables
Create a `.env.local` file with:
```env
RESEND_API_KEY=your_resend_api_key_here
```

