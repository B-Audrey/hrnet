import { useEffect } from 'react';

/**
 * Custom hook that listens for the Escape key down event and calls the provided close function.
 *
 * @param {Function} closeFunctionToCall - Function to call when Escape key is pressed. Takes a boolean parameter.
 */
const useEscapeKeyDown = (closeFunctionToCall: any) => {
    useEffect(() => {
        const handleKeyDown = (event:any) => {
            if (event.key === 'Escape') {
                closeFunctionToCall(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeFunctionToCall]);
};

export default useEscapeKeyDown;
