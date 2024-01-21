import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false, // You can set this to true if you want to simulate dark mode
      addListener: function () {},
      removeListener: function () {},
    };
  };
