import * as Font from 'expo-font';

export async function loadFonts() {
  await Font.loadAsync({
    'NunitoSans-Regular' : require('@/assets/fonts/Nunito_Sans/static/NunitoSans_10pt-Regular.ttf'),
    'NunitoSans-SemiBold': require('@/assets/fonts/Nunito_Sans/static/NunitoSans_10pt-SemiBold.ttf'),
    'NunitoSans-Bold'    : require('@/assets/fonts/Nunito_Sans/static/NunitoSans_10pt-Bold.ttf'),
  });
}