import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from '../styles/LoadingScreen.module.css'; // Create this CSS file to style your loading screen

const LoadingScreen = ({ loading }) => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color="#3498db" loading={loading} size={150} />
    </div>
  );
};

export default LoadingScreen;
