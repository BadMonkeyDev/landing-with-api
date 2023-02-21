import React, {useState} from 'react';
import './HeroSection.scss'

//@ts-ignore
import imageSrc from '../../../assets/images/background-image.jpeg'

import Button from "../../ui/Button/Button";

import {ResizeImage} from "../../../helper/ResizeImage";

interface HeroSectionProps {
    signupRef: React.RefObject<HTMLElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({signupRef}) => {
    const [backgroundImage, setBackgroundImage] = useState<File>()

    if (!backgroundImage) {
        ResizeImage(imageSrc, 1170, 650, 0.7, 'file').then(r => {
            //@ts-ignore
            setBackgroundImage(r.preview)
        });
    }



    console.log(backgroundImage)

    const heroStyles = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5)) ${backgroundImage && `, url('${backgroundImage}')`}`,
        backgroundSize: "cover"
    }

    console.log(heroStyles)

    return (
        <div
            className={'app-hero-section container'}
            style={heroStyles}
        >
            <div className={'hero-content'}>
                <h1 className={'text-h1'}>Test assignment for front-end developer</h1>
                <p className={'text-p1'}>What defines a good front-end developer is one that has skilled knowledge of
                    HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
                    interfaces with accessibility in mind. They should also be excited to learn, as the world of
                    Front-End Development keeps evolving.</p>
                <Button type={"yellow"} onClick={() => {
                    signupRef?.current?.scrollIntoView({behavior: "smooth"})
                }
                }>Sign Up</Button>
            </div>
        </div>
    );
};

export default HeroSection;