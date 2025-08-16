describe("Basic Jest Configuration", () => {
  it("should run basic tests", () => {
    expect(1 + 1).toBe(2)
  })

  it("should handle async operations", async () => {
    const result = await Promise.resolve("test")
    expect(result).toBe("test")
  })

  it("should handle arrays and objects", () => {
    const array = [1, 2, 3]
    const object = { name: "test", value: 42 }

    expect(array).toHaveLength(3)
    expect(object).toHaveProperty("name")
    expect(object.name).toBe("test")
  })

  it("should handle string operations", () => {
    const str = "Hello World"
    expect(str).toContain("Hello")
    expect(str.length).toBe(11)
  })
})
