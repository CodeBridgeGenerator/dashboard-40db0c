
    module.exports = function (app) {
        const modelName = "predictions";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            imagePath: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Image Path, p, false, true, true, true, true, true, true, , , , ," },
confidence: { type: Number, max: 10000000, comment: "Confidence, p_number, false, true, true, true, true, true, true, , , , ," },
timestamp: { type: Date, required: true, comment: "Timestamp, p_date, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };