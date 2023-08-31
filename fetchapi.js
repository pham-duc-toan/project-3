export const fetchApi = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  }
export function unique(arr) {
    var formArr = arr.sort()
    var newArr = [formArr[0]]
    for (let i = 1; i < formArr.length; i++) {
      if (formArr[i] !== formArr[i - 1]) {
        newArr.push(formArr[i])
      }
    }
    return newArr
  }