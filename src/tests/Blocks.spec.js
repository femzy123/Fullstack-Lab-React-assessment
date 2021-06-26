import React from "react";
import { shallow } from "enzyme";
import Blocks from "../components/Blocks";

beforeAll(() => {
  global.fetch = jest.fn();
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Blocks />, { disableLifecycleMethods: true });
});

afterEach(() => {
  wrapper.unmount();
});

it("must render a loading before api call success", () => {
  expect(wrapper.find("div.loading").exists()).toBeTruthy();
});

it("should show the loading text", () => {
  expect(wrapper.find("div.loading").text()).toBe("Loading...");
});

it("should display block data", (done) => {
  const spyDidMount = jest.spyOn(Blocks.prototype, "componentDidMount");

  fetch.mockImplementation(() => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return Promise.resolve({
          attributes: {
            index: 1,
            timestamp: 1530679678,
            data: "The Human Torch",
            "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
            hash: "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
          },
        });
      },
    });
  });

  const didMount = wrapper.instance().componentDidMount();
  
  expect(spyDidMount).toHaveBeenCalled();

  didMount.then(() => {
    wrapper.update();

    spyDidMount.mockRestore();
    fetch.mockClear();
    done();
  })

});
