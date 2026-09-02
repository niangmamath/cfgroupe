import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent, getTheme } from "@/lib/store";

// Content/theme are read from Blob on every request so admin edits show up
// immediately — must not be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [content, theme] = await Promise.all([getContent(), getTheme()]);
  const { colors, typography } = theme;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root {
            --paper: ${colors.paper};
            --paper-dim: ${colors.paperDim};
            --ink: ${colors.ink};
            --ink-soft: ${colors.inkSoft};
            --black: ${colors.black};
            --navy-950: ${colors.navy950};
            --navy-900: ${colors.navy900};
            --navy-800: ${colors.navy800};
            --navy-700: ${colors.navy700};
            --blue-600: ${colors.blue600};
            --blue-100: ${colors.blue100};
            --cream: ${colors.cream};
            --cream-dim: ${colors.creamDim};
            --contact-blue: ${colors.contactBlue};
          }
          html { font-size: ${typography.scale * 100}%; }`,
        }}
      />
      <div className="flex min-h-full flex-col">
        <Header entities={content.entities} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
