const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("predictions service", async () => {
  let thisService;
  let predictionCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("predictions");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (predictions)");
  });

  describe("#create", () => {
    const options = {"imagePath":"new value","confidence":23,"timestamp":"2026-11-26T19:12:53.634Z"};

    beforeEach(async () => {
      predictionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new prediction", () => {
      assert.strictEqual(predictionCreated.imagePath, options.imagePath);
assert.strictEqual(predictionCreated.confidence, options.confidence);
assert.strictEqual(predictionCreated.timestamp.toISOString(), options.timestamp);
    });
  });

  describe("#get", () => {
    it("should retrieve a prediction by ID", async () => {
      const retrieved = await thisService.Model.findById(predictionCreated._id);
      assert.strictEqual(retrieved._id.toString(), predictionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"imagePath":"updated value","confidence":100,"timestamp":"2026-11-26T19:12:53.634Z"};

    it("should update an existing prediction ", async () => {
      const predictionUpdated = await thisService.Model.findByIdAndUpdate(
        predictionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(predictionUpdated.imagePath, options.imagePath);
assert.strictEqual(predictionUpdated.confidence, options.confidence);
assert.strictEqual(predictionUpdated.timestamp.toISOString(), options.timestamp);
    });
  });

  describe("#delete", async () => {
    it("should delete a prediction", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const predictionDeleted = await thisService.Model.findByIdAndDelete(predictionCreated._id);
      assert.strictEqual(predictionDeleted._id.toString(), predictionCreated._id.toString());
    });
  });
});