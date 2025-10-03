import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import { fetcher } from "./common/utils/fetcher.ts";
import { globalStyles } from "./common/styles/stitches.config.ts";
import App from "./App.tsx";

async function enableMocking() {
  const shouldMock =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true";

  if (!shouldMock) return;

  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}

globalStyles();

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <App />
      </SWRConfig>
    </StrictMode>
  );
});
