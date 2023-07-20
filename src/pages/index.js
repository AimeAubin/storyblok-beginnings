import { StoryblokComponent, getStoryblokApi, useStoryblokState } from "@storyblok/react";
import Head from "next/head"

export default function Home ( { story } ) {
  story = useStoryblokState( story )
  
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header>
        <h1>
          { story ? story.name : 'My Site' }
        </h1>
      </header> */}

      <StoryblokComponent blok={ story.content } />
      
    </div>
  )
}

export async function getStaticProps () {
  let slug = "home"
  
  let sbParams = {
    version: "draft",
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get( `cdn/stories/${ slug }`, sbParams )
  
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  }
}

// export async function getServerSideProps ( context ) {
//   const insideStoryBlok = context.query._storyblok;

//   let slug = "home";

//   let sbParams = {
//     version: "published",
//   }

//   if ( insideStoryBlok ) {
//     sbParams.version = "draft"
//   }

//   const storyblokApi = getStoryblokApi()
//   let { data } = await storyblokApi.get( `cdn/stories/${ slug }`, sbParams )
  
//   return {
//     props: {
//       story: data ? data.story : false,
//       key: data ? data.story.id : false,
//     }
//   }
// }
