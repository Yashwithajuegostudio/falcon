import Loading from "@/components/Loading";
import React, { createContext, useState } from "react";

export const LoadingContext = createContext<{
  loading: boolean;
  show: () => void;
  hide: () => void;
}>({
  loading: false,
  show: () => {},
  hide: () => {},
});

const LoadingProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
