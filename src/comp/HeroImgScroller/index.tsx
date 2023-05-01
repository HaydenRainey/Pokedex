import { ImageLoaderProps } from 'next/dist/shared/lib/image-config';
import Image from 'next/image';
import styles from './HeroImgScroller.module.scss';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import LeftArrowIcon from "@mui/icons-material/ArrowLeft";
import RightArrowIcon from "@mui/icons-material/ArrowRight";
import clsx from 'clsx';
import Box from '@mui/material/Box';


export interface HeroImgProps extends ImageLoaderProps {
    alt: string,
    height: number,
}
export interface HeroImgScrollerProps {
    imgs: HeroImgProps[];
    imgDefaults?: ImageLoaderProps[];
    interactable?: boolean;
    autoScroll?: number;
    height?: string,
    className?: string

}
export default function HeroImgScroller({
    imgs,
    height = '20em',
    interactable = false, // Default interactable to false
    autoScroll = undefined,
    className = undefined
}: HeroImgScrollerProps) {

    const [activeIndex, setActiveIndex] = React.useState(0);

    const handlePrev = () => {
        if ((activeIndex - 1) >= 0) {//select previous image
            setActiveIndex(activeIndex - 1)
        }
        else {//cycle to end of list
            setActiveIndex(imgs.length - 1)
        }
    }
    const handleNext = () => {
        if ((activeIndex + 1) < imgs.length) {//select next image
            setActiveIndex(activeIndex + 1);
        }
        else {//cycle to beginning of list
            setActiveIndex(0);
        }
    }

    React.useEffect(() => {
        if (autoScroll !== undefined) {
            const id = setInterval(() => {
                handleNext();
            }, autoScroll);
            return () => clearInterval(id);
        }

    }, [activeIndex])

    return (
        <Box className={clsx(styles.root,className)} sx={{ height: height}}>
            {interactable && //only display arrows if interactable
                <div className={styles.arrowContainer}>
                    <IconButton
                        className={clsx(styles.arrow)}
                        color="inherit"
                        aria-label="Previous image"
                        edge="start"

                        onClick={handlePrev}
                    >
                        <LeftArrowIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(styles.arrow)}
                        color="inherit"
                        aria-label="Next image"
                        edge="start"
                        onClick={handleNext}
                    >
                        <RightArrowIcon />
                    </IconButton>
                </div>
            }



            {imgs.map((uri, index) => {
                if (index === activeIndex)
                    return <Image key={index} {...uri} />
            })}
        </Box>
    );
}
