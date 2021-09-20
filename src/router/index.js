import storyPage from "../pages/StoryPage";
import storeysListPage from "../pages/StoreysListPage";

export const routeNames = {
  STOREYS_LIST: '/',
  STORY: '/story'
}

export const routes = [
  {path: routeNames.STOREYS_LIST, exact: true, component: storeysListPage},
  {path: routeNames.STORY, exact: true, component: storyPage}
]