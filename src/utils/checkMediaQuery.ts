import React, { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";

export function useIsAboveTailwindSm() {
  const [isAboveTailwindSm, setIsAboveTailwindSm] = useState(false);
  const isAboveMediaQuery = useMediaQuery({ query: '(min-width: 640px)'});
  useEffect(() => {
    setIsAboveTailwindSm(isAboveMediaQuery);
  }, [isAboveMediaQuery])
  return isAboveTailwindSm;
};