import {Image, TouchableOpacity, View} from "react-native";
import {Button, Menu, Text} from "react-native-paper";
import React from "react";
import authApi from "../axios_instances/authApi";
import { BACKEND_URL } from '@env';

function CustomBookComponent({item,index}){

    const [visibleMenu, setVisibleMenu] = React.useState(false);
    const openMenu = (index) => setVisibleMenu(index);
    const closeMenu = () => setVisibleMenu(false);

    console.log(item , "index")


    async function handleBorrowFunction(bookId){

        console.log(BACKEND_URL+'/books/lend/'+bookId);

        authApi.post(BACKEND_URL+'/books/lend/'+bookId).then((res)=> {
            console.log(res);
            //const data = res;
        }).catch((err)=> {
            console.log(err);
        })
    }

    async function handleReturnFunction(bookId){
        console.log(BACKEND_URL+'/books/lend/'+ bookId);


        authApi.post(BACKEND_URL+'/books/return/'+bookId).then((res)=> {
            console.log(res);
            // const data = res;
        }).catch((err)=> {
            console.log(err);
        })
    }

    return(<>

        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>{item.id}</Text>
            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>{item.name}</Text>
            <TouchableOpacity onPress={()=>console.log("Merhaba Dünya")} style={{flex:1, alignItems:"center"}}>
                <Menu
                    visible={visibleMenu === index}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={() => {openMenu(index); console.log(index)}} style={{fontSize:20,color:"white"}}>Menü</Button>}>
                    {item.borrowerId === null && item.isAvailable === 1 ? (<Menu.Item onPress={() => {handleBorrowFunction(item.id)}} title="Borrow" />): null}
                    {item.borrowerId === 37 ? (<Menu.Item onPress={() => {handleReturnFunction(item.id)}} title="Return" />):null}
                    {/*<Menu.Item onPress={() => showModal(index)} title="Details" />*/}
                </Menu>
            </TouchableOpacity>
        </View>

        <View style={{padding:5}}>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.genre}</Text>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.location}</Text>
        </View>

        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri:`${item.image}`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
        </View>

    </>)

}


export default CustomBookComponent;