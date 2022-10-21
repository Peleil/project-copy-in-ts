interface state {
  coaches: coach[];
  lastFetch: number;
}
interface coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}

export default {
  registerCoach(state: state, payload: coach) {
    state.coaches.push(payload);
  },
  setCoaches(state: state, payload: coach[]) {
    state.coaches = payload;
  },
  setFetchTimestamp(state: state) {
    state.lastFetch = new Date().getTime();
  },
};
