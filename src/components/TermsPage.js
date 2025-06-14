import React from "react";

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: 850, margin: "0 auto", padding: "2em 1em" }}>
      <h1 className="display-5 page-title text-center mb-4">
        Terms of Service, Legal Disclaimer & Privacy Policy
      </h1>
      <h2 className="h5 text-danger text-center mb-4">
        TexasRoofing.info is NOT affiliated with TexasRoofing.com or any other similarly named companies.
      </h2>

      <div className="card p-4 mb-4" style={{ background: "#fafaff" }}>
        <h3 className="h6 text-primary mb-2">General Information</h3>
        <p>
          TexasRoofing.info is an informational and referral platform only. We provide free roof inspection scheduling and connect homeowners with professional, licensed roofers in Dallas-Fort Worth and all North Texas. We do not directly perform roofing work. All roof repairs, inspections, and replacements are performed by independent, licensed contractors.
        </p>
        <p>
          By using this website, you agree to these terms and disclaimers. If you do not agree, please do not use this site.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">No Affiliation</h3>
        <p>
          <b>TexasRoofing.info is not affiliated, associated, endorsed by, or in any way officially connected with TexasRoofing.com, Texas Roofing Company, or any other companies with similar names.</b> All trademarks and registered trademarks are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Referral Disclaimer</h3>
        <p>
          All roofing inspections, repairs, and replacements are performed by independent third-party contractors who are licensed, insured, and responsible for their own work and warranties. TexasRoofing.info is not liable for the performance or outcome of any work, and does not guarantee any service, quote, or claim process outcome. Always verify the credentials of any contractor before proceeding.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Not Professional Advice</h3>
        <p>
          The content provided on this site is for informational purposes only and should not be construed as professional, legal, or insurance advice. Always consult a qualified professional regarding your specific roofing, insurance, or legal situation.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Insurance & Coverage Disclaimers</h3>
        <p>
          Insurance coverage, claim approval, and timelines vary based on your policy, provider, and the specifics of each claim. We cannot guarantee any particular outcome, eligibility, or approval for your roof replacement or repair. All insurance decisions are at the sole discretion of your insurance provider.
        </p>
        <p>
          Always review your insurance policy and speak with your insurance company for detailed coverage information.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Privacy Policy</h3>
        <p>
          We respect your privacy and only collect information needed to provide roofing inspection referrals. Information submitted via forms may be shared with our trusted contractor partners for scheduling and service purposes. We do not sell your information to third parties. See our full privacy policy below.
        </p>
        <p>
          For any privacy concerns or requests to delete your data, email us at: <a href="mailto:info@texasroofing.info">info@texasroofing.info</a>.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Limitation of Liability</h3>
        <p>
          TexasRoofing.info is not liable for any damages or losses incurred as a result of the use of this website, referrals, or any actions taken by independent contractors. Your use of this website and any related services is at your own risk.
        </p>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="h6 text-primary mb-2">Changes to Terms</h3>
        <p>
          We may update these terms at any time. Please review this page regularly for changes. Continued use of this website constitutes acceptance of these terms.
        </p>
      </div>

      <div className="text-center text-secondary mt-4" style={{ fontSize: "0.95em" }}>
        <strong> {new Date().getFullYear()} TexasRoofing.info  </strong>
      </div>
    </div>
  );
}
