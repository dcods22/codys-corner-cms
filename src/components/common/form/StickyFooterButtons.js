import React from "react";
import styled from "styled-components";
import MobileView from "../view/MobileView";
import DesktopView from "../view/DesktopView";

const DesktopHolder = styled.div.attrs({
  className: "d-flex justify-content-end"
})`
  button:not(:last-child) {
    margin-right: 0.625rem;
  }
`;

const MobileHolder = styled.div.attrs({
  className: "fixed-bottom"
})`
  box-shadow: 0 -4px 1.25rem 0 rgba(0, 0, 0, 0.2);
  background: #ffffff;
  button:not(:last-child) {
    margin-bottom: 0.625rem;
  }
`;

const IconHolder = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center"
})`
  width: 100%;
  height: 38px;
  text-align: center;
`;

const Collapse = styled.div.attrs({
  "data-toggle": "collapse",
  href: "#stickFooterButtons",
  "aria-expanded": "false",
  "aria-controls": "stickFooterButtons"
})`
  i {
    color: #2b77eb;
    font-size: 1.25rem;
  }
`;

const ExpandIcon = styled.i.attrs({
  className: "fa fa-chevron-up"
})``;

const CollapseIcon = styled.i.attrs({
  className: "fa fa-chevron-down"
})``;

const CollapseData = styled.div.attrs({
  className: "collapse",
  id: "stickFooterButtons"
})``;

class StickyFooterButtons extends React.Component {
  constructor(props) {
    super(props);
    this.isOpen = this.isOpen.bind(this);
    this.toggle = React.createRef();
    this.state = { open: false };
  }

  componentDidMount() {
    this.isOpen();
  }

  isOpen() {
    let open = !!this.toggle && !!this.toggle.attributes && this.toggle.attributes["aria-expanded"].value === "true";
    this.setState({ open: open });
  }

  render() {
    return (
      <div>
        <MobileView>
          <MobileHolder>
            <IconHolder>
              <Collapse
                innerRef={toggle => {
                  this.toggle = toggle;
                }}
                onClick={this.isOpen}
              >
                {this.state.open ? <CollapseIcon /> : <ExpandIcon />}
              </Collapse>
            </IconHolder>
            <CollapseData>
              <div className="card card-body">{this.props.children}</div>
            </CollapseData>
          </MobileHolder>
        </MobileView>
        <DesktopView>
          <DesktopHolder>{this.props.children}</DesktopHolder>
        </DesktopView>
      </div>
    );
  }
}

export default StickyFooterButtons;
