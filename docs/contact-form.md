# Contact form

The home page (`/#contacto`) and `/contacto` use `src/components/ContactForm.astro`. The home hero and header link directly to the form; a link next to the form opens the dedicated contact page.

The form submits directly to `https://api.web3forms.com/submit` using HTML POST. Name, email, and message are required and validated by the browser. No JavaScript or local backend is needed. Web3Forms displays the submission result after navigation; delivery depends on the service accepting the configured access key.

The access key is a public form identifier, not a server secret. Its destination mailbox is configured in Web3Forms; changing `company.email` does not change that destination. The visible contact email and structured data are centralized in `src/config/company.ts`.

Run `npm run test:contact` to build the site and check the rendered forms, required fields, contact email, page navigation, and canonical URL. Run `npm run check` for Astro diagnostics. Browser tests should intercept the Web3Forms endpoint to avoid sending real messages.
