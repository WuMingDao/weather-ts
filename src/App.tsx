import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routers/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <DevTools />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
export default App;
