import { logo } from "@/lib/media";
import { site } from "@/lib/site";

/**
 * LocalBusiness structured data.
 *
 * Only verified facts go in here — name, phone, email, town and social profile.
 * Nothing is invented: no opening hours, no price range, no aggregate rating.
 * Those fields stay out until the owner confirms them (see draftFlags).
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "#downsouth",
    name: site.name,
    description:
      "Pressure washing and soft washing for homes, driveways, sidewalks, decks, roofs and commercial property in Wade, NC and the surrounding area.",
    telephone: site.phone.e164,
    email: site.email,
    image: logo.badge,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: site.serviceArea.short,
    },
    sameAs: [site.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored JSON — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}