import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - AI Try-On",
  description: "About AI Try-On application and our company",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About AI Try-On</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              AI Try-On is revolutionizing the way people experience fashion through cutting-edge artificial intelligence technology. Our mission is to make online shopping more interactive, engaging, and accurate by allowing customers to virtually try on clothing before making a purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="mb-4">
              We provide an AI-powered virtual try-on service that enables users to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Upload clothing images and see how they look on different models</li>
              <li>Generate realistic try-on experiences using advanced AI algorithms</li>
              <li>Visualize fashion combinations before making purchasing decisions</li>
              <li>Explore different styles and fits in a virtual environment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="mb-4">
              Our platform leverages state-of-the-art machine learning models and computer vision technology to create realistic virtual try-on experiences. We continuously improve our algorithms to provide more accurate and lifelike results.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-6">
                <li>Advanced AI image processing</li>
                <li>Real-time virtual try-on generation</li>
                <li>High-quality output with realistic fitting</li>
                <li>User-friendly interface for easy interaction</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Options</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Free Version</h3>
                <p className="text-sm text-muted-foreground">
                  Basic try-on functionality with limited daily usage. Perfect for casual users who want to explore our service.
                </p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Premium Version</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced features with unlimited usage, higher quality outputs, and priority processing for professional users.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="mb-4">
              We take your privacy seriously. We do not store any uploaded images or personal data. All processing is done securely and temporarily, with immediate deletion of user content after processing is complete.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="mb-4">
              We are committed to providing innovative AI solutions that enhance the online shopping experience while maintaining the highest standards of privacy and security. Our team continuously works to improve our technology and expand our capabilities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              We'd love to hear from you! Whether you have questions, feedback, or business inquiries, don't hesitate to reach out.
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Get in Touch</h3>
                  <p><strong>Email:</strong> le13107621169@gmail.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Location</h3>
                  <p><strong>Address:</strong> 江苏省南京市</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Future Vision</h2>
            <p className="mb-4">
              We envision a future where virtual try-on technology becomes an integral part of online shopping, reducing returns, increasing customer satisfaction, and making fashion more accessible to everyone. Join us on this exciting journey as we continue to innovate and expand our AI capabilities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 