import React, { PureComponent, ReactNode } from "react";
import { Badge } from "../../src/components/Badge/Badge";
import { Text } from "../../src/components/Text/Text";
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
            <h2>Text</h2>
            <Text intent={"primary"}>Primary</Text>
            <Text intent={"secondary"} spacing={{ margin: { left: 2 } }}>
              Secondary
            </Text>
            <Text intent={"danger"} spacing={{ margin: { left: 2 } }}>
              Danger
            </Text>
            <Text intent={"warning"} spacing={{ margin: { left: 2 } }}>
              Warning
            </Text>
            <Text intent={"info"} spacing={{ margin: { left: 2 } }}>
              Info
            </Text>
            <Text intent={"success"} spacing={{ margin: { left: 2 } }}>
              Success
            </Text>
            <Text intent={"dark"} spacing={{ margin: { left: 2 } }}>
              Dark
            </Text>
            <Text intent={"light"} spacing={{ margin: { left: 2 } }}>
              Light
            </Text>
            <Text intent={"muted"} spacing={{ margin: { left: 2 } }}>
              Muted
            </Text>
          </div>
        </div>
        <div className={bs.row}>
          <div className={bs.col}>
            <h2>Badge</h2>
            <Badge intent={"primary"}>Primary</Badge>
            <Badge intent={"secondary"} spacing={{ margin: { left: 2 } }}>
              Secondary
            </Badge>
            <Badge intent={"danger"} spacing={{ margin: { left: 2 } }}>
              Danger
            </Badge>
            <Badge intent={"warning"} spacing={{ margin: { left: 2 } }}>
              Warning
            </Badge>
            <Badge intent={"info"} spacing={{ margin: { left: 2 } }}>
              Info
            </Badge>
            <Badge intent={"success"} spacing={{ margin: { left: 2 } }}>
              Success
            </Badge>
            <Badge intent={"dark"} spacing={{ margin: { left: 2 } }}>
              Dark
            </Badge>
            <Badge intent={"light"} spacing={{ margin: { left: 2 } }}>
              Light
            </Badge>
          </div>
        </div>
      </div>
    );
  }
}

export { App };
