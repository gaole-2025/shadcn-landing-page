import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - AI Try-On",
  description: "Terms of Use for AI Try-On application",
};

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using AI Try-On service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
            <p className="mb-4">
              AI Try-On is an artificial intelligence-powered virtual try-on service that allows users to visualize how clothing items might look on different models or themselves through AI image processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability and Pricing</h2>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Service Plans:</h3>
              <ul className="list-disc pl-6">
                <li><strong>Free Version:</strong> Limited usage with basic features</li>
                <li><strong>Paid Version:</strong> Enhanced features with extended usage limits</li>
              </ul>
            </div>
            <p className="mb-4">
              Pricing for paid services will be clearly displayed before purchase. All transactions are processed securely through our payment partners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
              <p className="font-semibold text-red-800 dark:text-red-200">
                <strong>No Refunds:</strong> All purchases are final. We do not offer refunds for any paid services or subscriptions.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="mb-4">Users are responsible for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ensuring uploaded images comply with our content guidelines</li>
              <li>Not uploading inappropriate, offensive, or copyrighted content</li>
              <li>Using the service for lawful purposes only</li>
              <li>Maintaining the confidentiality of their account information</li>
              <li>Respecting intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Content</h2>
            <p className="mb-4">The following types of content are strictly prohibited:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Sexually explicit or suggestive content</li>
              <li>Violent or disturbing imagery</li>
              <li>Content that violates privacy rights</li>
              <li>Copyrighted material without permission</li>
              <li>Content that may be offensive or harmful</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              AI Try-On provides the service "as is" without any warranties. We are not liable for any damages arising from the use of our service, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever, including breach of these Terms of Use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> le13107621169@gmail.com</p>
              <p><strong>Address:</strong> 江苏省南京市</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 