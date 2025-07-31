import { Stack } from "expo-router"

const RecipeDetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RecipeDetailLayout
