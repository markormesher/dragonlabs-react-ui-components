import React, { PureComponent, ReactNode } from "react";
import { Badge } from "../../src/components/Badge/Badge";
import bs from "./global-styles/Bootstrap.scss";

class App extends PureComponent {
  public render(): ReactNode {
    return (
      <div className={bs.containerFluid}>
        <div className={bs.row}>
          <div className={bs.col}>
            <h1>@dragonlabs/react-ui-components</h1>
          </div>
        </div>
        <div className={bs.row}>
          <div className={bs.col}>
            <h2>Badge</h2>
            <Badge bs={bs} className={bs.badgeInfo}>
              This is a badge
            </Badge>
          </div>
        </div>
      </div>
    );
  }
}

export { App };
