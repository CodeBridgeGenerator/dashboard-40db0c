const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("parameters service", async () => {
  let thisService;
  let parameterCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("parameters");

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
    assert.ok(thisService, "Registered the service (parameters)");
  });

  describe("#create", () => {
    const options = {"modelType":"new value","accuracyNumber":23,"timeStampOfVideo":"2026-11-26T19:12:53.652Z","numberOfPeople":23};

    beforeEach(async () => {
      parameterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new parameter", () => {
      assert.strictEqual(parameterCreated.modelType, options.modelType);
assert.strictEqual(parameterCreated.accuracyNumber, options.accuracyNumber);
assert.strictEqual(parameterCreated.timeStampOfVideo.toISOString(), options.timeStampOfVideo);
assert.strictEqual(parameterCreated.numberOfPeople, options.numberOfPeople);
    });
  });

  describe("#get", () => {
    it("should retrieve a parameter by ID", async () => {
      const retrieved = await thisService.Model.findById(parameterCreated._id);
      assert.strictEqual(retrieved._id.toString(), parameterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"modelType":"updated value","accuracyNumber":100,"timeStampOfVideo":"2026-11-26T19:12:53.652Z","numberOfPeople":100};

    it("should update an existing parameter ", async () => {
      const parameterUpdated = await thisService.Model.findByIdAndUpdate(
        parameterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(parameterUpdated.modelType, options.modelType);
assert.strictEqual(parameterUpdated.accuracyNumber, options.accuracyNumber);
assert.strictEqual(parameterUpdated.timeStampOfVideo.toISOString(), options.timeStampOfVideo);
assert.strictEqual(parameterUpdated.numberOfPeople, options.numberOfPeople);
    });
  });

  describe("#delete", async () => {
    it("should delete a parameter", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const parameterDeleted = await thisService.Model.findByIdAndDelete(parameterCreated._id);
      assert.strictEqual(parameterDeleted._id.toString(), parameterCreated._id.toString());
    });
  });
});