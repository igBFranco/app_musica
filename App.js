import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Player from './Player.js'

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [audio, setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([

    {
      nome: 'Sweet Child of Mine',
      artista: 'Guns N Roses',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
    },

    {
      nome: 'Welcome to The Jungle',
      artista: 'Guns N Roses',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'}
    },

    {
      nome: 'Circus',
      artista: 'Britney Spears',
      playing: false,
      file: {uri:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'}
    },

  ]);

  const changeMusic = async (id)=>{
      let curFile = null;
      let newMusics = musicas.filter((val,k)=>{
          if(id == k){
            musicas[k].playing = true;
            curFile = musicas[k].file;
            setPlaying(true);
            setarAudioIndex(id);
          }else{
            musicas[k].playing = false;
          }

          return musicas[k];
      })

      if(audio != null){
          audio.unloadAsync();
      }

      let curAudio = new Audio.Sound();
      
      try {
          await curAudio.loadAsync(curFile);
          await curAudio.playAsync(); 
      } catch (error) {
        
      }

      setarAudio(curAudio);
      setarMusicas(newMusics);
  }


  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.container}>
        <StatusBar style={'light'}/>
        <View style={styles.header}>
          <Text style={{textAlign:'center', color:'white', fontSize:25}}>App Música</Text>
        </View>

        <View style={styles.table}>
            <Text style={styles.tableText}>Música</Text>
            <Text style={styles.tableText}>Artista</Text>
        </View>

        {    
          musicas.map((val,k)=>{
              
            if(val.playing){
                //renderiza musica tocando
                return(
                  <View style={styles.table}>
                    <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                        <Text style={styles.textSelected}><AntDesign name="play" size={15} color="#1DB954" /> {val.nome}</Text>
                        <Text style={styles.textSelected}>{val.artista}</Text>
                    </TouchableOpacity>
                  </View>
                );
            }else{
              return(
                <View style={styles.table}>
                  <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                      <Text style={styles.textNotSelected}><AntDesign name="play" size={15} color="white" /> {val.nome}</Text>
                      <Text style={styles.textNotSelected}>{val.artista}</Text>
                  </TouchableOpacity>
                </View>
              );
            }

          })
        }

          <View style={{paddingBottom:200}}>

          </View>
      </ScrollView>
      <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}></Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor:'#1DB954',
    width:'100%',
    paddingTop:45,
    paddingBottom:20,
  },
  table: {
    flexDirection: 'row',
    padding:20,
    borderBottomColor:'white',
    borderBottomWidth:1,
  },
  tableText:{
    width:'50%', 
    color:'rgb(200,200,200)',
    textAlign:'center'
  },
  textNotSelected:{
    width:'50%', 
    color:'rgb(200,200,200)',
    textAlign:'center'
  },
  textSelected:{
    width:'50%', 
    color:'#1DB954',
    textAlign:'center'
  },
});
