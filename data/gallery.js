// Photo order and captions. Image files and real sizes live in data/photos.js.
// To add a photo: put the file in public/images/photos, add it to photos.js, then list it here.
// The homepage preview shows the first 6 items.
import { photos } from "./photos";
const item = (key, alt, caption, category) => ({ id: key, ...photos[key], alt, caption, category });
export const gallery = [
  item("main-entrance", "The main entrance of Heightville Academy with the school signboard", "The main entrance", "Campus"),
  item("young-learners", "Young pupils in yellow and plaid uniforms at colourful tables in a classroom, with an alphabet chart on the wall", "Young learners in class", "Lower classes"),
  item("primary-classroom", "Pupils in yellow and plaid uniforms with red ties seated at wooden desks in a bright classroom", "A primary classroom", "Lower classes"),
  item("grounds", "School grounds with a lawn, trees and a painted boundary wall", "The school grounds", "Campus"),
  item("secondary-block", "Heightville Academy Secondary School building with students outside", "The Secondary School building", "Campus"),
  item("lesson-in-progress", "Pupils writing in exercise books while the whiteboard shows English, Mathematics and Civic Education notes", "A lesson in progress", "Lower classes"),
  item("science-demo", "A teacher guiding students in white laboratory coats through an experiment", "Science in Practice", "Science"),
  item("classroom-maths", "Students working in a classroom during a Mathematics lesson on linear equations", "Learning in the classroom", "Classroom"),
  item("lab-experiment", "Three students setting up laboratory apparatus", "Hands-on experiments", "Science"),
  item("school-courtyard", "A single-storey classroom block with a covered veranda facing a grassy courtyard", "The school courtyard", "Campus"),
  item("lab-chemistry", "Three students working at a laboratory bench with chemistry equipment", "Chemistry and laboratory work", "Science"),
  item("courtyard", "A path beside a classroom block, with trees and a painted boundary wall", "Beside the classroom block", "Campus"),
  item("school-vehicle", "A silver Heightville Academy van parked beside a yellow van", "A Heightville Academy vehicle", "Campus"),
  item("science-poster", "A student examining a glass slide in the laboratory beside a science poster", "Observe, experiment, discover", "Science"),
  item("periodic-table", "Students working in front of a periodic table in the laboratory", "Laboratory", "Science"),
  item("secondary-block-dusk", "Evening view of the Secondary School building", "The Secondary School at dusk", "Campus"),
];
