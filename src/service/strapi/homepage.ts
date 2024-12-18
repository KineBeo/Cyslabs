import strapi from "./config";
import { Content } from "./interface/section";

export interface Homepage {
  content: Content[];
}

interface HomepageResponse {
  data: Homepage;
}

const fetchHomepage = async (): Promise<Homepage | undefined> => {
  try {
    const response = await strapi.get<HomepageResponse>(
      "/homepage?populate[content][populate]=*"
    );

    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default fetchHomepage;
