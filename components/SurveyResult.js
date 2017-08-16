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

  formattedDate = date => {
    if (date) {
      const d = new Date(date);
      const currDate = d.getDate();
      const currMonth = d.getMonth() + 1;
      const currYear = d.getFullYear();
      return `${currMonth}/${currDate}/${currYear}`;
    } else {
      return "";
    }
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
              Survey for {this.props.pair} -
              {this.formattedDate(this.props.surveyedAt)}
            </h3>
            <h4>
              Reviewer: {this.props.reviewerEmail}
            </h4>
            <div className="commentGrid">
              <dt>Feedback</dt>
              <dd>
                {this.props.feedback}
              </dd>
              <dt>Additional Comments</dt>
              <dd>
                {this.props.addedComments ? this.props.addedComments : "NONE"}
              </dd>
              <dt>Rate the pairing session (1-10)</dt>
              <dd>
                {this.props.rating}
              </dd>
              <dt>How much was the apprentice driving (1%-100%)?</dt>
              <dd>
                {100 - this.props.driving}%
              </dd>
              <dt>Have they paired before?</dt>
              <dd>
                {this.props.previouslyPaired ? "Yes" : "No"}
              </dd>
              <dt>Have they grown?</dt>
              <dd>
                {this.props.grown}
              </dd>
              <dt>Are they engaged?</dt>
              <dd>
                {this.props.engaged}
              </dd>
              <dt>Are they giving opinions?</dt>
              <dd>
                {this.props.opinions}
              </dd>
              <dt>Are they learning from your sessions?</dt>
              <dd>
                {this.props.learning}
              </dd>
            </div>
          </div>
        </Modal>
        <style jsx>{`
          h3,
          h4 {
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
          .commentGrid {
            display: grid;
            grid-template-columns: 20% 80%;
            grid-row-gap: 15px;
          }
          dt {
            columns: 1;
          }
          dd {
            columns: 1;
          }
        `}</style>
      </div>
    );
  }
}
