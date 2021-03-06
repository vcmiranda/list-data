<template>
  <q-page class="flex flex-center">
    <q-table
      title="Galaxy"
      :data="planets"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      row-key="name"
    >
      <template slot="top-right" slot-scope="props">
        <q-search hide-underline v-model="filter"/>
      </template>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="action" :props="props">
            <q-checkbox
              color="primary"
              v-model="props.expand"
              checked-icon="remove"
              unchecked-icon="add"
              class="q-mr-md absolute-center"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-list highlight>
              <q-list-header class="bg-secondary text-white">Residents</q-list-header>
              <q-item-separator/>
              <template v-for="(person,i) in props.row.residents">
                <q-item :key="`item${i}`">
                  <q-item-side icon="people"/>
                  <q-item-main :label="person.name"/>
                  <q-btn round icon="info" @click="viewPerson(person)"/>
                </q-item>
                <q-item-separator :key="`separator${i}`"/>
              </template>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <personCard :visible="dialogPersonCard" @input="viewPerson()" :person-data="dataPersonCard"></personCard>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import QBtn from 'quasar-framework/src/components/btn/QBtn';
import personCard from '../components/personCard.vue';

export default {
  name: 'PageHome',
  components: {
    QBtn,
    personCard,
  },
  data: () => ({
    pagination: {
      rowsPerPage: 10,
    },
    filter: '',
    columns: [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
        style: 'width: 100px',
      },
      {
        name: 'name',
        required: true,
        label: 'Planet',
        align: 'left',
        field: 'name',
        sortable: true,
        style: 'width: 200px',
      },
      {
        name: 'action',
        required: true,
        label: 'Action',
        align: 'center',
        field: 'action',
        style: 'width: 100px',
      },
    ],
    planets: [],
    people: [],
    dialogPersonCard: false,
    dataPersonCard: {},
  }),
  mounted() {
    Promise.all([
      this.dbDelete('planets'),
      this.dbDelete('people'),
    ])
      .then(() => this.getPeople())
      .then(() => this.getPlanets());
  },
  computed: {
    ...mapState([
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'getPlanets',
      'getPeople',
    ]),
    loadPlanets() {
      return this.dbGetBulk('planets')
        .then((res) => {
          this.planets = res.rows.sort((a, b) => a.doc.name.localeCompare(b.doc.name)).map((planet, i) => ({
            id: i + 1,
            name: planet.doc.name,
            residents: planet.doc.residents,
          }));
        })
        .catch(err => console.log(err));
    },
    viewPerson(value) {
      this.dialogPersonCard = !this.dialogPersonCard;
      if (value) {
        this.dataPersonCard = value;
      } else {
        this.dataPersonCard = {};
      }
    },
  },
  watch: {
    loading(value) {
      if (!value) {
        this.loadPlanets();
      }
    },
  },
};
</script>
