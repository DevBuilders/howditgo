import { gql, graphql } from 'react-apollo'
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
} from 'recharts';

const parseOpinion = (opinion) => {
  switch(opinion) {
    case 'Agree':
      return 1
    case 'Unsure':
      return 0
    case 'Disagree':
      return -1
  }
}

const ApprenticeReport = ({ apprenticeName, data }) => {
  if (!apprenticeName) {
    return null
  }
  const ratings = data.allReviews.map(review => (
    {
      surveyedAt: new Date(review.surveyedAt),
      name: new Date(review.surveyedAt).toLocaleDateString(),
      rating: review.rating, pair: review.reviewerEmail
    }
  ))
  const driving = data.allReviews.map(review => {return {surveyedAt: new Date(review.surveyedAt), name: new Date(review.surveyedAt).toLocaleDateString(), driving: 100-review.driving, pair: review.reviewerEmail}})
  const opinions = data.allReviews.map(review => ({surveyedAt: new Date(review.surveyedAt), name: new Date(review.surveyedAt).toLocaleDateString(), engaged: parseOpinion(review.engaged), growth: parseOpinion(review.grown), learning: parseOpinion(review.learning), opinions: parseOpinion(review.opinions)}))
  return (
    <div>
      <h2>Report for {apprenticeName}</h2>
      <LineChart width={600} height={300} data={ratings}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis domain={[0,10]}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="rating" stroke="#8884d8" />
      </LineChart>

      <LineChart width={600} height={300} data={driving}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis domain={[0,100]}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="driving" stroke="#8884d8" />
      </LineChart>

      <BarChart width={600} height={300} data={opinions}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis domain={[-1,1]} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <ReferenceLine y={0} stroke='#000'/>
      <Bar dataKey="engaged" fill="#8884d8" />
      <Bar dataKey="growth" fill="#82ca9d" />
      <Bar dataKey="learning" fill="#ffc658" />
      <Bar dataKey="opinions" fill="#00C49F" />
      </BarChart>
      <style jsx>{`
        h2 {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

const apprenticeReviews = gql`
  query ($pair: String) {
    allReviews(filter: {pair: $pair}, orderBy: surveyedAt_ASC) {
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
`
export default graphql(apprenticeReviews, {
  options: (props) => ({
    variables: {
      pair: props.apprenticeName
    }
  })
})(ApprenticeReport);
