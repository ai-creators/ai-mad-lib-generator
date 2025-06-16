import React from 'react';
import Layout from '../_components/layouts/layout';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
        <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🍪 Cookie Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: 05/30/2025</p>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. What are cookies?</h2>
        <p className='text-muted-foreground'>
          Cookies are small data files placed on your device when you visit a website.
          They are widely used to make websites work efficiently, personalize your experience,
          and collect analytics about how the website is used.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Why we use cookies</h2>
        <p className='text-muted-foreground'>We use cookies for the following purposes:</p>
        <ul className="list-disc list-inside mt-1">
          <li className='text-muted-foreground'><strong className='text-primary'>Essential cookies</strong> – Required for the core functionality of the site.</li>
          <li className='text-muted-foreground'><strong className='text-primary'>Analytics cookies</strong> – Help us understand how users interact with the site and improve performance.</li>
          <li className='text-muted-foreground'><strong className='text-primary'>Functional cookies</strong> – Remember your preferences and enhance your experience.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Cookies we use</h2>
        <table className="w-full text-left border border-collapse border-muted-foreground">
          <thead>
            <tr>
              <th className="border p-2">Cookie Type</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Necessary</td>
              <td className="border p-2">Enables basic functions like navigation and access.</td>
              <td className="border p-2">Session / Short-term</td>
            </tr>
            <tr>
              <td className="border p-2">Analytics</td>
              <td className="border p-2">Gathers usage data to improve the site.</td>
              <td className="border p-2">Persistent</td>
            </tr>
            <tr>
              <td className="border p-2">Preferences</td>
              <td className="border p-2">Stores your choices (e.g., language, theme).</td>
              <td className="border p-2">Persistent</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Your cookie choices</h2>
        <p className='text-muted-foreground'>You can control your cookie preferences in two ways:</p>
        <ul className="list-disc list-inside mt-1">
          <li className='text-muted-foreground'><strong className='text-primary'>Cookie Consent Modal</strong> – When you visit AIAdlibs.com, you’ll see a cookie banner allowing you to accept or manage your preferences.</li>
          <li className='text-muted-foreground'><strong className='text-primary'>Browser Settings</strong> – You can set your browser to block or alert you about cookies. However, some parts of the website may not function correctly if you disable them.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Third-party cookies</h2>
        <p className='text-muted-foreground'>
          Some cookies are set by third-party services we use, such as analytics tools or ad networks.
          These services may collect data directly from your browser and are subject to their own privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. Updates to this Cookie Policy</h2>
        <p className='text-muted-foreground'>
          We may update this policy to reflect changes in technology, law, or our services.
          The latest version will always be posted on this page.
        </p>
      </section>
    </div>
    </Layout>
  );
}
