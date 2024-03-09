// import axios from "axios";
import { fakerFA as faker } from "@faker-js/faker";

const GetAll = async (token) => {
  try {
    // const result = await axios.get(
    //   `${process.env.REACT_APP_HOST}admin/org`,
    //   {
    //     params: {},
    //     headers: {
    //       jtoken: token,
    //     },
    //   }
    // );
    const result = [];
    for (let i = 0; i < 50; i++) {
      result.push({
        id: faker.number.int({ max: 250 }),
        name: faker.company.name(),
        n_code: faker.number.bigInt({ min: 1023654789, max: 6296301207 }),
        agency: faker.person.fullName({ sex: "female" }),
        status: faker.number.binary(),
        state: faker.location.state(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        expire_at: faker.date.anytime(),
      });
    }
    return { status: 200, data: { orgs: result } };
  } catch (error) {
    console.log(error);
    return error.request;
  }
};

export default GetAll;
