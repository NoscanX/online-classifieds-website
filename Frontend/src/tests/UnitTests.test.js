import { render, screen, configure } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Articles from "../pages/Articles";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

const MockedArticlePage = () => {
  return (
    <BrowserRouter>
      <Articles />
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

it("should render footer text", () => {
  render(<Footer />);
  const headingElement = screen.getByText("Strona wykonana przez:");
  const headingNameElement = screen.getByText("Jacek Michalski");
  expect(headingElement).toBeInTheDocument();
  expect(headingNameElement).toBeInTheDocument();
});

it("should render footer logo", () => {
  render(<Footer />);
  const headingElement = screen.getByText("OCW");
  expect(headingElement).toBeInTheDocument();
});

it("should render main website name text", () => {
  render(<Categories />);
  const headingElement = screen.getByText("Internetowy serwis ogłoszeniowy");
  expect(headingElement).toBeInTheDocument();
});
