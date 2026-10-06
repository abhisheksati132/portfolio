import { LandingPageFrame, type LandingPageProps } from "../../shaders/landing-pages/LandingPageFrame";

export function SublevelStudioLandingPage(props: LandingPageProps) {
  return (
    <LandingPageFrame
      {...props}
      title="Abhishek Sati — Systems &amp; Software Portfolio"
      sourceUrl="/landing-pages/sublevel-studio.html"
    />
  );
}

export default SublevelStudioLandingPage;
