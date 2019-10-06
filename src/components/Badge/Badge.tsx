import React, { ReactNode, PureComponent } from "react";
import * as bootstrapScss from "../../global-styles/Bootstrap.scss";
import { combine } from "../../helpers/style-helpers";

interface IComponentProps {
  readonly bs?: typeof bootstrapScss;
}

interface IBadgeProps extends IComponentProps {
  readonly className?: string;
  readonly marginLeft?: boolean;
  readonly marginRight?: boolean;
}

class Badge extends PureComponent<IBadgeProps> {
  public render(): ReactNode {
    const { bs = bootstrapScss } = this.props;

    console.log(bs);
    const { className, marginRight, marginLeft } = this.props;
    const classes = combine(bs.badge, className || bs.badgeLight, marginRight && bs.mr1, marginLeft && bs.ml1);
    return <span className={classes}>{this.props.children}</span>;
  }
}

export { Badge };
