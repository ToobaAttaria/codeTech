# CodeTech

Responsive, frontend-only website for CodeTech short courses and internship programs. Built with React, Vite, Tailwind CSS, and Lucide React.

The hero and About visuals are locally rendered SVG/CSS artwork. No external video asset or video service is required.

## Requirements

- Node.js 18 or newer
- npm

## Install and run locally

Run these commands from the project folder:

```bash
npm install
npm run dev
```

Vite prints a local development URL when the server starts.

## Application forms

The two program types use separate Google Forms, configured as named constants in `src/data/site.js`:

- `shortCoursesFormUrl` — [Short Courses form](https://forms.gle/KJepdft99gRRrjAR8).
- `internshipApplicationFormUrl` — [Internship Application form](https://forms.gle/4xsUShdmSWWkCqcH6).

Each course button opens the short course form, and each internship button opens the internship form in a new tab. Update the corresponding constant in `src/data/site.js` if either form changes. Applications are submitted through Google Forms; this website does not store submissions.

## Reviews and contact details

Review content for short courses and internships is in `src/data/reviews.js`. All ten displayed testimonials are sample/demo content, not verified student reviews. Replace them only with genuine feedback approved for publication. The website contact links currently use `codetech4141@gmail.com`, `03482278415`, and the related WhatsApp link.

### Firestore preparation

The Firebase Web SDK setup is in `src/lib/firebase.js`. Copy `.env.example` to `.env` and enter the Firebase web app configuration values for project `codetech-80902`. Do not put service-account credentials or private keys in frontend environment variables.

The `reviews` collection document shape is written by `submitReview` in `src/lib/reviews.js`: `name`, `course`, `rating`, `reviewText`, `consentToPublish`, `status`, and `createdAt`. New review payloads use `status: "pending"` and a Firestore server timestamp. The site queries only reviews where `status` is `approved` and `consentToPublish` is `true`; the existing demo reviews remain visible and are individually labeled.

The review form is connected to Firestore. The root `firestore.rules` file allows public reads only for approved reviews with publication consent, accepts only valid pending review submissions, and denies public updates, deletes, and access to other collections. In Firebase Console, open **Firestore Database → Rules**, replace the editor contents with `firestore.rules`, and publish the rules; do not accept public submissions until this is done. An authorized person must manually change a review's status to `approved` in Firebase Console before it can appear publicly. The approved-review query uses equality filters on `status` and `consentToPublish`; Firestore's automatic equality-index merging normally serves it without a composite index. If Firestore reports a missing-index error, follow its link to create the requested index.

## Production build and preview

```bash
npm run build
npm run preview
```

Vite writes the deployable static site to `dist/`.

## Deploy to Netlify or Vercel

Do not commit the generated `dist/` directory. From the dashboard of either service, import the GitHub repository or manually deploy this project folder, then set:

- **Build command:** `npm run build`
- **Publish/output directory:** `dist`
- **Framework preset (Vercel):** Vite
- **Base/project directory:** the folder containing this `package.json`

For a local manual Netlify upload, first run `npm run build`, then upload the generated `dist/` folder. For Git-based deployment, connect the repository and let the host run the build command on each deployment. Replace and verify the Google Form URL before publishing. No public deployment has been performed.
