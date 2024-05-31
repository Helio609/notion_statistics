export default function HelpPage() {
  return (
    <div className="container mt-10">
      <h1 className="text-center text-xl">Usage</h1>
      <ol className="list-decimal list-inside">
        <li className="mb-4">
          Register for a Notion Integration account:
          <ul className="list-disc list-inside ml-6">
            <li>
              Visit the{' '}
              <a
                href="https://www.notion.so/my-integrations"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion Integrations
              </a>{' '}
              page.
            </li>
            <li>
              You need to log in to your Notion account. If it opens the Notion
              homepage, please visit the above link again.
            </li>
          </ul>
        </li>
        <li className="mb-4">
          Connect the Notion Integration to the page or database you want to
          track:
          <ul className="list-disc list-inside ml-6">
            <li>Create a new Integration on the Notion Integrations page.</li>
            <li>Copy the generated Integration Token.</li>
            <li>Open the Notion page or database you want to track.</li>
            <li>Copy the URL of the page.</li>
            <li>In the settings, connect the Integration you created.</li>
          </ul>
        </li>
        <li className="mb-4">
          Get the ID of the page or database you want to track:
          <ul className="list-disc list-inside ml-6">
            <li>Open the Notion page or database you want to track.</li>
            <li>
              Check the browser&apos;s address bar, for example:{' '}
              <code>
                https://www.notion.so/helio609/35974328866e435287421a7398d87d1b
              </code>
              .
            </li>
            <li>
              Copy the ID of the page or database from the URL (in this example,{' '}
              <code>35974328866e435287421a7398d87d1b</code>).
            </li>
          </ul>
        </li>
      </ol>
    </div>
  )
}
