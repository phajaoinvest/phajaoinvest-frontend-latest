import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-8 text-center text-primary underline">Terms of Service</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-white mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
              <p className="mb-4 text-white text-sm">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Phajaoinvest ("we," "us," or "our") governing your access to and use of our investment platform, services, and related offerings.
              </p>
              <p className="mb-4 text-white text-sm">
                <strong>By creating an account, accessing our platform, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.</strong> If you do not agree with any part of these Terms, you must immediately discontinue use of our services.
              </p>
              <p className="mb-4 text-white text-sm">
                You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>You are at least 18 years of age or the age of legal majority in your jurisdiction</li>
                <li>You have the legal capacity to enter into a binding agreement</li>
                <li>You are not prohibited from using our services under applicable laws</li>
                <li>All information you provide is accurate, current, and complete</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">2. Service Description and Offerings</h2>
              <p className="mb-4 text-white text-sm">
                Phajaoinvest operates as an investment advisory and facilitation platform providing the following services:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">2.1 Premium Membership Services</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Access to real-time financial news and market updates in Laos language</li>
                <li>Advanced stock analysis tools and proprietary market insights</li>
                <li>Educational resources and investment research materials</li>
                <li>Premium customer support and dedicated account management</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.2 Investment Advisory Services</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Curated stock picks and investment recommendations</li>
                <li>Portfolio analysis and performance tracking</li>
                <li>Market trend analysis and sector-specific insights</li>
                <li>Personalized investment strategies based on risk tolerance</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.3 Guaranteed Returns Investment Program</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Managed investment services with targeted annual returns above 15%</li>
                <li>Fixed-term investment options with predetermined maturity dates</li>
                <li>Regular performance reporting and transparency</li>
                <li>Professional fund management and portfolio optimization</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">2.4 International Trading Facilitation</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Assistance with international brokerage account setup</li>
                <li>Guidance on global market access and trading procedures</li>
                <li>Support for cross-border investment compliance</li>
                <li>Coordination with international financial service providers</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                <strong>Service Availability:</strong> We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice. Some services may have eligibility requirements or minimum investment thresholds.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">3. Subscription and Membership Terms</h2>
              <p className="mb-4 text-white text-sm">
                Premium memberships are offered in flexible subscription packages (3, 6, and 12-month terms) with the following conditions:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">3.1 Payment and Activation</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>All subscriptions require full upfront payment before activation</li>
                <li>Accepted payment methods: Bank transfer, QR code payment, and approved digital payment platforms</li>
                <li>Payment verification and account activation may take 1-3 business days</li>
                <li>Admin approval is required following payment verification and KYC compliance</li>
                <li>You will receive email confirmation upon successful subscription activation</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">3.2 Subscription Duration and Access</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Subscription period begins upon admin approval and account activation</li>
                <li>Full access to premium features is granted for the entire subscription term</li>
                <li>Subscriptions automatically expire at the end of the term without auto-renewal</li>
                <li>No prorated refunds for early termination after activation</li>
                <li>Renewal options will be communicated 30 days before expiration</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">3.3 Subscription Benefits</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Access to all premium content and analysis tools</li>
                <li>Priority customer support with dedicated account manager</li>
                <li>Exclusive market insights and investment recommendations</li>
                <li>Discounted rates on guaranteed return investment programs (where applicable)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">4. Investment Risk Disclosure and Disclaimer</h2>
              <p className="mb-4 text-white text-sm">
                <strong className="text-red-400 text-lg">IMPORTANT - PLEASE READ CAREFULLY:</strong>
              </p>
              <p className="mb-4 text-white text-sm">
                Investing in financial markets involves substantial risk of loss and is not suitable for all investors. Before using our investment services, you must understand and accept the following risks:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">4.1 General Investment Risks</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li><strong>Market Risk:</strong> Securities and investment values can decline due to market conditions, economic factors, and geopolitical events</li>
                <li><strong>Loss of Capital:</strong> You may lose some or all of your invested capital</li>
                <li><strong>Past Performance:</strong> Historical returns do not guarantee or predict future performance</li>
                <li><strong>Volatility:</strong> Investment values may fluctuate significantly in the short term</li>
                <li><strong>Liquidity Risk:</strong> You may not be able to sell investments quickly or at desired prices</li>
                <li><strong>Currency Risk:</strong> International investments are subject to exchange rate fluctuations</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">4.2 Targeted Returns Disclaimer</h3>
              <p className="mb-4 text-white text-sm">
                While our guaranteed returns program targets annual returns above 15%, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Targeted returns are goals, not guarantees, and actual returns may vary</li>
                <li>Market conditions, regulatory changes, and unforeseen events may impact performance</li>
                <li>Investment performance depends on multiple factors beyond our control</li>
                <li>You have reviewed and understood all program documentation and risk factors</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">4.3 Your Responsibilities</h3>
              <p className="mb-4 text-white text-sm">Before investing, you must:</p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Only invest funds you can afford to lose without impacting your financial well-being</li>
                <li>Carefully assess your financial situation, investment objectives, and risk tolerance</li>
                <li>Seek independent financial, legal, and tax advice from qualified professionals</li>
                <li>Read and understand all investment documentation, agreements, and disclosures</li>
                <li>Ensure investment decisions align with your personal financial goals and circumstances</li>
                <li>Regularly monitor your investments and stay informed about market conditions</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">4.4 Not Financial Advice</h3>
              <p className="mb-4 text-white text-sm">
                Information provided on our platform, including stock picks, market analysis, and recommendations, is for informational and educational purposes only and does not constitute personalized financial, investment, legal, or tax advice. We are not fiduciaries except where explicitly agreed in writing.
              </p>
              <p className="mb-4 text-white bg-red-900/20 p-4 rounded border border-red-500">
                <strong>BY USING OUR INVESTMENT SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND ACCEPTED ALL RISKS DESCRIBED ABOVE. YOU AGREE THAT ALL INVESTMENT DECISIONS ARE MADE AT YOUR OWN DISCRETION AND RISK.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">5. Payment Terms and Refund Policy</h2>
              <h3 className="text-md font-semibold mb-3 text-white">5.1 Payment Requirements</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>All payments must be made in full before service activation</li>
                <li>Payments are processed in USD or local currency as specified in your invoice</li>
                <li>You are responsible for all bank fees, transfer charges, and currency conversion costs</li>
                <li>Payment verification and processing may take 1-3 business days</li>
                <li>We reserve the right to reject payments from unverified or suspicious sources</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">5.2 Refund Policy</h3>
              <p className="mb-4 text-white text-sm">
                <strong>Subscriptions:</strong> Once your subscription is activated and services are accessible, no refunds will be provided for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Partial or unused subscription periods</li>
                <li>Change of mind or dissatisfaction with service</li>
                <li>Account termination initiated by you</li>
                <li>Failure to use services during the subscription term</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                <strong>Investment Services:</strong> Guaranteed return investments have separate withdrawal and redemption terms as specified in individual investment agreements. Early withdrawal may result in penalties or loss of projected returns.
              </p>
              <p className="mb-4 text-white text-sm">
                <strong>Exceptions:</strong> Refunds may be considered only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Service failure or extended downtime caused by Phajaoinvest (prorated refund)</li>
                <li>Duplicate payments or billing errors</li>
                <li>Payment made but services not activated within 7 business days</li>
                <li>Fraud or unauthorized transactions (subject to investigation)</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">5.3 Billing Disputes</h3>
              <p className="mb-4 text-white text-sm">
                Any billing disputes must be reported within 30 days of the transaction date. Contact our support team with transaction details and documentation. We will investigate and respond within 14 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">6. User Responsibilities and Acceptable Use</h2>
              <p className="mb-4 text-white text-sm">
                By using our services, you agree to the following responsibilities and restrictions:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">6.1 Account Security and Information Accuracy</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Provide accurate, current, and complete information during registration and KYC verification</li>
                <li>Promptly update your account information if it changes</li>
                <li>Maintain strict confidentiality of your login credentials and authentication methods</li>
                <li>Immediately notify us of any unauthorized access or security breach</li>
                <li>Accept responsibility for all activities conducted through your account</li>
                <li>Not share your account access with any third party</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">6.2 Lawful and Proper Use</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Use services only for lawful purposes and in compliance with all applicable laws</li>
                <li>Comply with financial regulations, tax laws, and reporting requirements in your jurisdiction</li>
                <li>Not engage in money laundering, fraud, or other illegal financial activities</li>
                <li>Report suspicious activities or potential violations to our compliance team</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">6.3 Content and Intellectual Property</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Not share, distribute, or resell premium content, analysis, or recommendations to non-subscribers</li>
                <li>Respect intellectual property rights of Phajaoinvest and third parties</li>
                <li>Not reproduce, duplicate, or commercially exploit our proprietary content without written permission</li>
                <li>Use content for personal investment purposes only, not for redistribution or commercial gain</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">6.4 Prohibited Activities</h3>
              <p className="mb-4 text-white text-sm">You expressly agree NOT to:</p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Attempt to gain unauthorized access to our systems, networks, or other users' accounts</li>
                <li>Use automated systems (bots, scrapers) to access or extract data from our platform</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Manipulate or misrepresent your identity or affiliation</li>
                <li>Engage in market manipulation, insider trading, or other prohibited trading practices</li>
                <li>Harass, abuse, or harm other users or our staff</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">7. Limitation of Liability and Disclaimers</h2>
              <p className="mb-4 text-white text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE FOLLOWING LIMITATIONS APPLY:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">7.1 Service Disclaimers</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind</li>
                <li>We do not guarantee uninterrupted, timely, secure, or error-free service operation</li>
                <li>We do not warrant the accuracy, completeness, or reliability of any content or data</li>
                <li>We disclaim all implied warranties including merchantability and fitness for a particular purpose</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">7.2 Investment Performance Disclaimer</h3>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>We make no guarantees regarding investment performance or returns</li>
                <li>Stock picks and recommendations do not guarantee profits or prevent losses</li>
                <li>Market analysis and insights are based on available information and may be incomplete or inaccurate</li>
                <li>Third-party data and information may contain errors or be outdated</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">7.3 Limitation of Damages</h3>
              <p className="mb-4 text-white text-sm">
                Phajaoinvest, its directors, officers, employees, and affiliates SHALL NOT BE LIABLE for:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, goodwill, or investment opportunities</li>
                <li>Investment losses resulting from market fluctuations or poor performance</li>
                <li>Damages arising from your use or inability to use our services</li>
                <li>Unauthorized access to your account or information</li>
                <li>Errors, bugs, viruses, or technical failures in our platform</li>
                <li>Actions or omissions of third-party service providers</li>
                <li>Regulatory changes affecting investment performance or service availability</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                <strong>MAXIMUM LIABILITY:</strong> Our total liability to you for all claims arising from or related to our services, regardless of the form of action, shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">7.4 Force Majeure</h3>
              <p className="mb-4 text-white text-sm">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to: natural disasters, war, terrorism, labor strikes, government actions, power outages, internet failures, cyber attacks, or pandemic events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">8. Account Suspension and Termination</h2>
              <h3 className="text-md font-semibold mb-3 text-white">8.1 Termination by You</h3>
              <p className="mb-4 text-white text-sm">
                You may terminate your account at any time by contacting customer support. Upon termination:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Active subscriptions will continue until expiration (no prorated refunds)</li>
                <li>Investment accounts will be processed according to individual investment terms</li>
                <li>You will lose access to premium content and features immediately upon account closure</li>
                <li>We will retain certain information as required by law or legitimate business purposes</li>
              </ul>
              <h3 className="text-md font-semibold mb-3 text-white">8.2 Termination by Phajaoinvest</h3>
              <p className="mb-4 text-white text-sm">
                We reserve the right to suspend or terminate your account immediately, without prior notice, if you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Violate these Terms or our policies</li>
                <li>Provide false or misleading information</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail KYC/AML verification or pose compliance risks</li>
                <li>Abuse, harass, or threaten staff or other users</li>
                <li>Use services in ways that harm our business or reputation</li>
                <li>Fail to pay fees or breach payment obligations</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                Upon termination for cause, you forfeit all rights to refunds and may be liable for damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">9. Indemnification</h2>
              <p className="mb-4 text-white text-sm">
                You agree to indemnify, defend, and hold harmless Phajaoinvest, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Your use or misuse of our services</li>
                <li>Your violation of these Terms or applicable laws</li>
                <li>Your violation of any rights of another party</li>
                <li>Your investment decisions and trading activities</li>
                <li>Inaccurate or fraudulent information you provide</li>
                <li>Unauthorized use of your account due to your negligence</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">10. Governing Law and Jurisdiction</h2>
              <p className="mb-4 text-white text-sm">
                These Terms shall be governed by and construed in accordance with the laws of Laos, without regard to its conflict of law provisions.
              </p>
              <p className="mb-4 text-white text-sm">
                Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts of Vientiane, Laos, and you consent to the personal jurisdiction and venue of such courts.
              </p>
              <p className="mb-4 text-white text-sm">
                If you are accessing our services from outside Laos, you acknowledge that you are responsible for compliance with local laws in your jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">11. Dispute Resolution</h2>
              <h3 className="text-md font-semibold mb-3 text-white">11.1 Informal Resolution</h3>
              <p className="mb-4 text-white text-sm">
                Before initiating formal dispute proceedings, you agree to first contact us to attempt to resolve the dispute informally. We will make good faith efforts to resolve disputes amicably within 30 days.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">11.2 Arbitration (Optional)</h3>
              <p className="mb-4 text-white text-sm">
                If informal resolution fails, parties may agree to binding arbitration conducted in Vientiane, Laos, under mutually agreed arbitration rules. Arbitration decisions are final and binding.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">11.3 Class Action Waiver</h3>
              <p className="mb-4 text-white text-sm">
                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not as a class, consolidated, or representative action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">12. Changes to Terms of Service</h2>
              <p className="mb-4 text-white text-sm">
                We reserve the right to modify these Terms at any time. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white font-light text-sm space-y-2">
                <li>Update the "Last updated" date at the top of these Terms</li>
                <li>Notify you via email or prominent notice on our platform</li>
                <li>Provide at least 30 days' notice for material changes affecting your rights</li>
                <li>Obtain your consent where required by law</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                Your continued use of our services after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the changes, you must discontinue using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">13. Miscellaneous Provisions</h2>
              <h3 className="text-md font-semibold mb-3 text-white">13.1 Entire Agreement</h3>
              <p className="mb-4 text-white text-sm">
                These Terms, together with our Privacy Policy and any additional agreements for specific services, constitute the entire agreement between you and Phajaoinvest.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">13.2 Severability</h3>
              <p className="mb-4 text-white text-sm">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">13.3 No Waiver</h3>
              <p className="mb-4 text-white text-sm">
                Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">13.4 Assignment</h3>
              <p className="mb-4 text-white text-sm">
                You may not assign or transfer these Terms or your account without our prior written consent. We may assign these Terms without restriction.
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">13.5 Survival</h3>
              <p className="mb-4 text-white text-sm">
                Provisions that by their nature should survive termination (including warranty disclaimers, liability limitations, indemnification, and dispute resolution) shall survive termination of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">14. Contact Information</h2>
              <p className="mb-4 text-white text-sm">
                For questions, concerns, or notices regarding these Terms of Service, please contact us:
              </p>
              <h3 className="text-md font-semibold mb-3 text-white">Legal and Compliance Department</h3>
              <ul className="list-none mb-4 text-white space-y-2 text-sm">
                <li><strong>Email:</strong> legal@Phajaoinvest.la</li>
                <li><strong>Phone:</strong> 020 78856194</li>
                <li><strong>WhatsApp:</strong> +856 2078856194</li>
                <li><strong>Address:</strong> Phajaoinvest, Vientiane, Laos</li>
              </ul>
              <p className="mb-4 text-white text-sm">
                For urgent legal matters, please mark your communication as "Urgent - Legal Notice." We will respond to all inquiries within 14 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
