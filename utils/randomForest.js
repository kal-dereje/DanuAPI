const RandomForest = require("random-forest").RandomForest;
const csv = require("csv-parser");
const fs = require("fs");

function randomForestClassifer(userData) {
  // Define the path to your CSV file
  const csvFilePath = "./test_dataset.csv";

  // Define the column names
  const features = [
    "gender",
    "age",
    "relationship_status",
    "been_in_therapy",
    "current_eating_habits",
    "overwhelming_sadness_grief_depression",
    "little_interest_pleasure",
    "feeling_down_depressed_hopeless",
    "poor_appetite_or_overeating",
    "thought_of_dying",
    "currently_employed",
    "drinks_alcohol",
    "thought_about_suicide",
    "currently_experiencing_anxiety_panic_attack_or_phobias",
    "takes_any_medication",
    "any_chronic_pain",
    "sleeping_habits",
  ];

  // Load the data from the CSV file
  const data = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const instance = [];
      features.forEach((feature) => {
        instance.push(row[feature]);
      });
      instance.push(row["class_label"]);
      data.push(instance);
    })
    .on("end", () => {
      // Split the data into features and labels
      const X = data.map((instance) => instance.slice(0, -1));
      const y = data.map((instance) => instance.slice(-1)[0]);

      // Create a new random forest classifier
      const rf = new RandomForest();

      // Train the random forest classifier
      rf.train(X, y, { numTrees: 10 });

      // Make predictions on new data
      const prediction = rf.predict([userData]);
      console.log("Prediction:", prediction);
    });
}

module.exports = randomForestClassifer;
