<template>
  <div class="ui container">
    <div class="ui inverted blue menu stackable">
      <div class="ui container">
        <a class=" item">
          <i class="bitcoin icon large"></i>
        </a>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/srvs" class="item">Services List</router-link>
        <router-link to="/aqi" class="item">Air Quality Index</router-link>
        <router-link to="/pistatus" class="item">Pi's Status</router-link>
        <router-link to="/login" class="item right">Login</router-link>
      </div>
    </div>
  </div>
</template>
