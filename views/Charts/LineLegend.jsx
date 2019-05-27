import React from "react";

class LineLegend extends React.Component {
  render() {
    const item = this.props.item;
    const d = this.props.index;
    return <li className={`ct-series-${d}`}>{item}</li>;
  }
}

export default LineLegend;