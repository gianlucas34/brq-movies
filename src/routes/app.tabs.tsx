import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MoviesScreen } from '../app/presentation/screens/movies/MoviesScreen'
import { FavoritesScreen } from '../app/presentation/screens/movies/FavoriteMoviesScreen'
import { TabBar } from '../ui/components/TabBar'

const Tab = createMaterialTopTabNavigator()

export const AppTabs = () => (
  <Tab.Navigator
    initialRouteName="Movies"
    tabBar={(props) => <TabBar {...props} />}
  >
    <Tab.Screen
      name="Movies"
      component={MoviesScreen}
      options={{ tabBarLabel: 'Todos os Filmes' }}
    />
    <Tab.Screen
      name="FavoriteMovies"
      component={FavoritesScreen}
      options={{ tabBarLabel: 'Filmes Favoritos' }}
    />
  </Tab.Navigator>
)
