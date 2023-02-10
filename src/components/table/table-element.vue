<script lang="ts">
import { NTable } from "naive-ui";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    NTable,
  },
  props: {
    mode: {
      type: String,
      validator: function (value: string) {
        return ["basic", "border", "size", "stripe"].indexOf(value) !== -1;
      },
    },
  },
});
</script>

<template>
  <n-table :bordered="false" :single-line="false" v-if="mode === 'basic'">
    <thead>
      <tr>
        <th>Basic</th>
        <th>Abormal</th>
        <th>Abolish</th>
        <th>...</th>
        <th>It's hard to learn words</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>...</td>
        <td>I can't remember those words.</td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
    </tbody>
  </n-table>

  <n-table :single-line="false" v-if="mode === 'border'">
    <thead>
      <tr>
        <th>border</th>
        <th>Abormal</th>
        <th>Abolish</th>
        <th>...</th>
        <th>It's hard to learn words</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>...</td>
        <td>I can't remember those words.</td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
    </tbody>
  </n-table>

  <n-space vertical v-if="mode === 'size'">
    <n-table :bordered="false" :single-line="false" size="small">
      <thead>
        <tr>
          <th>size</th>
          <th>Abnormal</th>
          <th>Abolish</th>
          <th>...</th>
          <th>It's hard to learn words</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>...</td>
          <td>I can't remember those words.</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>

  <n-space vertical v-if="mode === 'stripe'">
    <n-table striped>
      <thead>
        <tr>
          <th>stripe</th>
          <th>Abormal</th>
          <th>Abolish</th>
          <th>...</th>
          <th>It's hard to learn words</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>...</td>
          <td>I can't remember those words.</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>
</template>
