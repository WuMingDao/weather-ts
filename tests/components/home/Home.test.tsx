import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, useLocation } from "react-router";
import { userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";
import Home from "../../../src/components/home/Home";
import { useCurrentWeather } from "../../../src/hooks/useCurrentWeather";

const queryClient = new QueryClient();

let testLocation: { pathname: string };

function LocationDisplay() {
  testLocation = useLocation();
  return null;
}

async function renderComponent() {
  return await render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Home />
        <LocationDisplay />
      </MemoryRouter>
    </QueryClientProvider>
  );
}
vi.mock("../../../src/hooks/useCurrentWeather", { spy: true });

describe("Home", () => {
  describe("render test", async () => {
    it("should render button and text", async () => {
      // Arrange
      vi.mocked(useCurrentWeather).mockReturnValue({
        isLoading: false,
      } as ReturnType<typeof useCurrentWeather>);
      const { getByRole, getByText } = await renderComponent();

      // Act
      const button = getByRole("button");
      const text = getByText(/Get Start/i);

      // Assert
      expect(button).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it("should render loading component and not render button", async () => {
      // Arrange
      vi.mocked(useCurrentWeather).mockReturnValue({
        isLoading: true,
      } as ReturnType<typeof useCurrentWeather>);
      const { getByRole } = await renderComponent();

      // Act
      const button = getByRole("button");
      const loading = getByRole("status");

      // Assert
      expect(button).not.toBeInTheDocument();
      expect(loading).toBeInTheDocument();
    });
  });

  describe("user interactions", async () => {
    it("should navigate to forecast", async () => {
      // Arrange
      vi.mocked(useCurrentWeather).mockReturnValue({
        isLoading: false,
      } as ReturnType<typeof useCurrentWeather>);
      const { getByRole } = await renderComponent();

      // Act
      const button = getByRole("button");
      await userEvent.click(button);

      // Assert
      expect(testLocation.pathname).toBe("/forecast");
    });
  });
});
