import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  Pressable,
  FlatList,


} from "react-native";

import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import datas from "./datas";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect, useState} from "react";
import { keys, values } from "@babel/runtime/helpers/regeneratorRuntime";
import db from './db.json';
import customData from "./db.json";
import App from "react-native/template/App";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
const Stack = createNativeStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name={"StorageScreen"} component={StorageScreen} />
    </Stack.Navigator>
  );
}
function StorageScreen({ navigation }) {
  const fonks = ({item}) => {
    // let color = 'red';
    // if (clicked.includes (item)) {
    //   color = 'blue';
    // }
    return (
      <View style={{height:100,backgroundColor: '#6495ed'}}>
      <View style={{width:450,height:100,}}>
        <View style={{borderWidth:2,backgroundColor: '#f5f5f5',marginTop:25,marginLeft:10, marginRight:10, flexDirection: "row", alignItems: 'center'}}>
          <TouchableOpacity style={{backgroundColor: 'orange', borderWidth:2, height:20, width:20,borderRadius:10, marginLeft:5}}>
        </TouchableOpacity>
            <Text style={{color: '#8b4513', fontWeight:'bold', fontSize:20, marginLeft:30}}>{item.text}</Text>
          </View>
          </View>
      </View>
          );}
  const [wstorage,setWstorage] = useState([]);
  const [dstorage,setDstorage] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  console.warn(wstorage);
  return (

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
      <View style={{flexDirection:'row'}}>


      <Button title={'work'} onPress={() => {
        setActiveIndex(0)
        asyncStorage.getItem('key').then(ASRes => {
          let list = [];
          list = JSON.parse(ASRes);
          setWstorage(list);
        })}}></Button>


      <Button title={'done'}  onPress={() =>{
        setActiveIndex(1);
        asyncStorage.getItem('key2').then(ASRes => {
          let list = [];
          list = JSON.parse(ASRes);
          setDstorage(list);
        })}} ></Button>

      </View>
      <FlatList data={activeIndex == 0 ? wstorage : dstorage} renderItem={fonks}></FlatList>
    </View>
  );
}

function HomeScreen({navigation}){

  const [activeIndex, setActiveIndex] = useState(0);
  const [works,setWorks] = useState();
  const [done,setDone] = useState();
  const [wList,setWList] = useState([]);
  const [dList,setDList] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [dizi, setDizi] = useState([]);
  const fonk = ({item}) => {
    // let color = 'red';
    // if (clicked.includes (item)) {
    //   color = 'blue';
    // }
    return (
      <View style={{flex : 1}}>
        <View style={{borderWidth:2,backgroundColor: '#f5f5f5',marginTop:25,marginLeft:10, marginRight:10, flexDirection: "row", alignItems: 'center'}}>
          <TouchableOpacity style={{backgroundColor: 'orange', borderWidth:2, height:20, width:20,borderRadius:10, marginLeft:5}} onPress={() => {
            // let tarray = [];
            // tarray=tarray.concat(clicked);
            //
            // if ( !tarray.includes(item)){
            //   tarray.push(item);
            // }
            // setClicked(tarray);
            // console.warn(clicked);

            if (activeIndex == 0) {

              let workArrayTemp = [];
              let doneArrayTemp = [];

              doneArrayTemp = doneArrayTemp.concat(dList);

              doneArrayTemp.push(item);
              setDList(doneArrayTemp);

              if (dizi.length > 0) {

                for (let it of dizi) {

                  if (!doneArrayTemp.includes(it)) {
                    console.warn("aaaaaaaaa")
                    workArrayTemp.push(it)
                  }
                  // workArrayTemp.push(it)
                }
                setWList(workArrayTemp);
              }
            }
            if (activeIndex == 1) {

              let wworkArrayTemp = [];
              let ddoneArrayTemp = [];

              ddoneArrayTemp=ddoneArrayTemp.concat(wList);

              ddoneArrayTemp.push(item);
              setWList(ddoneArrayTemp);

              if (dizi.length > 0){

                for (let it of dizi) {

                  if (!ddoneArrayTemp.includes(it)){
                    console.warn("bbb")
                    wworkArrayTemp.push(it)
                  }
                  // workArrayTemp.push(it)
                }
                setDList(wworkArrayTemp);
              } }
          }

          }>

          </TouchableOpacity>
          <Text style={{color: '#8b4513', fontWeight:'bold', fontSize:20, marginLeft:30}}>{item.text}</Text>
        </View>
      </View>
    );}
  useEffect(() => {
    setWList(db?.data?.doList);
    setDizi(db?.data?.doList);
  }, []);
  if (dizi.length <= 0) {
    return (
      <View></View>
    )
  }
  // console.warn(dizi.data.doList);
  return (
    <View style={{flex: 1, backgroundColor: '#b0c4de'}}>
      <View
        style={{
          backgroundColor: '#008b8b',
          alignItems: 'center',
          width: '100%',
          height: 40,
        }}>
        <Text
          style={{
            color: '#ffefd5',
            marginTop: 10,
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          TO-DO LİST
        </Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Depolama"
          onPress={() => navigation.navigate('Profile')} />
      </View>
      <View style={{flexDirection: 'row', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title={'Works'}
          onPress={() => {
            setWorks(works);
            setActiveIndex(0)
            console.warn('works ekranındasınız');
          }}></Button>
        <Button
          title={'Done'}
          onPress={() => {
            setDone(setDone, done);
            setActiveIndex(1);
            console.warn('Done ekranındasınız');
          }}></Button>
      </View>
      <View style={{flex: 1 }}>
        <FlatList
          style={{}}
          data={activeIndex == 0 ? wList : dList }
          renderItem={fonk} />
      </View>
      <TouchableOpacity onPress={() => {
        if (activeIndex == 0) {
          asyncStorage.setItem('key', JSON.stringify(wList));
        }else {
          asyncStorage.setItem('key2', JSON.stringify(dList));
        }

        // console.warn(wList);
      }}>
        <View style={{ alignItems:'center', justifyContent:'center' ,marginBottom:10 }}>
          <Text style={{color:'orange',borderRadius:20,backgroundColor:'black',fontWeight: 'bold', fontSize: 22, padding:12}}>STORAGE</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default function Mystack() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
