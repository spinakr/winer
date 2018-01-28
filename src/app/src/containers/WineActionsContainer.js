import React, { Component } from "react";
import { connect } from "react-redux";
import WineActions from "../components/WineInfo/WineActions";
import { MOVE_WINE_TO_ARCHIVE_REQUEST } from "../reducers/wineListReducer";

const mapDispatchToProps = dispatch => {
  return {
    archiveWine: wineId => {
      dispatch({
        type: MOVE_WINE_TO_ARCHIVE_REQUEST,
        payload: { wineId }
      });
    }
  };
};

class WineActionsContainer extends Component {
  render() {
    return (
      <div>
        <WineActions
          wine={this.props.wine}
          archiveWine={() => this.props.archiveWine(this.props.wine.id)}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(WineActionsContainer);
