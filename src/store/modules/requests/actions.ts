interface context {
  rootGetters: { userId: string };
  commit(action: string, data: request | request[]): void;
}

interface request {
  email: string;
  message: string;
  id?: string;
  coachId?: string;
}

export default {
  async contactCoach(context: context, payload: request) {
    const newRequest: request = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context: context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
