import React, { Component } from "react";
import { connect } from "react-redux";
import WineActions from "../components/WineInfo/WineActions";
import {
  MOVE_WINE_TO_ARCHIVE_REQUEST,
  MOVE_WINE_TO_INVENTORY_REQUEST
} from "../reducers/wineListReducer";

const mapDispatchToProps = dispatch => {
  return {
    archiveWine: wineId => {
      if (window.confirm("Sikker på at du vil arkivere denne vinen?")) {
        dispatch({
          type: MOVE_WINE_TO_ARCHIVE_REQUEST,
          payload: { wineId }
        });
      }
    },
    moveToInventory: wineId => {
      if (window.confirm("Har du kjøpte denne vinen?")) {
        dispatch({
          type: MOVE_WINE_TO_INVENTORY_REQUEST,
          payload: { wineId }
        });
      }
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
          moveToInventory={() => this.props.moveToInventory(this.props.wine.id)}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(WineActionsContainer);
