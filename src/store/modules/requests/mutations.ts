import { defineComponent } from 'vue';

interface state {
  requests: unknown[];
}

export default defineComponent({
  addRequest(state: state, payload: unknown) {
    state.requests.push(payload);
  },
  setRequests(state: state, payload: unknown[]) {
    state.requests = payload;
  },
});
