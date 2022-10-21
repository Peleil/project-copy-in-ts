interface state {
  requests: request[];
}

interface request {
  coachId: string;
}

interface rootGetters {
  userId: string;
}

interface getters {
  requests: request[] | null;
}

export default {
  requests(state: state, _: unknown, _2: unknown, rootGetters: rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req: request) => req.coachId === coachId);
  },
  hasRequests(_: state, getters: getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
