import React from 'react';
import './HeroSection.scss'

import Button from "../../ui/Button/Button";

interface HeroSectionProps {
    signupRef: React.RefObject<HTMLElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({signupRef}) => {
    return (
        <div
            className={'app-hero-section container'}
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