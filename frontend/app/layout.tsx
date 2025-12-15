export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold">
              AI Research Paper Reviewer
            </h1>
            <p className="text-sm text-gray-500">
              Automated paper analysis & reviewer-style feedback
            </p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
