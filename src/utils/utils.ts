/**
 * Generates an array of size n with unique random integers between 0 and upperBound (exclusive).
 * @param {number} n the length of the array
 * @param {number} upperBound the upper bound. If not specified, defaults to n
 * @returns {number[]} an array of size n with unique random integers between 0 and upperBound
 */
const getRandomArray = (n: number, upperBound: number = n): number[] => {
  const result: number[] = [];
  const set = new Set<number>();
  while (set.size < n) {
    const randomNum = Math.floor(Math.random() * upperBound);
    if (!set.has(randomNum)) {
      set.add(randomNum);
      result.push(randomNum);
    }
  }
  return result;
};

/**
 * Generates a random subset of size n containing elements from the given array, arr.
 * @template T
 * @param {number} n The number of elements to select
 * @param {T[]} arr The array to sample from
 * @returns {T[]} A new array containing a random subset of elements from the given array
 */
const getRandomSubset = <T>(n: number, arr: T[]): T[] => {
  const result: T[] = [];
  const set = new Set<T>();
  while (set.size < n) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    if (!set.has(item)) {
      set.add(item);
      result.push(item);
    }
  }
  return result;
};

export { getRandomArray, getRandomSubset };
