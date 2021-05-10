<template>

  <div>

    <!-- Template/HTML here -->
    <div class="alert alert-danger" v-if="errors.length > 0">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>

    <div class="card add-student m-2 p-2">
      <h4 class="card-title">Add new student</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <!-- TODO v-model newStudentName -->
        <input id="name" class="form-control" v-model.trim="newStudentName">
      </div>
      <div class="form-group">
        <label for="starID">Star ID</label>
        <!-- TODO v-model newStarID -->
        <input id="starID" class="form-control" v-model.trim="newStarID">
      </div>
      <!-- TODO v-on:click event handler -->
      <button class="btn btn-primary" v-on:click="addStudent">Add</button>
    </div>

  </div>

</template>

<script>

export default {
  // create components here
  name: 'NewStudentForm',
  emits: ['student-added'],
  data() {
    return {
      newStudentName: '',
      newStarID: '',
      errors: []
    }
  },
  methods: {
    addStudent() {

      this.errors = []

      if (!this.newStudentName) {
        this.errors.push('Student name must be entered');
      }

      if (!this.newStarID) {
        this.errors.push('StarID must be entered');
      }

      if (this.errors.length == 0) {
        let student = {name: this.newStudentName, starID: this.newStarID, present: false};

        // todo emit message to parent with the new student
        this.$emit('student-added', student)

        this.newStudentName = '';
        this.newStarID = '';
      }
    }
  }

}


</script>

<style scoped>


</style>