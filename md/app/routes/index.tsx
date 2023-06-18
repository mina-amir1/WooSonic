import HeroSection from '~/components/HeroSection';
import AboutSection from '~/components/AboutSection';
import HeroTitle from '~/components/HeroTitle';
import Testimonials from '~/components/Testimonials';
import BlogList from '~/components/BlogList';
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Site_Title } from '~/config';

export default function Index() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <HeroTitle />
      <Testimonials />
      <BlogList />
    </div>
  )
}
export const meta: MetaFunction = () => {
    return {
        title: `HomePage - ${Site_Title}`
    }
}