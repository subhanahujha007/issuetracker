Issue tracker build with  Radix UI, Clerk, Tailwind, and More
This project is a Next.js application bootstrapped with create-next-app, featuring technologies such as Next.js, Redis, Radix UI, Shadcn, Clerk, Tailwind CSS, Zod, TypeScript, MongoDB, and React Hook Form.

Getting Started
To get started with this project, follow these steps:

Set Up Environment Variables:
Create an env.local file and configure the following environment variables:

makefile
Copy code  


NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=


CLERK_SECRET_KEY=


NEXT_PUBLIC_domain=http://localhost:3000/


DATABASE_URL=


Replace NEXT_PUBLIC_domain with your domain name after deployment.

Start the Development Server:

bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

Start Editing:
You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

Additional Setup
This project uses next/font to automatically optimize and load Inter, a custom Google Font.

Learn More
To learn more about Next.js, explore these resources:

Next.js Documentation - Learn about Next.js features and API.
Learn Next.js - Interactive Next.js tutorial.
You can also check out the Next.js GitHub repository for feedback and contributions.

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

Feel free to customize and expand upon this README to suit your project's specific needs. Happy coding! 🚀
