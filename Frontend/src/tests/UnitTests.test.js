import { render, screen, configure } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Articles from "../pages/Articles";

const MockedArticlePage = () => {
  return (
    <BrowserRouter>
      <Articles />
    </BrowserRouter>
  );
};

const MockedHomePage = () => {
  return (
    <BrowserRouter>
      <AdminPage />
    </BrowserRouter>
  );
};

it("contains propper header in articles", () => {
  render(<MockedArticlePage />);
  const headerElement = screen.getByText(
    `Regulamin internetowego serwisu ogłoszeniowego OCW`
  );
  expect(headerElement).toBeInTheDocument();
});
