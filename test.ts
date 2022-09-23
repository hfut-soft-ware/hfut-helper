function searchIndex(target: number, nums: number[]) {
  if (target < 8) {
    return 1
  }
  if (target > 21) {
    return 11
  }
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const middle = left + right >> 1
    if (nums[middle] > target) {
      right = middle - 1
    } else if (nums[middle] < target) {
      left = middle + 1
    } else {
      return middle
    }
  }
  return left - 1
}

const arr = [8, 10, 14, 16, 19]

console.log(arr.slice(searchIndex(8, arr), searchIndex(10, arr) + 1))
