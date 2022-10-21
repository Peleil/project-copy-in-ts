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
interface getters {
  coaches: coach[];
}
interface rootGetters {
  userId: string;
}

export default {
  coaches(state: state) {
    return state.coaches;
  },
  hasCoaches(state: state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_: state, getters: getters, _2: unknown, rootGetters: rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: coach) => coach.id === userId);
  },
  shouldUpdate(state: state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
