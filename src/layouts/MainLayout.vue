<template>
  <q-layout view="hHh lpr lFr">
    <q-header class="custom-bg q-px-md">
      <q-toolbar>
        <q-avatar size="30px">
          <q-img
            src="../assets/logo.png"
            spinner-color="primary"
            spinner-size="82px"
          />
        </q-avatar>
        <q-toolbar-title> Chess Viewer </q-toolbar-title>
        <q-btn
          dense
          flat
          label="GitHub"
          icon="fa-brands fa-github"
          class="text-capitalize text-white q-mr-md"
          href="https://www.google.ca"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
