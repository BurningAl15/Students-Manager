import data from "./temp/classStructure.json";
import MainView from "./view/mainView";

function App() {
  const classInformation = data.class;
  const options = data.options;

  // console.log(classInformation);
  return (
    <>
      <MainView classInformation={classInformation} options={options} />
    </>
  );
}

export default App;
