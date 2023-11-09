const excute_intent = async (output_type, object, output_cmd) => {
  const features = [
    {
      name: "play_music",
      feature_name: () =>
        object.then(async (res) => {
          await res.searchSong(output_cmd);
          // await res.playOnYoutube();
          await res.playOnMp3()
        }),
    },
    {
      name: "stop_content",
      feature_name: () =>
        object.then(async (res) => {
          await res.pause();
        }),
    },
    {
      name: "resume_content",
      feature_name: () =>
        object.then(async (res) => {
          await res.resume();
        }),
    },
    {
      name: "increase_volume",
      feature_name: () =>
        object.then(async (res) => {
          await res.increaseVolume(20);
        }),
    },
    {
      name: "decrease_volume",
      feature_name: () =>
        object.then(async (res) => {
          await res.decreaseVolume(20);
        }),
    },
    {
      name: "min_volume",
      feature_name: () =>
        object.then(async (res) => {
          await res.setVolumeToMin();
        }),
    },
    {
      name: "max_volume",
      feature_name: () =>
        object.then(async (res) => {
          await res.setVolumeToMax();
        }),
    },
    {
      name: "mute",
      feature_name: () =>
        object.then(async (res) => {
          await res.mute();
        }),
    },
    {
      name: "un_mute",
      feature_name: () =>
        object.then(async (res) => {
          await res.unmute();
        }),
    },
    {
      name: "set_volume",
      feature_name: () =>
        object.then(async (res) => {
          await res.setVolume(20);
        }),
    },
    {
      name: "next_content",
      feature_name: () =>
        object.then(async (res) => {
          await res.next()
        }),
    },
  ];
  features.forEach(async (feature) => {
    if (feature.name === output_type) {
      await feature.feature_name();
    }
  });
};
module.exports = excute_intent
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
