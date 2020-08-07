
// console.log(module)

module.exports.getDate = getDate;
module.exports.function2 = function2;
module.exports.function3 = function(){};

function getDate() {
  let todayDate = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = todayDate.toLocaleDateString("en-US", options);
  return day;
}

function function2(){

}
