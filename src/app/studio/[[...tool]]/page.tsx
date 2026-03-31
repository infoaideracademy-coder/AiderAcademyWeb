import { metadata, viewport } from "next-sanity/studio";
import { hasRequiredSanityEnv } from "@/sanity/env";
import StudioClient from "./StudioClient";
import "./style.scss";

export { metadata, viewport };

export default function StudioPage() {
  if (!hasRequiredSanityEnv) {
    return (
      <main className="studio-setup-main">
        <section className="studio-setup-section">
          <div className="studio-setup-container container">
            <div className="studio-setup-card">
              <p className="studio-setup-card__eyebrow">Sanity Studio</p>
              <h1 className="studio-setup-card__title">Studio is installed and routed.</h1>
              <p className="studio-setup-card__description">
                Add your Sanity project values to <code>.env.local</code> to activate the embedded
                studio at <code>/studio</code>.
              </p>
              <div className="studio-setup-card__env-list">
                <code>NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id</code>
                <code>NEXT_PUBLIC_SANITY_DATASET=production</code>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <StudioClient />;
}
