import "../styles/globals.css"
import { storyblokInit, apiPlugin } from "@storyblok/react"
import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Teaser from "./components/Teaser";
import Page from "./components/Page";
import Config from "./components/Config";
import HeaderMenu from "./components/HeaderMenu";
import MenuLink from "./components/MenuLink";
import Layout from "./components/Layout";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  config: Config,
  "header_menu": HeaderMenu,
  "menu_link": MenuLink
}

storyblokInit( {
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [ apiPlugin ],
  components
})

export default function App({ Component, pageProps }) {
  return (
      <Component { ...pageProps } />
  )
}
