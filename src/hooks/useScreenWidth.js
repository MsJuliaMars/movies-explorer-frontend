import React, {useCallback, useEffect, useState} from 'react';

export default function useScreenWidth() {
    const getScreenWidth = useCallback(() => window.innerWidth, []);
    const [width, setWidth] = useState(getScreenWidth());

    useEffect(() => {
        function handleResize() {
            setWidth(getScreenWidth());
        }
        window.addEventListener('resize', resizeListener , false);
        let resizeTimer = null;
        function resizeListener () {
            if (!resizeTimer) {
                resizeTimer = setTimeout(() => {
                    clearTimeout(resizeTimer);
                    handleResize();
                }, 150);
            }
        }
        return () => {
          window.removeEventListener('resize', resizeListener );
        };
        }, [getScreenWidth]);
    return width;
}
