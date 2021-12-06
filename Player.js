import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';


export default function Player(props) {

    const handlePlay = async()=>{
        let curFile = props.musicas[props.audioIndex].file;

        let newMusics = props.musicas.filter((val,k)=>{
            if(props.audioIndex == k){
              props.musicas[k].playing = true;
              curFile = props.musicas[k].file;
            }else{
              props.musicas[k].playing = false;
            }
  
            return props.musicas[k];
        });

        try {
            if(props.audio != null){
                props.setPlaying(true);
                props.setarMusicas(newMusics);
                await props.audio.playAsync();
            }else{
                let curAudio = new Audio.Sound();
                try {
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                } catch (error) {}

                props.setarAudio(curAudio);
                props.setarMusicas(newMusics);
                props.setPlaying(true);
            }
        } catch (error) {
            
        }
    }
    const handlePause = async()=>{
        if(props.audio != null){
            props.audio.pauseAsync();
        }

        props.setPlaying(false);
    }


    return(
        <View style={styles.player}>
            <TouchableOpacity style={{marginRight:20, marginLeft:20}}>
                <AntDesign name="banckward" size={35} color="white"></AntDesign>
            </TouchableOpacity>
            {
                (!props.playing)?
                <TouchableOpacity onPress={()=>handlePlay()} style={{marginRight:20, marginLeft:20}}>
                    <AntDesign name="playcircleo" size={35} color="#1DB954"></AntDesign>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>handlePause()} style={{marginRight:20, marginLeft:20}}>
                    <AntDesign name="pausecircleo" size={35} color="#1DB954"></AntDesign>
                </TouchableOpacity>
            }
            <TouchableOpacity style={{marginRight:20, marginLeft:20}}>
                <AntDesign name="forward" size={35} color="white"></AntDesign>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        width:'100%',
        height:100,
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:999,
        backgroundColor:'#111',
        alignContent:'center',
        justifyContent: 'center',
        flexDirection:'row',
        padding:25,
    },


});