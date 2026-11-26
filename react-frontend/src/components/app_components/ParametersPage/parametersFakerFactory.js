
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
modelType: faker.lorem.sentence(""),
accuracyNumber: faker.finance.amount(),
timeStampOfVideo: faker.date.soon(),
numberOfPeople: faker.finance.amount(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
