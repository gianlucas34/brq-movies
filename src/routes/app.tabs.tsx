import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MoviesScreen } from '../app/presentation/screens/movies/MoviesScreen'
import { FavoritedMoviesScreen } from '../app/presentation/screens/movies/FavoritedMoviesScreen'
import { TabBar } from '../ui/components/TabBar'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export const AppTabs = () => (
  <Navigator
    initialRouteName="Movies"
    tabBar={(props) => <TabBar {...props} />}
  >
    <Screen
      name="Movies"
      component={MoviesScreen}
      options={{ tabBarLabel: 'Todos os Filmes' }}
    />
    <Screen
      name="FavoritedMovies"
      component={FavoritedMoviesScreen}
      options={{ tabBarLabel: 'Filmes Favoritos' }}
    />
  </Navigator>
)
