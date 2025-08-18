import React from "react";
import Footer from "../components/common/Footer";
import HighLightText from "../components/core/ShortHands/HighLightText";

const PrivacyPolicy = () => {
  return (
    <div>
        <div className="text-white px-6 py-12 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
            <HighLightText text="Privacy Policy"/>
        </h1>

        <p className="mb-6">
            This Privacy Policy explains how we collect, use, and protect your personal information
            when you use our website and services.
        </p>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
            We may collect personal information such as your name, email address, and usage data when
            you register, use our services, or contact us.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
            <li>To provide and improve our services</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send you important updates and promotional materials</li>
            <li>To analyze usage trends and improve user experience</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
            <p>
            We do not sell your personal information. We may share data with third-party service
            providers to support our business, comply with laws, or protect our rights.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p>
            We implement appropriate technical and organizational measures to protect your personal
            data from unauthorized access, disclosure, or destruction.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p>
            You have the right to access, update, or delete your personal data. You may also object to
            our processing or request data portability by contacting us.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page with an updated effective date.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
            <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at
            <a href="mailto:the.course.finder.app@gmail.com" className="text-blue-600 hover:underline ml-1">
                the.course.finder.app@gmail.com
            </a>
            </p>
        </section>

        </div>
        </div>
  );
};

export default PrivacyPolicy;
