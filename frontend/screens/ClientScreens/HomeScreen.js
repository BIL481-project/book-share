import {Icon, Text} from "react-native-paper";
import React, {useEffect} from "react";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import {useState} from "react";
import {Image, ScrollView, View} from "react-native";

function HomeScreen(){

    const [bookData, setBookData] = useState([]);

    useEffect(() => {

        console.log("Use Effect Çalıştı");

        authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
            console.log(response.data[0]);
            setBookData(response.data);
        }).catch((err)=> {
            console.log(err);
        })


    }, []);


    return(<>

        <ScrollView>
        <View style={{borderRadius:20,alignItems:"center"}}>

            {bookData.map((item,index,_)=> {

                console.log(bookData[index], "book Data", index)

                return( <>
                <View key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"#6D4ACD", width:"90%",paddingVertical:15,margin:"2%"}}>

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

                </View>


                    </>
                )

            })}

        </View>
        </ScrollView>
    </>)


}


export default HomeScreen;