import { PrivacyEnInfoTable } from "./_components/privacy-en-info-table";
import { PrivacyEnPermissionTable } from "./_components/privacy-en-permission-table";

export function PrivacyEn() {
  return (
    <section id="en" lang="en">
      <h2>English</h2>

      <h3>1. Overview</h3>
      <p>
        Log Diary (&quot;the App&quot;) is a personal diary app. The developer does not operate any
        server. Your diary entries are stored <strong>only on your device</strong>, and the
        developer never receives, views, or stores your diary content or personal information.
      </p>
      <p>
        Only if you turn on Google Drive backup yourself, your diary data is saved to{" "}
        <strong>your own Google Drive account</strong>. Even then, nothing is sent to the developer.
      </p>

      <h3>2. Information the App Handles</h3>
      <PrivacyEnInfoTable />
      <ul>
        <li>The developer does not collect, transmit, or access any of the above.</li>
      </ul>

      <h3>3. Information the App Does Not Collect</h3>
      <ul>
        <li>Location</li>
        <li>Photos, camera, microphone, or contacts</li>
        <li>Advertising identifiers (IDFA / Advertising ID)</li>
        <li>Usage analytics or crash reports</li>
        <li>Device identifiers</li>
      </ul>
      <p>The App contains no third-party advertising, analytics, or crash-reporting SDKs.</p>

      <h3>4. Google Drive Backup (Optional)</h3>
      <ul>
        <li>
          When you connect a Google account in Settings, the App requests only the drive.appdata
          scope. This scope allows access{" "}
          <strong>only to a hidden folder created by the App</strong>; the App cannot read or modify
          any of your other Drive files.
        </li>
        <li>
          Backup files travel directly between your device and Google over HTTPS, without passing
          through any server operated by the developer.
        </li>
        <li>
          The App&apos;s use and transfer of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </li>
      </ul>

      <h3>5. Sharing with Third Parties</h3>
      <p>
        The developer does not share your personal information with or outsource its processing to
        any third party.
      </p>
      <p>
        If you use Drive backup, the backup file is stored on services provided by Google LLC, in
        your own Google account, at your own direction. Google&apos;s handling of that data is
        governed by the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
      </p>

      <h3>6. Device Permissions</h3>
      <PrivacyEnPermissionTable />

      <h3>7. Retention and Deletion</h3>
      <ul>
        <li>
          <strong>Data on your device</strong> : Deleted when you delete an entry or uninstall the
          App.
        </li>
        <li>
          <strong>Google Drive backup</strong> : Disconnecting your account in the App does not
          delete the backup file from your Drive. To delete it:
          <ul>
            <li>
              Google Drive on the web → Settings → Manage apps → &quot;Log Diary&quot; → Options →
              &quot;Delete hidden app data&quot;
            </li>
            <li>
              To revoke the App&apos;s Drive access :{" "}
              <a href="https://myaccount.google.com/connections">
                Google Account → Security → Third-party apps &amp; services
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>Email address</strong> : No longer used once you disconnect your account in the
          App, and deleted when you uninstall the App.
        </li>
      </ul>

      <h3>8. Your Rights</h3>
      <p>
        Because all data lives on your device and in your own Google account, you can exercise your
        rights directly, without contacting the developer.
      </p>
      <ul>
        <li>
          <strong>Access, edit, delete</strong> : View, edit, or delete entries in the App
        </li>
        <li>
          <strong>Export</strong> : Settings → Export saves your entries as a text file
        </li>
        <li>
          <strong>Stop backup</strong> : Settings → Backup lets you turn off automatic backup or
          disconnect your account
        </li>
      </ul>
      <p>For any other questions, email the contact below.</p>

      <h3>9. Children&apos;s Privacy</h3>
      <p>
        The App is not directed to children, and the developer does not collect any personal
        information, including age.
      </p>

      <h3>10. Security</h3>
      <ul>
        <li>
          Diary data is stored in the App&apos;s private storage, protected by the operating system
          and inaccessible to other apps.
        </li>
        <li>Communication with Google Drive is encrypted with HTTPS.</li>
        <li>We recommend using a screen lock on your device in case it is lost.</li>
      </ul>

      <h3>11. Contact</h3>
      <ul>
        <li>
          <strong>Developer</strong> : wisdomstar94
        </li>
        <li>
          <strong>Email</strong> :{" "}
          <a href="mailto:wisdomstar94@gmail.com">wisdomstar94@gmail.com</a>
        </li>
      </ul>

      <h3>12. Changes to This Policy</h3>
      <p>
        This policy may be updated due to changes in law or App features. Any changes will be posted
        on this page with a new effective date.
      </p>
      <ul>
        <li>
          <strong>Effective date</strong> : 2026-10-12
        </li>
      </ul>
    </section>
  );
}
