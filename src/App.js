import './App.css';
import DisplayTheatre from './components/displayTheatre';
// import AddShows from './components/addShows';
import AddTheatre from './components/addTheatre';

function App() {
    return (
        <div className="App">
            <AddTheatre />
            {/* <AddShows /> */}
            <DisplayTheatre />
        </div>
    );
}

export default App;