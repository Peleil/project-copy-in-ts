interface state {
  requests: request[];
}
interface request {}

export default {
  addRequest(state: state, payload: request) {
    state.requests.push(payload);
  },
  setRequests(state: state, payload: request[]) {
    state.requests = payload;
  },
};
