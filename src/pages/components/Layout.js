import Footer from "./Footer";
import Config from './Config';
import Navigation from "./Navigation"

const Layout = ( { children, story } ) => (
    <div>
        {/* <Config blok={ story.content } /> */}
        <Navigation/>
            { children }
        <Footer />
    </div>
);

export default Layout;