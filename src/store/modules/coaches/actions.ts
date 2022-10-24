interface context {
  rootGetters: { userId: string };
  commit(action: string, data?: data | data[]): void;
  getters: getters;
}
interface data {
  firstName: string;
  lastName: string;
  description: string;
  hourlyRate: string;
  areas: string[];
  id?: string;
}
interface getters {
  shouldUpdate: boolean;
}

export default {
  async registerCoach(context: context, data: data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.hourlyRate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://vue-http-demo-85e9e.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context: context, payload: { forceRefresh: boolean }) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://main-prj-01-starting-setup-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches: data[] = [];

    for (const key in responseData) {
      const coach: data = {
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
        id: key,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
