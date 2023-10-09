import Students from "../../pages/Students";
import Lessons from "../../pages/Lessons";
import { shallow } from "zustand/shallow";
import { useNavIndex } from "../store/navIndex";
import data from "../temp/data2.json";

export default function MainView() {
  const { classInformation, options, lessons_list, lessons_options } = data;
  // const classInformation = data.classInformation;
  // const options = data.options;
  // const lessons_list = data.lessons_list;
  // const lessons_options = data.lessons_options;

  const { navIndex } = useNavIndex(
    (state) => ({
      navIndex: state.navIndex,
    }),
    shallow
  );

  return (
    <>
      {navIndex === 0 ? (
        <Students classInformation={classInformation} options={options} />
      ) : (
        <Lessons
          lessons_list={lessons_list}
          lessons_options={lessons_options}
        />
      )}
    </>
  );
}
