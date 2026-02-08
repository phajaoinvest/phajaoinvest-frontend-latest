import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center text-primary">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none text-sm">
            <p className="text-white mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">1. Information We Collect</h2>
              <p className="mb-4 text-white">
                Phajaoinvest collects and processes various types of information to provide our investment and financial
                services. The information we collect includes:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">1.1 Personal Identification Information</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Full name, date of birth, and government-issued identification</li>
                <li>Contact details (email address, phone number, physical address)</li>
                <li>Nationality and tax residency information</li>
                <li>Identity verification documents as required by regulations</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">1.2 Financial Information</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Investment portfolio data and trading activity</li>
                <li>Account balances and transaction history</li>
                <li>Bank account details for fund transfers and withdrawals</li>
                <li>Investment objectives, risk tolerance, and financial goals</li>
                <li>Source of funds and income verification</li>
                <li>Credit and background check information where applicable</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">1.3 Technical and Usage Data</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Login credentials and authentication data</li>
                <li>Platform usage patterns and feature interactions</li>
                <li>Communication records with customer support</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">1.4 Investment-Related Data</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Stock picks and investment preferences</li>
                <li>Market analysis requests and research queries</li>
                <li>Subscription and payment information</li>
                <li>Trading account credentials for international platforms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">2. How We Use Your Information</h2>
              <p className="mb-4 text-white">
                We process your personal data based on the following legal grounds and for the purposes described below:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">2.1 Service Provision (Contract Performance)</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Execute and manage investment services with targeted returns</li>
                <li>Process and manage premium membership subscriptions</li>
                <li>Provide personalized stock analysis, recommendations, and market insights</li>
                <li>Facilitate international stock trading account setup and maintenance</li>
                <li>Deliver financial news and market updates in Laos language</li>
                <li>Process payments, withdrawals, and account transactions</li>
                <li>Provide customer support and respond to service inquiries</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.2 Legal and Regulatory Compliance</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Verify customer identity and prevent fraud (KYC/AML compliance)</li>
                <li>Comply with financial services regulations and reporting requirements</li>
                <li>Respond to legal requests and regulatory inquiries</li>
                <li>Maintain records as required by applicable laws</li>
                <li>Report suspicious transactions to relevant authorities</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.3 Legitimate Business Interests</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Improve and optimize our platform, services, and user experience</li>
                <li>Conduct data analysis and market research</li>
                <li>Develop new features and investment products</li>
                <li>Detect and prevent security threats, fraud, and illegal activities</li>
                <li>Send service notifications and account updates</li>
                <li>Resolve disputes and enforce our terms of service</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.4 With Your Consent</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Send marketing communications about new services and features</li>
                <li>Share information with third-party partners for enhanced services</li>
                <li>Use cookies and tracking technologies for analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">3. Information Sharing and Disclosure</h2>
              <p className="mb-4 text-white">
                <strong>We do not sell your personal information to third parties or marketers for any purpose.</strong> We may share your information only in the following circumstances:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">3.1 Service Providers and Business Partners</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Payment processors and banking institutions for transaction processing</li>
                <li>International brokerage firms for trading account setup and management</li>
                <li>Technology service providers for platform hosting and maintenance</li>
                <li>Customer support and communication service providers</li>
                <li>Data analytics and research partners (anonymized data only)</li>
                <li>Identity verification and fraud prevention services</li>
              </ul>
              <p className="mb-4 text-white text-sm italic">
                All third-party service providers are contractually obligated to use your information only for performing services on our behalf and to maintain appropriate security measures.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">3.2 Legal and Regulatory Requirements</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Government authorities and regulatory bodies as required by law</li>
                <li>Law enforcement agencies for fraud investigation and prevention</li>
                <li>Tax authorities for reporting and compliance purposes</li>
                <li>Courts and legal proceedings when legally compelled</li>
                <li>Financial crime prevention agencies for AML/CTF compliance</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">3.3 Business Transfers</h3>
              <p className="mb-4 text-white">
                In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the successor entity, subject to the same privacy protections.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">3.4 With Your Consent</h3>
              <p className="mb-4 text-white">
                We may share information with other parties when you explicitly consent to such sharing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">4. Data Security and Protection</h2>
              <p className="mb-4 text-white">
                We implement industry-standard security measures to protect your personal and financial information. Our security practices include:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">4.1 Technical Security Measures</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>End-to-end encryption for sensitive data transmission (TLS/SSL)</li>
                <li>Encrypted storage of financial and personal information at rest</li>
                <li>Secure authentication protocols including multi-factor authentication (MFA)</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Intrusion detection and prevention systems</li>
                <li>Secure API integrations with third-party services</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">4.2 Organizational Security Measures</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Role-based access controls limiting employee access to customer data</li>
                <li>Regular security training for staff members</li>
                <li>Incident response and breach notification procedures</li>
                <li>Secure disposal of data when no longer required</li>
                <li>Vendor security assessments for third-party service providers</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">4.3 Data Retention</h3>
              <p className="mb-4 text-white">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Specifically:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Active account data: Retained for the duration of your account plus 7 years for regulatory compliance</li>
                <li>Transaction records: Maintained for a minimum of 7 years as required by financial regulations</li>
                <li>Identity verification documents: Retained for 7 years after account closure</li>
                <li>Marketing data: Retained until you opt-out or withdraw consent</li>
              </ul>
              <p className="mb-4 text-white">
                <strong>Important:</strong> While we implement robust security measures, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but continually work to enhance our protective measures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">5. Your Privacy Rights</h2>
              <p className="mb-4 text-white">
                You have the following rights regarding your personal information. To exercise these rights, please contact us using the information in Section 7.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">5.1 Access and Correction</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Access your personal information we hold</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Receive a copy of your data in a structured, machine-readable format</li>
                <li>Update your account information through your dashboard</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">5.2 Deletion and Restriction</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Request deletion of your personal information (subject to legal retention requirements)</li>
                <li>Restrict processing of your personal data in certain circumstances</li>
                <li>Object to processing based on legitimate interests or for direct marketing</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">5.3 Marketing and Communications</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Opt-out of marketing communications at any time via unsubscribe links</li>
                <li>Manage communication preferences in your account settings</li>
                <li>Continue receiving essential service notifications even after opting out of marketing</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">5.4 Data Portability</h3>
              <p className="mb-4 text-white">
                You have the right to receive your personal data in a portable format and transmit it to another service provider where technically feasible.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">5.5 Complaints and Appeals</h3>
              <p className="mb-4 text-white">
                You have the right to file a complaint with relevant data protection authorities if you believe your privacy rights have been violated. We encourage you to contact us first so we can address your concerns directly.
              </p>
              <p className="mb-4 text-white text-sm italic">
                <strong>Note:</strong> Some rights may be limited by legal obligations to retain certain information for regulatory compliance, fraud prevention, or dispute resolution purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">6. Cookies and Tracking Technologies</h2>
              <p className="mb-4 text-white">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">6.1 Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li><strong>Essential Cookies:</strong> Required for platform functionality, authentication, and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our platform</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Collect data about usage patterns to improve our services</li>
              </ul>
              <p className="mb-4 text-white">
                You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">7. International Data Transfers</h2>
              <p className="mb-4 text-white">
                As we facilitate international stock trading and work with global financial service providers, your information may be transferred to and processed in countries outside of Laos. We ensure that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>All international transfers comply with applicable data protection laws</li>
                <li>Adequate safeguards are in place to protect your information</li>
                <li>Third-party recipients maintain appropriate security standards</li>
                <li>Data is transferred only for the purposes outlined in this policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">8. Changes to This Privacy Policy</h2>
              <p className="mb-4 text-white">
                We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal requirements. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white space-y-2 font-light">
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Notify you via email or platform notification for significant changes</li>
                <li>Provide you with an opportunity to review the updated policy</li>
                <li>Obtain your consent where required by law</li>
              </ul>
              <p className="mb-4 text-white">
                We encourage you to review this Privacy Policy regularly to stay informed about how we protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">9. Contact Us</h2>
              <p className="mb-4 text-white">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">Data Protection Contact</h3>
              <ul className="list-none mb-4 text-white space-y-2">
                <li><strong>Email:</strong> privacy@Phajaoinvest.la</li>
                <li><strong>Phone:</strong> 020 78856194</li>
                <li><strong>WhatsApp:</strong> +856 2078856194</li>
                <li><strong>Address:</strong> Phajaoinvest, Vientiane, Laos</li>
              </ul>
              <p className="mb-4 text-white">
                We will respond to your inquiry within 30 days of receipt. For urgent security or privacy concerns, please mark your communication as "Urgent - Privacy Request."
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
