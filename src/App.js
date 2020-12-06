import "./App.css";
import Carousel from "./components/carousel/carousel";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Carousel
          slideCount={5}
        />
      </div>
    </div>
  );
}

export default App;
