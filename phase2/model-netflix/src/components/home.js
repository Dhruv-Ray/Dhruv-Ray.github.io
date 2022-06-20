import '../App.css';
import Featured from './featured';
import ForYou from './foryou';
import TopBar from './topbar';
import '../index.css';


function Home() {
    return (
      <div className="App">
        <TopBar/>
        <Featured/>
        <ForYou/>
      </div>
    );
  }
  
export default Home;