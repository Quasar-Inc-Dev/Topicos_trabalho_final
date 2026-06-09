import { Location } from '../screens/Home/homeScreen';

export type RootStackParamList = {
  Home: undefined;
  Detalhes: { location: Location };
};
