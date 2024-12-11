import {Image, StyleSheet, View, ScrollView, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Text,Icon} from "react-native-paper";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";



function MyLibraryScreen(){

    const [bookData, setBookData] = useState([]);
    const [userID, setUserID] = useState(-1);

    useEffect(() => {

        async function loadBooks(){

            const id = await AsyncStorage.getItem('userID');

            setUserID(parseInt(id));

            console.log(id);

            authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
                console.log(response.data[0]);
                setBookData(response.data);




            }).catch((err)=> {
                console.log(err);
            })

        }

        loadBooks();


    }, []);


    return(<>

        <ScrollView>
            <View style={{borderRadius:20,alignItems:"center"}}>

                {bookData.map((item,index,_)=> {

                    if(item?.ownerId === userID)
                        return (<>
                    <TouchableOpacity onPress={()=> console.log("AMK")} key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"90%",paddingVertical:15,margin:"2%"}}>

                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>{index+1}</Text>
                            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>{item.name}</Text>
                            <View style={{flex:1, alignItems:"center"}}>
                                <Icon size={20} style={{flex:1}} source={require("../../../assets/cham (1).png")}/>
                            </View>
                        </View>

                        <View style={{padding:5}}>
                            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.genre}</Text>
                            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.location}</Text>
                        </View>

                        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
                            <Image source={{uri:`${item.image}`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
                        </View>

                    </TouchableOpacity>
                            </>
                )})}

            </View>
        </ScrollView>
    </>)


}


const landingStylesheet = StyleSheet.create({

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },


});



export default MyLibraryScreen;