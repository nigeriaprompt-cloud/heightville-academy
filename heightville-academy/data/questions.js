// Objective question bank. Add questions with q(subject, topic, difficulty, question, options, correctIndex, explanation).
// difficulty: "Easy" | "Medium" | "Hard". The subject must exist in data/subjects.js.
import { departments } from "./subjects";
const deptOf = (s) => Object.keys(departments).find((d) => departments[d].includes(s));
const q = (subject, topic, difficulty, question, options, correct, explanation) =>
  ({ subject, department: deptOf(subject), topic, difficulty, question, options, answer: options[correct], explanation });

export const questions = [
  q("Mathematics", "Fractions", "Easy", "Simplify 3/4 + 1/8.", ["4/12", "7/8", "1", "5/8"], 1, "3/4 = 6/8, so 6/8 + 1/8 = 7/8."),
  q("Mathematics", "Percentages", "Easy", "What is 15% of 200?", ["15", "20", "30", "45"], 2, "15/100 × 200 = 30."),
  q("Mathematics", "Algebra", "Medium", "Solve for x: 2x + 7 = 19.", ["5", "6", "7", "12"], 1, "2x = 12, so x = 6."),
  q("Mathematics", "Mensuration", "Medium", "Find the area of a circle of radius 7 cm (π = 22/7).", ["44 cm²", "154 cm²", "308 cm²", "49 cm²"], 1, "Area = πr² = 22/7 × 49 = 154 cm²."),
  q("Mathematics", "Coordinate geometry", "Medium", "Find the gradient of the line through (1, 2) and (3, 8).", ["2", "3", "4", "6"], 1, "Gradient = (8 − 2)/(3 − 1) = 3."),
  q("Mathematics", "Logarithms", "Hard", "If log₂ x = 5, then x equals", ["10", "25", "32", "64"], 2, "x = 2⁵ = 32."),

  q("Biology", "Cell biology", "Easy", "Which organelle is known as the powerhouse of the cell?", ["Nucleus", "Mitochondrion", "Ribosome", "Vacuole"], 1, "Mitochondria release energy from food during respiration."),
  q("Biology", "Nutrition", "Easy", "Which food class is the main source of energy?", ["Proteins", "Carbohydrates", "Vitamins", "Mineral salts"], 1, "Carbohydrates are the body’s main energy source."),
  q("Biology", "Plants", "Medium", "The process by which green plants make food using sunlight is called", ["Respiration", "Transpiration", "Photosynthesis", "Digestion"], 2, "Photosynthesis uses light, water and carbon dioxide to make glucose."),
  q("Biology", "Genetics", "Medium", "The basic unit of heredity is the", ["Chromosome", "Gene", "Cell", "Tissue"], 1, "A gene carries the instructions for a characteristic."),
  q("Biology", "Blood", "Medium", "Which blood component carries oxygen?", ["White blood cells", "Platelets", "Red blood cells", "Plasma"], 2, "Red blood cells contain haemoglobin, which carries oxygen."),
  q("Biology", "Human organs", "Hard", "Which of these is NOT a function of the liver?", ["Production of bile", "Storage of glycogen", "Production of insulin", "Breakdown of old red blood cells"], 2, "Insulin is produced by the pancreas."),

  q("Chemistry", "Elements", "Easy", "What is the chemical symbol for sodium?", ["S", "So", "Na", "N"], 2, "Na comes from the Latin name natrium."),
  q("Chemistry", "Acids and bases", "Easy", "The pH of a neutral solution at 25°C is", ["0", "7", "14", "1"], 1, "pH 7 is neutral; below 7 is acidic and above 7 is basic."),
  q("Chemistry", "Reactions", "Medium", "Which gas is produced when zinc reacts with dilute hydrochloric acid?", ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"], 2, "Zinc + hydrochloric acid → zinc chloride + hydrogen."),
  q("Chemistry", "Atomic structure", "Medium", "The number of protons in an atom is called its", ["Mass number", "Atomic number", "Valency", "Isotope number"], 1, "The atomic number equals the number of protons."),
  q("Chemistry", "Periodic table", "Medium", "Which of these is a noble gas?", ["Nitrogen", "Argon", "Oxygen", "Chlorine"], 1, "Argon is in Group 18, the noble gases."),
  q("Chemistry", "Mole concept", "Hard", "How many moles are in 36 g of water? (H = 1, O = 16)", ["1", "2", "3", "4"], 1, "Molar mass of H₂O = 18 g/mol, so 36 ÷ 18 = 2 moles."),

  q("Physics", "Units", "Easy", "The SI unit of force is the", ["Joule", "Newton", "Watt", "Pascal"], 1, "Force is measured in newtons (N)."),
  q("Physics", "Motion", "Easy", "Which of these is a vector quantity?", ["Speed", "Mass", "Velocity", "Time"], 2, "Velocity has both magnitude and direction."),
  q("Physics", "Motion", "Medium", "A car moves 120 m in 10 s at constant speed. Its speed is", ["6 m/s", "12 m/s", "120 m/s", "1200 m/s"], 1, "Speed = distance ÷ time = 120 ÷ 10 = 12 m/s."),
  q("Physics", "Light", "Medium", "The bending of light as it passes from one medium to another is called", ["Reflection", "Refraction", "Diffraction", "Dispersion"], 1, "Refraction happens because light changes speed between media."),
  q("Physics", "Electricity", "Medium", "Which law states that V = IR?", ["Newton’s law", "Ohm’s law", "Boyle’s law", "Hooke’s law"], 1, "Ohm’s law relates voltage, current and resistance."),
  q("Physics", "Forces", "Hard", "A body of mass 5 kg is acted on by a force of 20 N. Its acceleration is", ["0.25 m/s²", "4 m/s²", "15 m/s²", "100 m/s²"], 1, "a = F/m = 20 ÷ 5 = 4 m/s²."),

  q("English Language", "Vocabulary", "Easy", "Choose the word opposite in meaning to ‘generous’.", ["Kind", "Stingy", "Rich", "Honest"], 1, "A generous person gives freely; a stingy person does not."),
  q("English Language", "Grammar", "Easy", "Choose the correct sentence.", ["Neither of the boys are here.", "Neither of the boys is here.", "Neither of the boys were here.", "Neither of the boys be here."], 1, "‘Neither’ takes a singular verb."),
  q("English Language", "Figures of speech", "Medium", "The figure of speech in ‘The wind whispered through the trees’ is", ["Simile", "Metaphor", "Personification", "Hyperbole"], 2, "The wind is given a human action, whispering."),
  q("English Language", "Grammar", "Medium", "Choose the word that best completes: She has lived here ___ 2015.", ["for", "since", "from", "during"], 1, "‘Since’ is used with a point in time."),
  q("English Language", "Parts of speech", "Medium", "A word that replaces a noun is called a", ["Verb", "Adjective", "Pronoun", "Adverb"], 2, "Pronouns such as he, she and it replace nouns."),
  q("English Language", "Idioms", "Hard", "The idiom ‘to kick the bucket’ means", ["To play a game", "To die", "To be angry", "To travel"], 1, "It is an informal idiom meaning to die."),

  q("Literature in English", "Poetry", "Easy", "A poem of fourteen lines is a", ["Ballad", "Sonnet", "Limerick", "Elegy"], 1, "A sonnet has fourteen lines."),
  q("Literature in English", "Poetry", "Easy", "A long narrative poem about heroic deeds is called an", ["Ode", "Epic", "Elegy", "Haiku"], 1, "Epics tell of heroes and great events."),
  q("Literature in English", "Drama", "Medium", "The main character in a literary work is the", ["Antagonist", "Protagonist", "Narrator", "Chorus"], 1, "The protagonist is the central character."),
  q("Literature in English", "Drama", "Medium", "A play with a happy ending is a", ["Tragedy", "Comedy", "Epic", "Satire"], 1, "Comedies end happily."),
  q("Literature in English", "Devices", "Medium", "Repetition of consonant sounds at the start of nearby words is", ["Assonance", "Alliteration", "Rhyme", "Onomatopoeia"], 1, "Example: ‘Peter Piper picked a peck’."),
  q("Literature in English", "African literature", "Hard", "Who wrote the novel ‘Things Fall Apart’?", ["Chinua Achebe", "Wole Soyinka", "Chimamanda Adichie", "Ngũgĩ wa Thiong’o"], 0, "Chinua Achebe published it in 1958."),

  q("Government", "Nigerian history", "Easy", "Nigeria gained independence from Britain in", ["1914", "1960", "1963", "1966"], 1, "Independence was on 1 October 1960."),
  q("Government", "Arms of government", "Easy", "The head of the federal executive in Nigeria is the", ["Chief Justice", "President", "Senate President", "Governor"], 1, "The President heads the federal executive."),
  q("Government", "Arms of government", "Medium", "The three arms of government are the executive, the legislature and the", ["Police", "Judiciary", "Civil service", "Military"], 1, "The judiciary interprets the law."),
  q("Government", "Systems of government", "Medium", "A system in which power is shared between central and regional governments is", ["Unitary", "Federal", "Monarchy", "Oligarchy"], 1, "That is federalism, as practised in Nigeria."),
  q("Government", "Citizenship", "Medium", "The right of citizens to vote and be voted for is called", ["Suffrage", "Naturalisation", "Sovereignty", "Patriotism"], 0, "Suffrage is the right to vote."),
  q("Government", "Political ideas", "Hard", "The principle of separation of powers is associated with", ["John Locke", "Montesquieu", "Karl Marx", "Jean Bodin"], 1, "Montesquieu set it out in ‘The Spirit of the Laws’."),

  q("Economics", "Basic concepts", "Easy", "The basic economic problem is", ["Inflation", "Scarcity", "Unemployment", "Taxation"], 1, "Wants are unlimited but resources are scarce."),
  q("Economics", "Basic concepts", "Easy", "The next best alternative given up when a choice is made is called", ["Marginal cost", "Opportunity cost", "Fixed cost", "Total cost"], 1, "That is the definition of opportunity cost."),
  q("Economics", "Demand and supply", "Medium", "When price rises and quantity demanded falls, this illustrates the law of", ["Supply", "Demand", "Diminishing returns", "Comparative advantage"], 1, "The law of demand links higher prices with lower quantity demanded."),
  q("Economics", "Money and prices", "Medium", "A sustained rise in the general price level is called", ["Deflation", "Inflation", "Devaluation", "Recession"], 1, "Inflation reduces the purchasing power of money."),
  q("Economics", "Production", "Medium", "Which of these is a factor of production?", ["Labour", "Profit", "Tax", "Subsidy"], 0, "The factors are land, labour, capital and entrepreneurship."),
  q("Economics", "Elasticity", "Hard", "If demand is price inelastic, a rise in price will cause total revenue to", ["Fall", "Rise", "Remain unchanged", "Become zero"], 1, "Quantity falls proportionally less than price rises."),

  q("Commerce", "Aids to trade", "Easy", "Which of these is an aid to trade?", ["Banking", "Farming", "Mining", "Fishing"], 0, "Banking, insurance, transport and warehousing are aids to trade."),
  q("Commerce", "Documents", "Easy", "A document from seller to buyer showing goods supplied and the amount due is an", ["Receipt", "Invoice", "Cheque", "Catalogue"], 1, "An invoice lists goods sold and the amount owed."),
  q("Commerce", "Business units", "Medium", "A business owned and run by one person is a", ["Partnership", "Sole proprietorship", "Cooperative", "Public company"], 1, "Sole proprietorship has a single owner."),
  q("Commerce", "Distribution", "Medium", "Moving goods from producers to consumers is called", ["Production", "Distribution", "Insurance", "Auditing"], 1, "Distribution links producers with consumers."),
  q("Commerce", "Insurance", "Medium", "The insurance principle requiring full disclosure of all material facts is", ["Indemnity", "Utmost good faith", "Subrogation", "Contribution"], 1, "Both parties must disclose all material facts."),
  q("Commerce", "Banking", "Hard", "Which of these is a function of a commercial bank?", ["Printing money", "Accepting deposits", "Setting monetary policy", "Supervising other banks"], 1, "Printing money and policy are central bank roles."),

  q("Accounting", "Basics", "Easy", "The accounting equation is", ["Assets = Liabilities + Capital", "Assets = Capital − Liabilities − Drawings", "Capital = Assets + Liabilities", "Liabilities = Assets + Capital"], 0, "What a business owns is funded by owners’ capital and liabilities."),
  q("Accounting", "Cash book", "Easy", "In the cash book, the debit side records", ["Payments", "Receipts", "Expenses", "Drawings"], 1, "Money received is debited; money paid is credited."),
  q("Accounting", "Books of original entry", "Medium", "Goods bought on credit are first recorded in the", ["Sales journal", "Purchases journal", "Cash book", "Petty cash book"], 1, "The purchases journal records credit purchases."),
  q("Accounting", "Final accounts", "Medium", "Gross profit is", ["Sales − cost of goods sold", "Sales − all expenses", "Purchases − sales", "Assets − liabilities"], 0, "Gross profit comes before deducting overheads."),
  q("Accounting", "Balance sheet", "Medium", "Which of these is a current asset?", ["Land", "Debtors", "Machinery", "Buildings"], 1, "Debtors are expected to pay within a year."),
  q("Accounting", "Final accounts", "Hard", "Opening stock ₦5,000, purchases ₦20,000, closing stock ₦4,000. The cost of goods sold is", ["₦21,000", "₦19,000", "₦29,000", "₦25,000"], 0, "5,000 + 20,000 − 4,000 = ₦21,000."),
].map((x, i) => ({ id: i + 1, ...x }));
