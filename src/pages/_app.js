import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Teaser from "./components/Teaser";
import Page from "./components/Page";
import Hero from "./components/Hero";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: Hero,
};

storyblokInit( {
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [ apiPlugin ],
  components
} );

export default function App ( { Component, pageProps } ) {
  return <Component { ...pageProps } />;
}
