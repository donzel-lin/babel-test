console.log("filename: 1, 0")
console.log("filename: (2, 4)", 1);
function func() {
  console.log("filename: 4, 2")
  console.info("filename: (5, 8)", 2);
}
export default class Clazz {
  say() {
    console.log("filename: 9, 4")
    console.debug("filename: (10, 12)", 3);
  }
  render() {
    return <div>{[console.log("filename: 13, 17"), console.error("filename: (13, 25)", 4)]}</div>;
  }
}
