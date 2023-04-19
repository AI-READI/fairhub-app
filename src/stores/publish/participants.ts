import { faker } from "@faker-js/faker";
import { ref } from "vue";
export const data = ref(
  Array.from({ length: 10 }).map(() => ({
    name: faker.name.fullName(),
    address: faker.address.streetAddress(),
    age: faker.random.numeric(2),
  }))
);

// export interface Person {
//   name: string;
//   address: string;
//   age: string;
// }
//
// export const selectedParticipants: Ref<Person[]> = ref([]);
