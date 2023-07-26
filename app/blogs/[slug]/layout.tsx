
export const metadata = {
    title: "UniSmart | Blogs Content",
    description:
      "Explore blogs about PhD,MSc and more about Chemistry.",
  };
export default function ContactPageLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
  
        {children}
      </section>
    );
  }