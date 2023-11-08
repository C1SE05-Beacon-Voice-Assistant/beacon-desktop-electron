const excute_intent = async (output_type, object) => {
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
  ];
  features.forEach(async (feature) => {
    if (feature.name === output_type) {
      await feature.feature_name()
    }
  });
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
