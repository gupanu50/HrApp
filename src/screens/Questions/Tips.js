import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Font from '../../comman/Font';
import {DefaultImages, Colors} from '../../comman/Theme';
import Header from '../../comman/Header';
import CustomText from '../../comman/CustomText';
import Play from '../../../asset/image/svg/PlayIcon.svg';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Vimeo} from 'react-native-vimeo-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateFunction} from '../../comman/Api';
import {errorToast, successToast} from '../../comman/TostModal';
import PageLoader from '../../comman/PageLoader';

export default function Tips({navigation, route}) {
  const {qid} = route.params;
  console.log(qid);
  const videoUrl = `https://www.youtube.com/watch?v=LS6JQJtVQmY`;
  const VimeoId = videoUrl.split('/')?.pop();
  const Videourlid = videoUrl.split('=')?.pop();
  const [isloading, setloading] = useState(false);
  const [Details, setData] = useState('');
  const [YouTubeId, setYoutubeId] = useState('');
  const [isVimeoId, setVimeoId] = useState('');
  useEffect(() => {
    let checkid = qid.url?.includes('youtube');
    if (checkid) {
      let getid = qid.url.split('=')?.pop();
      setYoutubeId(getid);
    } else {
      // let rul = `https://vimeo.com/750432905`;
      const VimeoId = qid.url.split('/')?.pop();
      setVimeoId(VimeoId);
    }
  }, []);
  const getTips = async () => {
    let url = `tipsdata`;
    let data = new FormData();
    data.append('quizid', qid);
    const token = await AsyncStorage.getItem('Token');
    const result = await UpdateFunction(data, url, token);
    if (result.success) {
      const Data = result.data;
      successToast(result.data?.message);
      setData(Data.tipsdata[0]);
      let videoUrl = Data.tipsdata[0]?.url;
      let checkid = videoUrl?.includes('youtube');
      if (checkid) {
        let getid = videoUrl.split('=')?.pop();
        setYoutubeId(getid);
      } else {
        // let rul = `https://vimeo.com/750432905`;
        const VimeoId = videoUrl.split('/')?.pop();
        setVimeoId(VimeoId);
      }

      console.log(checkid, 'checkid');
      setloading(false);
    } else {
      errorToast(result.data?.message);
      setloading(false);
    }
  };
  const videoCallbacks = {
    timeupdate: data => console.log('timeupdate: ', data),
    play: data => console.log('play: ', data),
    pause: data => console.log('pause: ', data),
    fullscreenchange: data => console.log('fullscreenchange: ', data),
    ended: data => console.log('ended: ', data),
    controlschange: data => console.log('controlschange: ', data),
  };
  return (
    <SafeAreaView style={{backgroundColor: Colors.default, flex: 1}}>
      {isloading ? (
        <PageLoader color={'#FFF'} />
      ) : (
        <>
          <Header
            HeaderName={'Tips'}
            textcolor={'#FFF'}
            onPress={() => navigation.goBack()}
          />
          <View style={customStyle.mainContain}>
            <CustomText style={customStyle.heading}>{qid.heading}</CustomText>
            <CustomText style={customStyle.desc}>{qid.description}</CustomText>

            <View style={customStyle.container}>
              {YouTubeId ? (
                <YoutubePlayer height={300} play={true} videoId={YouTubeId} />
              ) : (
                <Vimeo
                  videoId={isVimeoId}
                  params={'api=1&autoplay=1'}
                  handlers={videoCallbacks}
                />
              )}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
const customStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    // borderRadius: 20,
    marginVertical: 20,
  },
  desc: {
    color: '#1E1E1E',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: Font.regular,
    marginVertical: 10,
  },
  heading: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: Font.regular,
    marginVertical: 10,
  },
  mainContain: {
    backgroundColor: '#F2F6FF',
    flex: 1,
    marginVertical: 10,
    padding: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
