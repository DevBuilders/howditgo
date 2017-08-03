import { gql, graphql } from 'react-apollo';

const ApprenticeList = ({ setApprentice, data: { allReviews } }) => {
  const uniqueApprentices = new Set(allReviews.map(review => review.pair));
  const apprentices = [...uniqueApprentices, ''].reverse();
  return (
    <div className="apprentice-list">
      <label htmlFor="apprenticeList">Apprentice: </label>
      <select onChange={setApprentice} name="apprenticeList">
        {apprentices.map((apprentice, index) => <option key={index}>{apprentice}</option>)}
      </select>
      <style jsx>{`
        .apprentice-list {
          margin-left: auto
          margin-right: 25px
          display: flex
          flex-direction: row
          -webkit-justify-content: flex-end
          justify-content: flex-end
        }
      `}</style>
    </div>
  );
};

const allApprentices = gql`
  query {
    allReviews {
      pair
    }
  }
`;
export default graphql(allApprentices, {
})(ApprenticeList);
