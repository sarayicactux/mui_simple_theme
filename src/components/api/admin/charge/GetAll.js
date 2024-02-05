// import axios from "axios";
import { fakerFA as faker } from "@faker-js/faker";

const GetAll = async (token) => {
  try {
    // const result = await axios.get(
    //   `${process.env.REACT_APP_HOST}admin/charge`,
    //   {
    //     params: {},
    //     headers: {
    //       jtoken: token,
    //     },
    //   }
    // );
    const result = [];
    for (let i = 0; i < 200; i++) {
      result.push({
        id: faker.number.int({ max: 250 }),
        title: faker.lorem.word(),
        price: faker.commerce.price({ min: 50000, max: 200000 }),
        description: faker.lorem.paragraph(),
        status: faker.number.binary(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
      });
    }
    return { status: 200, data: { charges: result } };
  } catch (error) {
    console.log(error);
    return error.request;
  }
};

export default GetAll;
