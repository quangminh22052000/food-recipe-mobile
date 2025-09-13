// libs/common/utils/responsive.ts
import { Dimensions } from "react-native"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

/**
 * Width Percent (wp) - tính theo phần trăm chiều ngang màn hình
 * @example wp(50) = 50% width
 */
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100
}

/**
 * Height Percent (hp) - tính theo phần trăm chiều cao màn hình
 * @example hp(30) = 30% height
 */
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100
}

/**
 * Min Percent (mp) - tính theo phần trăm của chiều ngắn hơn (width hoặc height)
 * @example mp(20) = 20% of the smaller dimension (width or height)
 */

export const minp = (percentage: number): number => {
  return (Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * percentage) / 100
}
