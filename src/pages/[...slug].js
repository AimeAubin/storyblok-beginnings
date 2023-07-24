import Head from "next/head";
import Layout from "./components/Layout";

import {
    useStoryblokState,
    getStoryblokApi,
    StoryblokComponent,
} from "@storyblok/react";

export default function Page ( props ) {
    const story = props.story
    const config = props.config

    return (
        <div >
            <Head>
                <title>{ story ? story.name : "My Site" }</title>
                <link rel="icon" href="/favicon.ico" />
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
        resolve_links: "url",
    };

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get( `cdn/stories/${ slug }`, sbParams );
    let { data: config } = await storyblokApi.get( 'cdn/stories/config' );

    return {
        props: {
            story: data ? data.story : false,
            key: data ? data.story.id : false,
            config: config ? config.story : false,
        },
        revalidate: 3600,
    };
}

export async function getStaticPaths () {
    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get( "cdn/links/", {
        version: 'draft'
    } );

    let paths = [];
    Object.keys( data.links ).forEach( ( linkKey ) => {
        if ( data.links[ linkKey ].is_folder || data.links[ linkKey ].slug === "home" ) {
            return;
        }

        const slug = data.links[ linkKey ].slug;
        let splittedSlug = slug.split( "/" );

        paths.push( { params: { slug: splittedSlug } } );
    } );

    return {
        paths: paths,
        fallback: false,
    };
}