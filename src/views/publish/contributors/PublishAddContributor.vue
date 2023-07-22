<script setup lang="ts">
import { faker } from "@faker-js/faker";
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { nanoid } from "nanoid";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useVersionStore } from "@/stores/version";
import { VersionContributor } from "@/types/Contributor";

const router = useRouter();
const route = useRoute();
const { error, success } = useMessage();

const authStore = useAuthStore();
const versionStore = useVersionStore();

const routeParams = {
  datasetId: route.params.datasetId,
  studyId: route.params.studyId,
  versionId: route.params.versionId,
};

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    error("You are not logged in.");
    router.push({ name: "home" });
  }
});

const contributorTypeOptions = [
  {
    label: "Central Imaging Facility",
    value: "CentralImagingFacility",
  },
  {
    label: "Central Laboratory",
    value: "CentralLaboratory",
  },
  {
    label: "Clinical Organisation",
    value: "ClinicalOrganisation",
  },
  {
    label: "Clinical Site",
    value: "ClinicalSite",
  },
  {
    label: "Clinical Study Manager",
    value: "ClinicalStudyManager",
  },
  {
    label: "Collaborating Organisation",
    value: "CollaboratingOrganisation",
  },
  {
    label: "Contact Person",
    value: "ContactPerson",
  },
  {
    label: "CT Site Principal Investigator",
    value: "CTSitePrincipalInvestigator",
  },
  {
    label: "Data Collector",
    value: "DataCollector",
  },
  {
    label: "Data Curator",
    value: "DataCurator",
  },
  {
    label: "Data Manager",
    value: "DataManager",
  },
  {
    label: "Distributor",
    value: "Distributor",
  },
  {
    label: "Editor",
    value: "Editor",
  },
  {
    label: "Funder Contact",
    value: "FunderContact",
  },
  {
    label: "Hosting Institution",
    value: "HostingInstitution",
  },
  {
    label: "Independent Monitoring Committee Member",
    value: "IndependentMonitoringCommitteeMember",
  },
  {
    label: "Logistics Support Organisation",
    value: "LogisticsSupportOrganisation",
  },
  {
    label: "Medicinal Product Supplier",
    value: "MedicinalProductSupplier",
  },
  {
    label: "Medical Device Supplier",
    value: "MedicalDeviceSupplier",
  },
  {
    label: "Producer",
    value: "Producer",
  },
  {
    label: "Project Leader",
    value: "ProjectLeader",
  },
  {
    label: "Project Manager",
    value: "ProjectManager",
  },
  {
    label: "Project Member",
    value: "ProjectMember",
  },
  {
    label: "Public Contact",
    value: "PublicContact",
  },
  {
    label: "Recruitment Contact",
    value: "RecruitmentContact",
  },
  {
    label: "Registration Agency",
    value: "RegistrationAgency",
  },
  {
    label: "Registration Authority",
    value: "RegistrationAuthority",
  },
  {
    label: "Related Person",
    value: "RelatedPerson",
  },
  {
    label: "Researcher",
    value: "Researcher",
  },
  {
    label: "Research Group",
    value: "ResearchGroup",
  },
  {
    label: "Research Group Member",
    value: "ResearchGroupMember",
  },
  {
    label: "Results Contact",
    value: "ResultsContact",
  },
  {
    label: "Rights Holder",
    value: "RightsHolder",
  },
  {
    label: "Scientific Support Organisation",
    value: "ScientificSupportOrganisation",
  },
  {
    label: "Sponsor",
    value: "Sponsor",
  },
  {
    label: "Sponsor Contact",
    value: "SponsorContact",
  },
  {
    label: "Sponsor Investigator",
    value: "SponsorInvestigator",
  },
  {
    label: "Study Funder",
    value: "StudyFunder",
  },
  {
    label: "Study Lead",
    value: "StudyLead",
  },
  {
    label: "Supervisor",
    value: "Supervisor",
  },
  {
    label: "Trial Sponsor",
    value: "TrialSponsor",
  },
  {
    label: "Work Package Leader",
    value: "WorkPackageLeader",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const formRef = ref<FormInst | null>(null);

const contributor: Ref<VersionContributor> = ref({
  id: nanoid(5),
  affiliations: [faker.company.name(), faker.company.name()],
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  orcid: faker.string.uuid(),
  roles: ["ContactPerson"],
});

const rules: FormRules = {
  affiliations: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (_rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one affiliation");
      },
    },
  ],
  firstname: [
    {
      message: "Please input a first name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  lastname: [
    {
      message: "Please input a last name",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  orcid: [
    {
      message: "Please input an ORCID",
      required: true,
      trigger: ["blur", "input"],
    },
  ],
  roles: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: (_rule: FormItemRule, value) => {
        if (value !== null && value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject("Please select at least one role for this contributor");
      },
    },
  ],
};

const addContributor = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const data = {
        id: contributor.value.id,
        affiliations: contributor.value.affiliations,
        firstname: contributor.value.firstname,
        lastname: contributor.value.lastname,
        orcid: contributor.value.orcid,
        roles: contributor.value.roles,
      };

      versionStore.addContributor(data);

      success("Contributor added.");

      const studyId = routeParams.studyId;
      const versionId = routeParams.versionId;
      const datasetId = routeParams.datasetId;

      router.push({ name: "publish-view-contributors", params: { datasetId, studyId, versionId } });
    } else {
      console.log("error");
      console.log(errors);
    }
  });
};
</script>

<template>
  <main class="flex h-full w-full flex-col space-y-8 pr-6">
    <h2 class="header">Add a contributor</h2>

    <n-divider />

    <n-form
      ref="formRef"
      :model="contributor"
      :rules="rules"
      size="large"
      label-placement="top"
      class="pr-4"
    >
      <n-form-item label="First Name" path="firstname">
        <n-input v-model:value="contributor.firstname" placeholder="Mabel" clearable />
      </n-form-item>

      <n-form-item label="Last Name" path="lastname">
        <n-input v-model:value="contributor.lastname" placeholder="Mora" clearable />
      </n-form-item>

      <n-form-item label="Affiliations" path="affiliations">
        <n-dynamic-input
          v-model:value="contributor.affiliations"
          placeholder="University of California, San Diego"
        />
      </n-form-item>

      <n-form-item label="ORCID" path="orcid">
        <n-input v-model:value="contributor.orcid" placeholder="0000-0003-3755-3795" clearable />
      </n-form-item>

      <n-form-item label="Roles" path="roles">
        <n-select
          v-model:value="contributor.roles"
          placeholder="Contact Person"
          multiple
          tag
          filterable
          clearable
          :options="contributorTypeOptions"
        />
      </n-form-item>

      <n-divider />

      <div class="flex justify-start">
        <n-button size="large" type="primary" @click="addContributor">
          <template #icon>
            <f-icon icon="material-symbols:add" />
          </template>
          Add Participant to Study
        </n-button>
      </div>
    </n-form>
  </main>
</template>
