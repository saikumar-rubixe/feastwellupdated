// function myfunction() {
//   let json_response = [
//     {
//       meals: "macaroni",
//       Quantity: 7,
//       "Total volume": 247.35,
//       Weight: 126.15,
//       Nutrition: {
//         calories: 201.84,
//         totalfat: 0,
//         satfat: 0,
//         tranfat: 0,
//         polyfat: 0,
//         monofat: 0,
//         cholesterol: 0,
//         sod: 0,
//         pota: 0.05,
//         totalcarb: 37.845,
//         dietaryfiber: 0,
//         sugar: 0,
//         protein: 12.615,
//         p: 0.076,
//         k: 0.056,
//         caffeine: 0,
//       },
//     },
//     {
//       meals: "beet",
//       Quantity: 2,
//       "Total volume": 12.58,
//       Weight: 9.56,
//       Nutrition: {
//         calories: 3.824,
//         totalfat: 0,
//         satfat: 0,
//         tranfat: 0,
//         polyfat: 0,
//         monofat: 0,
//         cholesterol: 0,
//         sod: 0.008,
//         pota: 0.03,
//         totalcarb: 0.956,
//         dietaryfiber: 0,
//         sugar: 0.956,
//         protein: 0,
//         p: 0.004,
//         k: 0.03,
//         caffeine: 0,
//       },
//     },
//     {
//       meals: "chicken sandwich",
//       Quantity: 1,
//       "Total volume": 55.94,
//       Weight: 36.36,
//       Nutrition: {
//         calories: 90.9,
//         totalfat: 3.636,
//         satfat: 0.0,
//         tranfat: 0,
//         polyfat: 0,
//         monofat: 0,
//         cholesterol: 0.011,
//         sod: 0.273,
//         pota: 0.091,
//         totalcarb: 7.272,
//         dietaryfiber: 0,
//         sugar: 0,
//         protein: 7.272,
//         p: 0.069,
//         k: 0.091,
//         caffeine: 0,
//       },
//     },
//   ];
//   let sum = 0;
//   console.log(`length of json is ${json_response.length}`);
//   for (i = 0; i < json_response.length; i++) {
//     console.log(jsonResponse[i].Nutrition.calories);
//     sum += json_response[i].Nutrition.calories;
//   }
//   console.log(`final sum is ${sum}`);
// }
// myfunction();

var t1 = new Date("2022/10/03 11:03:13");
var t2 = new Date("2022/10/03 22:34:45");
console.log(Math.floor((t2 - t1) / (24 * 3600 * 1000)));
