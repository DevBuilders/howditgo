import { Modal } from "react-overlays";

export default class SurveyResults extends React.Component {
  state = { showModal: true };

  modalStyle = {
    position: "fixed",
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  backdropStyle = {
    ...this.modalStyle,
    zIndex: "auto",
    backgroundColor: "#000",
    opacity: 0.5
  };

  close = () => {
    this.setState({ showModal: false });
    this.props.removeSurvey(this.props.index);
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <div className="modal">
        <Modal
          style={this.modalStyle}
          backdropStyle={this.backdropStyle}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div className="survey">
            <h3>
              Survey for {this.props.pair}
            </h3>
          </div>
        </Modal>
        <style jsx>{`
          h3 {
            text-align: center;
          }
          .survey {
            position: absolute;
            top: 15vh;
            left: 20vw;
            width: 60vw;
            border: 1px solid #e5e5e5;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            padding: 20px;
            outline: none;
          }
        `}</style>
      </div>
    );
  }
}
