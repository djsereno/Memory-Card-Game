/**
 * Generates an array of numbers from 0 to n-1.
 * @param {number} n the length of the array
 * @returns {number[]} an array of numbers from 0 to n-1
 */
const getSequenceArray = (n: number) => {
  return Array.from({ length: n }, (_, index) => index);
};

/**
 * Shuffles an array in place.
 * @template T
 * @param {T[]} arr The array to shuffle
 * @returns {T[]} The shuffled array
 */
const shuffleArray = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Generates an array of n unique random integers between 0 and upperBound (exclusive).
 * @param {number} n the length of the array
 * @param {number} upperBound the upper bound. If not specified, defaults to n
 * @returns {number[]} an array of n unique random integers between 0 and upperBound
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
 * Selects a random subset of elements from the given array.
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

export { getRandomArray, getRandomSubset, getSequenceArray, shuffleArray };
