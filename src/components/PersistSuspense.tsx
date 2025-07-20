import { Suspense, type ReactNode } from "react";
import { useIsRestoring } from "@tanstack/react-query";

// INFO: A workaround for this issue:
// https://github.com/TanStack/query/issues/8400
// When using useSuspenseQuery with CSR and persisted cache
type PersistGateProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function PersistGate({ children, fallback = null }: PersistGateProps) {
  const isRestoring = useIsRestoring();

  return isRestoring ? fallback : children;
}

type PersistSuspenseProps = {
  children: ReactNode;
  fallback: ReactNode;
};

const PersistSuspense = ({ children, fallback }: PersistSuspenseProps) => {
  return (
    <Suspense fallback={fallback}>
      <PersistGate fallback={fallback}>{children}</PersistGate>
    </Suspense>
  );
};

export default PersistSuspense;
