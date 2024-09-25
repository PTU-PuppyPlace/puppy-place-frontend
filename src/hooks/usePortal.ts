'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function usePortal(
  element: React.ReactNode,
  portalElementId: string
) {
  const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    setPortalElement(document.getElementById(portalElementId));
  }, [portalElementId]);

  if (!portalElement) {
    return null;
  }

  return createPortal(element, portalElement);
}
