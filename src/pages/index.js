import { StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import Head from "next/head";
import Layout from "./components/Layout";

export default function Home ( { story } ) {
  story = useStoryblokState( story );


  return (
    <div>
      <Head>
        <title>ChatterBox</title>
        <link rel="icon" href="/logo-mobile.svg" />
      </Head>
      <div>
        <Layout>
          <StoryblokComponent blok={ story.content } />
        </Layout>
      </div>
    </div>
  );
}

export async function getStaticProps () {
  let slug = "home";

  let sbParams = {
    version: "draft",
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get( `cdn/stories/${ slug }`, sbParams );

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
