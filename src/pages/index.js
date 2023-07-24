import { StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import Head from "next/head"
import Layout from "./components/Layout";

export default function Home ( props ) {
  const story = props.story
  const config = props.config
  
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
  )
}

export async function getStaticProps () {
  let slug = "home"
  
  let sbParams = {
    version: "draft",
    resolve_links: "url",
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get( `cdn/stories/${ slug }`, sbParams )
  let { data: config } = await storyblokApi.get( `cdn/stories/config` )
  
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
    },
    revalidate: 3600,
  }
}
