import React from 'react';
import styles from './Loader.module.scss'

interface LoaderProps {
    isLoading: boolean;
}

const Loader = ({isLoading} : LoaderProps) => {
    return (
        <>
            {isLoading && <div className={styles.loader}></div>}
        </>
    );
};

export default Loader;