import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#1a237e',
    animation: 'spin 1s ease infinite',
  },
};

const keyframes = `
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const Spinner: React.FC = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
};

export default Spinner;
