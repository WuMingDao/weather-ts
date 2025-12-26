import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { render } from "vitest-browser-react";
import Day from "../../../src/components/home/Day";
import {
  temperatureAtom,
  weatherIconAtom,
} from "../../../src/stores/weatherAtom";

function HydrateAtoms({ children }: { children: React.ReactNode }) {
  useHydrateAtoms([
    [temperatureAtom, { min: 10.2, max: 25.8 }],
    [weatherIconAtom, "01d"],
  ]);
  return children;
}

async function renderComponent() {
  return await render(
    <Provider>
      <HydrateAtoms>
        <Day />
      </HydrateAtoms>
    </Provider>
  );
}

describe("Day Component", () => {
  describe("render test", async () => {
    it("should render temperature and weather icon", async () => {
      const { getByRole, getByText } = await renderComponent();

      expect(getByText("Today")).toBeInTheDocument();
      expect(getByText(/10° — 26°/)).toBeInTheDocument();
      expect(getByRole("img")).toHaveAttribute(
        "src",
        "https://openweathermap.org/img/wn/01d@2x.png"
      );
    });
  });
});
