import Head from 'next/head';
import withData from '../lib/withData';
import ApprenticeList from '../components/ApprenticeList';
import ApprenticeReport from '../components/ApprenticeReport';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedApprentice: '' };
  }
  setApprentice(event) {
    this.setState({ selectedApprentice: event.target[event.target.selectedIndex].value });
  }
  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <nav>
          <h1>How'd it go?</h1>
          <ApprenticeList setApprentice={this.setApprentice.bind(this)} />
        </nav>

        <ApprenticeReport apprenticeName={this.state.selectedApprentice} />
        <style jsx global>{`
        html, body {
          height: 100%
          margin: 0
        }

        nav {
          background: LightSlateGray
          color: white
          top: 0
          height: 65px
          display: flex
          align-items: center;
          flex-direction: row;
        }
        h1 {
          margin-left: 20px
        }
        
      `}</style>
      </div>
    );
  }
}

export default withData(MainApp);
