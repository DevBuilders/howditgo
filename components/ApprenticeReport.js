import { gql, graphql } from "react-apollo";
import {
  BarChart,
  LineChart,
  ReferenceLine,
  Line,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class ApprenticeReport extends React.Component {
  parseOpinion() {
    switch (opinion) {
      case "Agree":
        return 1;
      case "Unsure":
        return 0;
      case "Disagree":
        return -1;
    }
  }

  ratings() {
    return this.props.data.allReviews.map(review => ({
      surveyedAt: new Date(review.surveyedAt),
      name: new Date(review.surveyedAt).toLocaleDateString(),
      rating: review.rating,
      pair: review.reviewerEmail
    }));
  }
  driving() {
    return this.props.data.allReviews.map(review => {
      return {
        surveyedAt: new Date(review.surveyedAt),
        name: new Date(review.surveyedAt).toLocaleDateString(),
        driving: 100 - review.driving,
        pair: review.reviewerEmail
      };
    });
  }
  opinions() {
    return this.props.data.allReviews.map(review => ({
      surveyedAt: new Date(review.surveyedAt),
      name: new Date(review.surveyedAt).toLocaleDateString(),
      engaged: this.parseOpinion(review.engaged),
      growth: this.parseOpinion(review.grown),
      learning: this.parseOpinion(review.learning),
      opinions: this.parseOpinion(review.opinions)
    }));
  }
  render() {
    const { apprenticeName, data } = this.props;
    if (!apprenticeName) {
      return null;
    }
    return (
      <div>
        <h2>
          Report for {apprenticeName}
        </h2>
        <div className="reports">
          <div className="report">
            <LineChart
              width={600}
              height={300}
              data={this.ratings()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="report">
            <LineChart
              width={600}
              height={300}
              data={this.driving()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="driving" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="report">
            <BarChart
              width={600}
              height={300}
              data={this.opinions()}
              stackOffset="sign"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[-4, 4]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar stackId="a" dataKey="engaged" fill="#8884d8" />
              <Bar stackId="a" dataKey="growth" fill="#82ca9d" />
              <Bar stackId="a" dataKey="learning" fill="#ffc658" />
              <Bar stackId="a" dataKey="opinions" fill="#00C49F" />
            </BarChart>
          </div>
        </div>
        <style jsx>{`
          h2 {
            text-align: center;
          }
          .reports {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 98vw;
            margin: 1vw;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

const apprenticeReviews = gql`
  query($pair: String) {
    allReviews(filter: { pair: $pair }, orderBy: surveyedAt_ASC) {
      pair
      rating
      driving
      createdAt
      engaged
      learning
      grown
      opinions
      reviewerEmail
      surveyedAt
    }
  }
`;
export default graphql(apprenticeReviews, {
  options: props => ({
    variables: {
      pair: props.apprenticeName
    }
  })
})(ApprenticeReport);
