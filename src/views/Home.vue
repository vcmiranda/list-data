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
        <q-search hide-underline v-model="filter"></q-search>
      </template>
      <template slot="body" slot-scope="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="action" :props="props">
            <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md absolute-center"></q-checkbox>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-list highlight>
              <q-list-header class="bg-secondary text-white">Residents</q-list-header>
              <q-item-separator></q-item-separator>
              <template v-for="(resident,i) in props.row.residents">
                <q-item :key="`item${i}`">
                  <q-item-side icon="people"></q-item-side>
                  <q-item-main :label="resident"></q-item-main>
                </q-item>
                <q-item-separator :key="`separator${i}`"></q-item-separator>
              </template>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageHome',
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
  }),
  mounted() {
    this.GET_PLANETS();
  },
  computed: {
    ...mapState([
      'planets',
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'GET_PLANETS',
    ]),
  },
};
</script>
