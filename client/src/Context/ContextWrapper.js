import { LoadingContextProvider } from "./LoadingContext";

export default function ContextWrapper({ children }) {
  return <LoadingContextProvider>{children}</LoadingContextProvider>;
}
