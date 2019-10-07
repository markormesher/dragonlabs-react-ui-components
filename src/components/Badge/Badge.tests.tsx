import { mount } from "enzyme";
import { describe, it } from "mocha";
import * as React from "react";
import { testGlobals } from "../../test-utils/test-globals";
import bs from "../../global-styles/Bootstrap.scss";
import { Badge } from "./Badge";

describe(__filename, () => {
  let { mountWrapper } = testGlobals;

  it("should render children", () => {
    mountWrapper = mount(
      <Badge>
        <span>he</span>
        <span>llo</span>
      </Badge>,
    );
    mountWrapper.text().should.equal("hello");
  });

  it("should apply the given intent", () => {
    mountWrapper = mount(<Badge intent={"success"}>hello</Badge>);
    mountWrapper
      .find("span")
      .hasClass(bs.badgeSuccess)
      .should.equal(true);
  });
});
