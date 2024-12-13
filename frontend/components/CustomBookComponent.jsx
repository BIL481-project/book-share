import {Alert, Image, TouchableOpacity, View} from "react-native";
import {Button,  Text} from "react-native-paper";
import React, {useState} from "react";
import authApi from "../axios_instances/authApi";
import { BACKEND_URL } from '@env';

function CustomBookComponent({item: initialItem,index,userId}){


    const [item, setItem] = useState(initialItem);

    async function handleBorrowFunction(bookId){


        authApi.post(BACKEND_URL+'/books/lend/'+bookId).then((res)=> {

            Alert.alert("Borrow successful");
            setItem((prevItem) => ({
                ...prevItem,
                borrowerId: userId,
                isAvailable: 0,
            }));

        }).catch((err)=> {
            Alert.alert("Error while borrowing");
            console.log(err);
        })
    }

    async function handleReturnFunction(bookId){
        console.log(BACKEND_URL+'/books/lend/'+ bookId);


        authApi.post(BACKEND_URL+'/books/return/'+bookId).then((res)=> {
            Alert.alert("Return successful");
            setItem((prevItem) => ({
                ...prevItem,
                borrowerId: null,
                isAvailable: 1,
            }));

        }).catch((err)=> {
            Alert.alert("Error while borrowing");
            console.log(err);
        })
    }

    return(<>

        <View style={{flexDirection:"row", alignItems:"center" }}>
            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>{item?.id}</Text>
            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>{item?.name}</Text>
            <TouchableOpacity onPress={()=>console.log("Merhaba Dünya")} style={{flex:1, alignItems:"center"}}>

                {item?.borrowerId === null && item.isAvailable === 1 ? (<Button style={{color:"white"}} onPress={() => {handleBorrowFunction(item?.id)}}>Borrow</Button>) : null }
                {item?.borrowerId === userId ? (<Button style={{color:"white"}} onPress={() => {handleReturnFunction(item?.id)}} >Return</Button>) : null}

            </TouchableOpacity>
        </View>

        <View style={{padding:5}}>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item?.genre}</Text>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item?.location}</Text>
        </View>

        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri:`${item.image}`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
        </View>

    </>)

}


export default CustomBookComponent;