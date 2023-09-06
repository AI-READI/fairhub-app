import { faker } from "@faker-js/faker";

const fname = faker.person.firstName();
const lname = faker.person.lastName();

const email = faker.internet.email({
  firstName: fname,
  lastName: lname,
});

const username = faker.internet.userName({
  firstName: fname,
  lastName: lname,
});

const company = faker.company.name();

console.log(`Hello ${fname} ${lname}`);
console.log(`Your username is ${username}`);
console.log(`Your email is ${email}`);
console.log(`Your company is ${company}`);
