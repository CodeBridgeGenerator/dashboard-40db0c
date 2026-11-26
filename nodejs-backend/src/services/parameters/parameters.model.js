
    module.exports = function (app) {
        const modelName = "parameters";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            modelType: { type:  String , maxLength: 150, index: true, trim: true, comment: "Model Type, p, false, true, true, true, true, true, true, , , , ," },
accuracyNumber: { type: Number, max: 10000000, comment: "Accuracy Number, p_number, false, true, true, true, true, true, true, , , , ," },
timeStampOfVideo: { type: Date, comment: "Time Stamp Of Video, p_date, false, true, true, true, true, true, true, , , , ," },
numberOfPeople: { type: Number, max: 10000000, comment: "Number Of People, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };