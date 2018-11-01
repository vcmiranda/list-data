<template>
  <div id="app">
    <q-layout view="HHH LpR lFf">
      <q-layout-header>
        <q-toolbar color="secondary">
          <q-btn flat round dense icon="menu"></q-btn>
          <q-toolbar-title>
            Vitor Miranda
          </q-toolbar-title>
          <q-btn flat round dense icon="more_vert"></q-btn>
        </q-toolbar>
      </q-layout-header>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>
