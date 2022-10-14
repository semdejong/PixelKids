import { useLoadingContext } from "../context/LoadingContext";

export default function useLoading() {
  const { loading, setLoading } = useLoadingContext();

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return {
    isLoading: loading,
    startLoading,
    stopLoading,
  };
}
