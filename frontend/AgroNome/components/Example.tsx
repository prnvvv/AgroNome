import { Pressable, Text, View } from 'react-native';

export default function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold text-blue-600 mb-4">
        Welcome to NativeWind!
      </Text>
      <Pressable 
        className="bg-blue-500 px-6 py-3 rounded-lg active:bg-blue-600"
        onPress={() => console.log('Button pressed!')}
      >
        <Text className="text-white font-semibold text-lg">
          Click Me
        </Text>
      </Pressable>
    </View>
  );
} 