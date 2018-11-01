<template>
  <q-dialog
    v-model="visible"
    stack-buttons
    prevent-close
  >
    <span slot="title">Resident Information</span>

    <span slot="message" class="text-weight-bold q-title">Name: {{ person.name }}</span>

    <div slot="body">
      <q-list>
        <q-item>
          <q-item-side icon="folder" inverted color="primary" />
          <q-item-main>
            <q-item-tile label>Gender: {{ person.gender }}</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="secondary" />
          <q-item-main>
            <q-item-tile label>Height: {{ person.height }} mm</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="tertiary" />
          <q-item-main>
            <q-item-tile label>Mass: {{ person.mass }} kg</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="info" />
          <q-item-main>
            <q-item-tile label>Hair Color: {{ person.hair_color }}</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="warning" />
          <q-item-main>
            <q-item-tile label>Skin Color: {{ person.skin_color }}</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="negative" />
          <q-item-main>
            <q-item-tile label>Eye Color: {{ person.eye_color }}</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
        <q-item>
          <q-item-side icon="folder" inverted color="positive" />
          <q-item-main>
            <q-item-tile label>Birth Year: {{ person.birth_year }}</q-item-tile>
          </q-item-main>
          <q-item-separator inset />
        </q-item>
      </q-list>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="secondary" label="Close" @click="close()" />
    </template>
  </q-dialog>
</template>

<script>
export default {
  name: 'personCard',
  props: ['visible', 'personData'],
  data: () => ({
    person: {},
  }),
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
  watch: {
    personData(value) {
      if (value) {
        this.dbFind('people', {
          selector: { url: value.url },
          fields: ['_id', 'name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender'],
        })
          .then((ret) => {
            this.person = ret.docs[0];
          });
      }
    },
  },
};
</script>
