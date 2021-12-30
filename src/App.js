import "./App.css";
import Carousel from "./Carousel";
import Slide from "./Slide";

function App() {
  return (
    <div className="App">
      <div className="container">
      <Carousel>
        {[...Array(4)].map((a, index) => {
          return <Slide key={index + 1}>{index + 1}</Slide>;
        })}
      </Carousel>
      </div>
    </div>
  );
}

export default App;
