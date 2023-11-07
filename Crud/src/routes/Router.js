import { createStackNavigator } from '@react-navigation/stack'
import ListaPessoas from '../screens/list/ListaPessoas'
import FormPessoas from '../screens/form/FormPessoas'

const Stack = createStackNavigator()

export default function Router() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShow: false }}
      initialRouteName='ListaPessoas'
    >

      <Stack.Screen name='ListaPessoas' component={ListaPessoas}/>
      <Stack.Screen name='FormPessoas' component={FormPessoas}/>

    </Stack.Navigator>
  )
}

