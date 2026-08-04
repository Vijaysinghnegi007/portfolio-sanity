export const metadata = {
  title: " Protfolio",
  description: "next js protfolio website with sanity cms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
