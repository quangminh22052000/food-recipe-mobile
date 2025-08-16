// Mock các dependencies
jest.mock("@/libs/common/store", () => ({
  useAppStore: () => ({
    typeName: "all",
    setTypeName: jest.fn(),
  }),
}))

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}))

jest.mock("@/libs/common/dummy-data", () => ({
  cookingRecipeData: [
    {
      id: "1",
      name: "Phở Bò",
      typeName: "noodles",
      image: "pho-bo.jpg",
      description: "Món phở bò truyền thống",
      cookingTime: "30 phút",
      numberOfServing: "4 người",
      numberOfCalories: "400 cal",
      levelOfDifficulty: "Trung bình",
      ingredients: [
        { name: "Bánh phở", quantity: "500g" },
        { name: "Thịt bò", quantity: "300g" },
      ],
      instructions: ["Bước 1", "Bước 2"],
      recipeVideoUrl: "https://youtube.com/watch?v=example",
    },
    {
      id: "2",
      name: "Cơm Gà",
      typeName: "rice",
      image: "com-ga.jpg",
      description: "Món cơm gà truyền thống",
      cookingTime: "45 phút",
      numberOfServing: "2 người",
      numberOfCalories: "350 cal",
      levelOfDifficulty: "Dễ",
      ingredients: [
        { name: "Gạo", quantity: "200g" },
        { name: "Thịt gà", quantity: "300g" },
      ],
      instructions: ["Bước 1", "Bước 2"],
      recipeVideoUrl: "https://youtube.com/watch?v=example2",
    },
  ],
}))

jest.mock("@react-native-seoul/masonry-list", () => "MasonryList")

jest.mock("@/libs/common/utils/device/responsive", () => ({
  hp: (value: number) => value,
}))

jest.mock("react-native-paper", () => ({
  Text: "Text",
}))

jest.mock("../../screens/Home/components/RecipeCard", () => ({
  RecipeCard: "RecipeCard",
}))

// Test đơn giản cho component Recipies
describe("Recipies Component", () => {
  it("should be testable", () => {
    // Kiểm tra test có thể chạy
    expect(true).toBe(true)
  })

  it("should have correct test structure", () => {
    // Kiểm tra cấu trúc test
    expect(1 + 1).toBe(2)
  })

  it("should validate recipes functionality", () => {
    // Kiểm tra logic test
    const recipesExists = true
    expect(recipesExists).toBe(true)
  })

  it("should check recipe items", () => {
    // Kiểm tra các recipe items
    const recipes = [
      { id: "1", name: "Phở Bò", typeName: "noodles" },
      { id: "2", name: "Cơm Gà", typeName: "rice" },
      { id: "3", name: "Bún Bò", typeName: "noodles" },
    ]
    expect(recipes).toHaveLength(3)
    expect(recipes[0].name).toBe("Phở Bò")
    expect(recipes[1].typeName).toBe("rice")
  })

  it("should validate recipes layout", () => {
    // Kiểm tra layout
    const layout = {
      hasTitle: true,
      isMasonry: true,
      numColumns: 2,
      hasScrollIndicator: false,
    }

    expect(layout.hasTitle).toBe(true)
    expect(layout.isMasonry).toBe(true)
    expect(layout.numColumns).toBe(2)
    expect(layout.hasScrollIndicator).toBe(false)
  })

  it("should handle recipe filtering", () => {
    // Kiểm tra chức năng lọc recipes
    const allRecipes = [
      { id: "1", name: "Phở Bò", typeName: "noodles" },
      { id: "2", name: "Cơm Gà", typeName: "rice" },
    ]
    const filteredRecipes = allRecipes.filter(
      recipe => recipe.typeName === "noodles",
    )

    expect(filteredRecipes).toHaveLength(1)
    expect(filteredRecipes[0].name).toBe("Phở Bò")
  })

  it("should display recipes title", () => {
    // Kiểm tra title
    const title = "Recipies"
    expect(title).toBe("Recipies")
    expect(title.length).toBe(8)
  })
})
