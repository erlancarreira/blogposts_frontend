import { Tabs } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Home, StarIcon } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { setIsSearching } from '@/store/slices/postsSlice';
import DefaultTitle from '@/components/ui/DefaultTitle';
import IconSearch from '@/assets/images/lupa_search.png';
import DefaultImageIcon from '@/components/ui/DefaultImageIcon';
import HeaderContainer from '@/components/ui/HeaderContainer';

export default function TabLayout() {
  const dispatch = useDispatch();

  const handleSearchPress = () => {
    dispatch(setIsSearching(true));
  };

  return (
    
    <Tabs >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <HeaderContainer>
              <DefaultTitle >Início</DefaultTitle>
              <TouchableOpacity 
                onPress={handleSearchPress}
              >
                <DefaultImageIcon size={24} source={IconSearch} />
              </TouchableOpacity>
            </HeaderContainer>
          ),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites/index"
        options={{
          title: 'Favoritos',
          
          headerTitle: () => (
            <HeaderContainer>
              <DefaultTitle>Favoritos</DefaultTitle>
              <TouchableOpacity 
                onPress={handleSearchPress}
              >
                <DefaultImageIcon size={24} source={IconSearch} />
              </TouchableOpacity>
            </HeaderContainer>
          ),
          tabBarIcon: ({ color, size }) => <StarIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}