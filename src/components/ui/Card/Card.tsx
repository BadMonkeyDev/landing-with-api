import React, {useState} from 'react';
import './Card.scss'
import Tooltip from "../Tooltip/Tooltip";
import image from '../../../assets/images/photo-cover.svg'

type CardProps = {
    imgUrl: string;
    fullName: string;
    jobPosition: string;
    email: string;
    phoneNumber: string;
}

const Card: React.FC<CardProps> = ({imgUrl, fullName, jobPosition, email, phoneNumber}) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    }
    return (
        <div className={'user-card'} >
            {!imageError ? (
                <img alt="profile" className={'user-img'} src={imgUrl} onError={handleImageError} />
            ) : (
                <img alt="profile" className={'user-img'} src={image} />
            )}
            <Tooltip>{fullName}</Tooltip>
            <div className={'user-data'} >
                <Tooltip>{jobPosition}</Tooltip>
                <Tooltip>{email}</Tooltip>
                <div>{phoneNumber}</div>
            </div>
        </div>
    );
};

export default Card;