import React, { Component } from "react";

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: null,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(`${this.props.url}/api/v1/blocks`);
      const data = await res.json();

      this.setState({ blocks: data.data });
    } catch (err) {
      console.log(err);
      this.setState({ blocks: "error" });
    }
  }

  render() {
    return (
      <div>
        {this.state.blocks ? (
          <>
            {Array.isArray(this.state.blocks) ? (
              this.state.blocks.map((block) => (
                <div className="blocks" key={block.id}>
                  <p className="blockIndex">{block.attributes.index}</p>
                  <p className="blockData">{block.attributes.data}</p>
                </div>
              ))
            ) : (
              <div style={{ color: "red" }}>Error: Node is Offline</div>
            )}
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}
