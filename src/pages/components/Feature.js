import { storyblokEditable } from "@storyblok/react";

const Feature = ( { blok } ) => (
    <div className="column feature">
        { blok.name }
    </div>
);

export default Feature;
