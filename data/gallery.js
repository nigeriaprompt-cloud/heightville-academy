// Photo order and captions. Image files and real sizes live in data/photos.js.
// To add a photo: put the file in public/images/photos, add it to photos.js, then list it here.
import { photos } from "./photos";
const item = (key, alt, caption, category) => ({ id: key, ...photos[key], alt, caption, category });
export const gallery = [
  item("main-entrance", "The main entrance of Heightville Academy with the school signboard", "The main entrance", "Campus"),
  item("grounds", "School grounds with a lawn, trees and a painted boundary wall", "The school grounds", "Campus"),
  item("secondary-block", "Heightville Academy Secondary School building with students outside", "The Secondary School building", "Campus"),
  item("science-demo", "A teacher guiding students in white laboratory coats through an experiment", "Science in Practice", "Science"),
  item("classroom-maths", "Students working in a classroom during a Mathematics lesson on linear equations", "Learning in the classroom", "Classroom"),
  item("lab-experiment", "Three students setting up laboratory apparatus", "Hands-on experiments", "Science"),
  item("lab-chemistry", "Three students working at a laboratory bench with chemistry equipment", "Chemistry and laboratory work", "Science"),
  item("school-vehicle", "A silver Heightville Academy van parked beside a yellow van", "A Heightville Academy vehicle", "Campus"),
  item("science-poster", "A student examining a glass slide in the laboratory beside a science poster", "Observe, experiment, discover", "Science"),
  item("periodic-table", "Students working in front of a periodic table in the laboratory", "Laboratory", "Science"),
  item("secondary-block-dusk", "Evening view of the Secondary School building", "The Secondary School at dusk", "Campus"),
];
