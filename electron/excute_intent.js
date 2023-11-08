const { SearchNewsBy } = require("./helpers/enum");

const excute_intent = async (output_type, object, newsList = [], index = 0) => {
  const features = [
    {
      name: "play_music",
      feature_name: () =>
        object.then((res) => {
          res.searchSong("Anh nho em nguoi yeu cu");
          res.playOnYoutube();
        }),
    },
    {
      name: "stop_content",
      feature_name: () =>
        object.then((res) => {
          res.pause();
        }),
    },
    {
      name: "search_news",
      feature_name: () =>
        object
          .searchByKeyword("Phân xác sông hồng")
          .then((res) => console.log(res)),
    },
    {
      name: "latest_news",
      feature_name: () => object.search(SearchNewsBy.LATEST),
    },
    {
      name: "most_read_news",
      feature_name: () => object.search(SearchNewsBy.MOST_READ),
    },
    {
      name: "hottest_news",
      feature_name: () => object.search(SearchNewsBy.MOST_READ),
    },
    {
      name: "read_news",
      feature_name: () => object.selectOneToRead(newsList, index),
    },
  ];
  // features.forEach(async (feature) => {
  //   if (feature.name === output_type) {
  //     return feature.feature_name();
  //   }
  // });
  for (let f of features) {
    if (f.name === output_type) return f.feature_name();
  }
};
module.exports = {
  excute_intent,
};
// read_nnuews
// user_maal
// next_content
// pre_content
// end_of_content
// middle_of_content
// back
// up_to
// start_content
// stop_content
// restart_content
// pause_content
// resume_content
// your_choice
// increase_volume
// decrease_volume
// default_volume
// min_volume
// max_volume
// mute
// un_mute
// const features = [
//   {
//     name: '',
//     feature: ReadNewsController
//   }
// ]
//
