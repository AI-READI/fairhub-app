import { ref } from "vue";

import { fetchParticipants } from "@/stores/services/service";
// export const data = ref(
//   Array.from({ length: 10 }).map(() => ({
//     name: faker.name.fullName(),
//     address: faker.address.streetAddress(),
//     age: faker.random.numeric(2),
//   }))
// );

export const participants = ref(await fetchParticipants());

console.log(participants);
