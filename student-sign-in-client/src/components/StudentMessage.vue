<template>

  <div>

    <!-- Template/HTML here -->

    <div class="alert alert-info" v-if="student.name">
      <div v-if="student.present">
        Welcome, {{student.name}}
      </div>
      <div class="alert alert-success" v-else>
        Goodbye, {{student.name}}
      </div>
    </div>

  </div>

</template>

<script>

export default {
  // create components here
  name: 'StudentMessage',
  props: {
    student: Object
  }
}


</script>

<style scoped>


</style>