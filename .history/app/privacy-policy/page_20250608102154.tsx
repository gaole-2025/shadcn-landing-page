import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - AI Try-On",
  description: "Privacy Policy for AI Try-On application",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to AI Try-On. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your information when you use our AI-powered virtual try-on service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
              <strong>We do not collect or store any personal user data.</strong> Our AI Try-On service is designed with privacy in mind:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>We do not store uploaded images after processing</li>
              <li>We do not collect personal identification information</li>
              <li>We do not track user behavior or create user profiles</li>
              <li>All image processing is temporary and deleted immediately after use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
            <p className="mb-4">
              The images you upload are used solely for AI processing to generate try-on results. Once the AI processing is complete, all uploaded data is immediately deleted from our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your data during the brief processing period. All communications are encrypted using industry-standard protocols.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="mb-4">
              Our service may use third-party AI processing services. These services are bound by their own privacy policies and do not retain user data beyond the processing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> le13107621169@gmail.com</p>
              <p><strong>Address:</strong> 江苏省南京市</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 