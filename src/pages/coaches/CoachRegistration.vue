<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script lang="ts">
import CoachForm from '../../components/coaches/CoachForm.vue';
import { defineComponent } from 'vue';

interface data {
  firstName: string;
  lastName: string;
  description: string;
  hourlyRate: string;
  areas: string[];
  id?: string;
}

export default defineComponent({
  components: {
    CoachForm,
  },
  methods: {
    saveData(data: data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
});
</script>
