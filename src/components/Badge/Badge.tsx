import React, { ReactNode, PureComponent } from "react";
import bs from "../../global-styles/Bootstrap.scss";
import { combine } from "../../helpers/style-helpers";
import {
  BsIntent,
  getBootstrapIntentClasses,
  BsSpacingSpec,
  getBsSpacingClasses,
} from "../../helpers/bootstrap-styles";

interface IBadgeProps {
  readonly intent?: BsIntent;
  readonly spacing?: BsSpacingSpec;
}

class Badge extends PureComponent<IBadgeProps> {
  public render(): ReactNode {
    const { intent, spacing } = this.props;
    const classes = combine(bs.badge, ...getBootstrapIntentClasses("badge", intent), ...getBsSpacingClasses(spacing));
    return <span className={classes}>{this.props.children}</span>;
  }
}

export { Badge };
