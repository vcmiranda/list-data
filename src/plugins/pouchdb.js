import Vue from 'vue';
import PouchDB from 'pouchdb';

const methods = {
  // Create or Connect DB
  dbConnect(dbName) {
    return new PouchDB(dbName);
  },
  // Get all docs in a DB
  dbGetBulk(dbName) {
    return this.dbConnect(dbName).allDocs({ include_docs: true });
  },
  // Set all docs in a DB
  dbSetBulk(dbName, payload) {
    return this.dbConnect(dbName).bulkDocs(payload);
  },
  // Delete DB
  dbDelete(dbName) {
    return this.dbConnect(dbName).destroy();
  },
  // Close DB
  dbClose(dbName) {
    return this.dbConnect(dbName).close();
  },
};

Vue.mixin({
  methods,
});

export default methods;
