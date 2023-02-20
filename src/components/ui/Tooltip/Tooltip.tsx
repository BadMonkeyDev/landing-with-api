import React, {ReactNode, useState} from 'react';
import classes from './Tooltip.module.scss'

interface TooltipProps {
    children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({children}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <div className={classes.tooltipTextContainer} >
            <div className={classes.tooltipText} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{children}</div>
            {isHovered && <div className={classes.tooltipWrapper}><div className={classes.tooltip}>{children}</div></div>}
        </div>
    );
};

export default Tooltip;